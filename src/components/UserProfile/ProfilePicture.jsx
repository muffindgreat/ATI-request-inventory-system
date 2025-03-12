import React, { useState } from "react";
import { Avatar, Button, Box } from "@mui/material";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: { xs: "100%", md: "40%" },
      }}
    >
      <Avatar sx={{ width: 120, height: 120, mb: 5 }} src={profilePic || ""} />
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
        sx={{ textTransform: "none" }}
        onClick={() => document.getElementById("profile-pic-input").click()}
      >
        Change Profile Picture
      </Button>
      <Button
        variant="text"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={() => setOpenModal(true)}
      >
        Change Password
      </Button>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default ProfilePicture;
