import React, { useState } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";
import EditProfileButton from "./EditProfileButton";
import Navbar from "../NavBar/Navbar";

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
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        {" "}
        {/* Increased spacing */}
        <Card
          sx={{
            maxWidth: 800,
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            p: 3, // Added padding for better spacing
          }}
        >
          {/* Properly spaced heading */}
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 2 }}
          ></Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 2 }}
          ></Typography>

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
      </Box>
    </>
  );
};

export default UserProfile;
