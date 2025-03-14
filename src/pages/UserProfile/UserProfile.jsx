import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  CardActions,
  Modal,
  InputAdornment,
  Container,
  CardHeader,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomCardHeader from "../../components/UI/CustomCardHeader";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({
    firstName: "Johnny",
    lastName: "Trees",
    email: "johnny3s@example.com",
    designation: "Animator",
    section: "IT",
    phoneNumber: "123-456-7890",
  });
  const [userData, setUserData] = useState({ ...originalData });
  const [profilePic, setProfilePic] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    setOriginalData({ ...userData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData({ ...originalData });
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
        <Card elevation={3}>
          <CustomCardHeader
            title="Profile Information"
            showBackButton
            backLink="/dashboard"
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              padding: 4,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                width: { xs: "100%", md: "40%" },
              }}
            >
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                src={profilePic || ""}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="profile-pic-input"
                onChange={handleFileChange}
              />
              <Button
                variant="text"
                color="primary"
                onClick={() =>
                  document.getElementById("profile-pic-input").click()
                }
              >
                Change Profile Picture
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Change Password
              </Button>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                width: "100%",
              }}
            >
              {Object.entries(userData).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="caption"
                    fontWeight="medium"
                    sx={{ mb: 0.5 }}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                  <TextField
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={!isEditing}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2E7D32",
                    color: "white",
                    borderRadius: 1,
                  }}
                  onClick={handleSave}
                >
                  Save Profile
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2E7D32",
                  color: "white",
                  borderRadius: 1,
                }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
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
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setOpenModal(false)}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserProfile;
