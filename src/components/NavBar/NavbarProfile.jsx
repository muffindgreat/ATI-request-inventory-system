import React, { useState, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function NavbarProfile() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "test", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            name: `${data.fname} ${data.lname}`,
            role: data.designation,
            email: data.email,
            phoneNumber: data.phoneNumber,
            profilePic: data.profilePic || null, // Store profile picture URL if available
          });
        } else {
          console.log("No user data found");
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      {/* Static Icon in Navbar */}
      <Tooltip title="User Profile">
        <IconButton onClick={handleOpenUserMenu}>
          <AccountCircleIcon sx={{ color: "black", fontSize: "28px" }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            minWidth: "250px",
          },
        }}
      >
        {/* Profile Header with Dynamic Avatar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #2e7d32",
          }}
        >
          {userData?.profilePic ? (
            <Avatar
              src={userData.profilePic}
              sx={{ width: 48, height: 48, marginRight: "10px" }}
            />
          ) : (
            <AccountCircleIcon
              sx={{ fontSize: "40px", marginRight: "10px", color: "#1A854B" }}
            />
          )}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#1A854B", fontWeight: "bold" }}
            >
              {userData?.name || "User Name"}
            </Typography>
            <Typography variant="body2" color="gray">
              {userData?.role || "User Role"}
            </Typography>
          </Box>
        </Box>

        {/* Menu Items */}
        <MenuItem
          onClick={() => {
            navigate("/user-profile");
            handleCloseUserMenu();
          }}
          sx={{ color: "#1A854B", paddingY: "10px", paddingX: "16px" }}
        >
          <PersonIcon sx={{ color: "#1A854B", marginRight: "12px" }} /> Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/my-requests");
            handleCloseUserMenu();
          }}
          sx={{ color: "#1A854B", paddingY: "10px", paddingX: "16px" }}
        >
          <AssignmentIcon sx={{ color: "#1A854B", marginRight: "12px" }} /> My
          Requests
        </MenuItem>

        <MenuItem
          onClick={handleSignOut}
          sx={{ color: "#1A854B", paddingY: "10px", paddingX: "16px" }}
        >
          <ExitToAppIcon sx={{ color: "#2e7d32", marginRight: "12px" }} /> Sign
          Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavbarProfile;
