import React, { useState } from "react";
import { Box, Avatar, Button, CircularProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const CLOUDINARY_CLOUD_NAME = "dic5ircih";
const CLOUDINARY_UPLOAD_PRESET = "profile";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ProfileAvatar = ({ profilePic, setProfilePic, setOpenModal }) => {
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    console.log("File selected:", file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setUploading(true);
      console.log("Uploading file to Cloudinary...");

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (!response.ok) {
        throw new Error("Failed to upload image: " + data.error.message);
      }

      const imageUrl = data.secure_url;
      console.log("Uploaded image URL:", imageUrl);

      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      console.log("Updating Firestore for user:", user.uid);
      const userRef = doc(db, "test", user.uid);
      await updateDoc(userRef, { profilePic: imageUrl });

      setProfilePic(imageUrl);
      console.log("Profile picture updated successfully.");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      console.log("Upload process finished.");
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
