import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; // Import Firebase auth instance
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function NavbarDrawer({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();

  const styles = {
    iconColor: "#2e7d32",
    textColor: "#2e7d32",
    drawerBackgroundColor: "white",
    fontFamily: "'Lato', sans-serif",
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: styles.drawerBackgroundColor,
          color: styles.textColor,
          fontFamily: styles.fontFamily, // Apply Lato font to drawer
        },
      }}
    >
      <Box sx={{ width: 250 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: styles.iconColor }} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  sx: {
                    color: styles.textColor,
                    fontFamily: styles.fontFamily,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/user-profile")}>
              <ListItemIcon>
                <PersonIcon sx={{ color: styles.iconColor }} />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  sx: {
                    color: styles.textColor,
                    fontFamily: styles.fontFamily,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/my-requests")}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: styles.iconColor }} />
              </ListItemIcon>
              <ListItemText
                primary="My Requests"
                primaryTypographyProps={{
                  sx: {
                    color: styles.textColor,
                    fontFamily: styles.fontFamily,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: styles.iconColor }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: styles.iconColor }} />
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
                primaryTypographyProps={{
                  sx: {
                    color: styles.textColor,
                    fontFamily: styles.fontFamily,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default NavbarDrawer;
