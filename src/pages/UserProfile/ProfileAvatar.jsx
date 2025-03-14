import React from "react";
import { Box, Avatar, Button } from "@mui/material";

const ProfileAvatar = ({ profilePic, handleFileChange, setOpenModal }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
      width: "40%",
    }}
  >
    <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={profilePic || ""} />
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      id="profile-pic-input"
      onChange={handleFileChange}
    />
    <Button
      sx={{ textTransform: "none" }}
      variant="text"
      color="primary"
      onClick={() => document.getElementById("profile-pic-input").click()}
    >
      Change Profile Picture
    </Button>
    <Button
      sx={{ textTransform: "none" }}
      variant="text"
      color="primary"
      onClick={() => setOpenModal(true)}
    >
      Change Password
    </Button>
  </Box>
);

export default ProfileAvatar;
