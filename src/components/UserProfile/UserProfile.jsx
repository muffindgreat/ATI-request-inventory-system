import React, { useState } from "react";
import { Card, CardContent, Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";
import EditProfileButton from "./EditProfileButton";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Johnny",
    lastName: "Trees",
    email: "johnny3s@example.com",
    designation: "Animator",
    section: "IT",
    phoneNumber: "123-456-7890",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <ProfileHeader />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          padding: 4,
          alignItems: "center",
        }}
      >
        <ProfilePicture />
        <ProfileDetails
          userData={userData}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
        />
      </CardContent>
      <EditProfileButton
        isEditing={isEditing}
        toggleEditing={() => setIsEditing(!isEditing)}
      />
    </Card>
  );
};

export default UserProfile;
