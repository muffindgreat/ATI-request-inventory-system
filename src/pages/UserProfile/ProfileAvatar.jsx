import React, { useState } from "react";
import { Box, Avatar, Button, CircularProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import useToast from "../../components/Toastify/useToast";
const CLOUDINARY_CLOUD_NAME = "dic5ircih";
const CLOUDINARY_UPLOAD_PRESET = "profile";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ProfileAvatar = ({ profilePic, setProfilePic, setOpenModal }) => {
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const showToast = useToast();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      showToast("Please select a file to upload.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setUploading(true);

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to upload image: " + data.error.message);
      }

      const imageUrl = data.secure_url;
      const user = auth.currentUser;
      if (!user) {
        showToast(
          "You must be logged in to update your profile picture.",
          "error"
        );
        return;
      }

      const userRef = doc(db, "User", user.uid);
      await updateDoc(userRef, { profilePic: imageUrl });

      setProfilePic(imageUrl);
      showToast("Profile picture updated successfully.", "info");
    } catch (error) {
      showToast("Image upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
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
        sx={{ textTransform: "none", width: 200 }}
        variant="text"
        color="primary"
        onClick={() => document.getElementById("profile-pic-input").click()}
        disabled={uploading}
      >
        {uploading ? <CircularProgress size={20} /> : "Change Profile Picture"}
      </Button>

      <Button
        sx={{ textTransform: "none", width: 200 }}
        variant="text"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ProfileAvatar;
