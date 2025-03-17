import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
} from "@mui/material";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import PasswordModal from "./PasswordModal";
import ProfileActions from "./ProfileActions";

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

  const handleInputChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };
  const toggleVisibility = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
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
      <BackgroundImage />

      <Container
        maxWidth="md"
        sx={{
          pt: { xs: 12, sm: 14, md: 16 }, // Adjust padding top based on screen size
          mb: 10,
        }}
      >
        <Card elevation={3} sx={{ borderRadius: 2 }}>
          <CustomCardHeader title="Profile Information" showBackButton />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              padding: 4,
              alignItems: "center",
            }}
          >
            <ProfileAvatar
              profilePic={profilePic}
              handleFileChange={handleFileChange}
              setOpenModal={setOpenModal}
            />
            <ProfileForm
              userData={userData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </CardContent>
          <Divider></Divider>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <ProfileActions
              isEditing={isEditing}
              handleSave={handleSave}
              handleCancel={handleCancel}
              setIsEditing={setIsEditing}
            />
          </CardActions>
        </Card>
        <PasswordModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          passwords={passwords}
          setPasswords={setPasswords}
          showPassword={showPassword}
          toggleVisibility={toggleVisibility}
        />
      </Container>
    </Box>
  );
};

export default UserProfile;
