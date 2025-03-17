import React from "react";
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

const PasswordModal = ({
  openModal,
  setOpenModal,
  passwords,
  setPasswords,
  showPassword,
  toggleVisibility,
}) => (
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
          onChange={(e) =>
            setPasswords({ ...passwords, [e.target.name]: e.target.value })
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
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
          onClick={() => setOpenModal(false)}
        >
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default PasswordModal;
