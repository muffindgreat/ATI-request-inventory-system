import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
} from "@mui/material";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import PasswordModal from "./PasswordModal";
import ProfileActions from "./ProfileActions";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    designation: "",
    section: "",
    phoneNumber: "",
  });

  const [originalData, setOriginalData] = useState({}); // Stores the original data before editing
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

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "test", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            console.log("User Data Found:", userSnap.data());
            const fetchedData = userSnap.data();
            setUserData({
              fname: fetchedData?.fname || "",
              lname: fetchedData?.lname || "",
              email: fetchedData?.email || user.email || "",
              designation: fetchedData?.designation || "",
              section: fetchedData?.section || "",
              phoneNumber: fetchedData?.phoneNumber || "",
            });
            setOriginalData(fetchedData); // Store original data for cancel action
          } else {
            console.log("No such user document in 'test' collection!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No authenticated user found.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "test", user.uid);
        await updateDoc(userRef, userData);
        console.log("User data updated successfully!");
        setOriginalData(userData); // Update original data after successful save
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  const handleCancel = () => {
    setUserData(originalData); // Reset to original data
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
      <Container maxWidth="md" sx={{ pt: { xs: 12, sm: 14, md: 16 }, mb: 10 }}>
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
          <Divider />
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
