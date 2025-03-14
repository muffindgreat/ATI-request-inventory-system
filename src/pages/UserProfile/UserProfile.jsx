import React, { useState } from "react";
import { Card, CardContent, Container } from "@mui/material";
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
        <ProfileActions
          isEditing={isEditing}
          handleSave={handleSave}
          handleCancel={handleCancel}
          setIsEditing={setIsEditing}
        />
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
  );
};

export default UserProfile;
