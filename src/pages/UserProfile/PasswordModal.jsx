import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const PasswordModal = ({ openModal, setOpenModal }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("No user is logged in.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Reauthenticate user before updating password
      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, passwords.newPassword);
      alert("Password updated successfully!");
      setOpenModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Change Password
        </Typography>
        {Object.keys(passwords).map((field, index) => (
          <TextField
            key={index}
            fullWidth
            margin="dense"
            label={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            type={showPassword[field] ? "text" : "password"}
            name={field}
            value={passwords[field]}
            onChange={handleChange}
            error={!!error}
            helperText={
              field === "confirmPassword" &&
              passwords.newPassword !== passwords.confirmPassword
                ? "Passwords do not match."
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleVisibility(field)}>
                    {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
        >
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#2E7D32", color: "white", textTransform: "none" }}
            onClick={handleChangePassword}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
