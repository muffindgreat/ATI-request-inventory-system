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
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import PasswordModal from "./PasswordModal";
import ProfileActions from "./ProfileActions";
import useToast from "../../components/Toastify/useToast";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    section: "",
    phoneNumber: "",
  });
  const [originalData, setOriginalData] = useState({});
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

  const navigate = useNavigate();
  const showToast = useToast();

  useEffect(() => {
    if (!currentUser) {
      showToast("No user found. Redirecting to login...", "error");
      navigate("/login");
      return;
    }

    const userRef = doc(db, "User", currentUser.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setUserData({
            firstName: fetchedData?.firstName || "",
            lastName: fetchedData?.lastName || "",
            email: fetchedData?.email || currentUser.email || "",
            designation: fetchedData?.designation || "",
            section: fetchedData?.section || "",
            phoneNumber: fetchedData?.phoneNumber || "",
          });
          setProfilePic(fetchedData?.profilePic || null);
          setOriginalData(fetchedData);
        } else {
          showToast("User not found. Redirecting to login...", "error");
          navigate("/login");
        }
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        showToast(
          "Failed to fetch user data. Redirecting to login...",
          "error"
        );
        navigate("/login");
      }
    );

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      // Validate name fields
      const { firstName, lastName } = userData;
      if (
        typeof firstName !== "string" ||
        !firstName.trim() ||
        typeof lastName !== "string" ||
        !lastName.trim()
      ) {
        showToast("First and Last names cannot be empty", "error");
        return;
      }

      try {
        // Update user document in Firestore
        const userRef = doc(db, "User", user.uid);
        await updateDoc(userRef, { ...userData, profilePic });
        showToast("User data updated successfully!", "success");
        setOriginalData({ ...userData, profilePic });
        setIsEditing(false);
      } catch (error) {
        showToast("Network Error", "error");
      }
    }
  };

  const handleCancel = () => {
    // Reset form changes
    setUserData(originalData);
    setProfilePic(originalData.profilePic);
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
      <Helmet>
        <title>Profile | ATI CALABARZON e-Library</title>
      </Helmet>
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
              setProfilePic={setProfilePic}
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
              userData={userData}
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
