import React, { useEffect } from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function NavbarDrawer({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) {
      console.log("Drawer Opened - Enabling Scroll"); // Debugging log
      document.body.style.overflow = "auto"; // ✅ Force-enable scrolling
      document.documentElement.style.overflow = "auto"; // ✅ Ensure scrolling on HTML element too
    } else {
      console.log("Drawer Closed - Keeping Scroll Enabled");
      document.body.style.overflow = "auto"; // ✅ Ensure scrolling stays enabled
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        disableScrollLock: true, // ✅ Prevent MUI from blocking scrolling
      }}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "white",
          color: "#2e7d32",
          overflowY: "auto", // ✅ Drawer should be scrollable
          maxHeight: "100vh",
        },
      }}
    >
      <Box sx={{ width: 250, paddingTop: "10px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#2e7d32" }} />
              </ListItemIcon>
              <ListItemText
                primary="HOME"
                sx={{ color: "#2e7d32", fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: "#2e7d32" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/user-profile")}>
              <ListItemIcon>
                <PersonIcon sx={{ color: "#2e7d32" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ color: "#2e7d32" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/my-requests")}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#2e7d32" }} />
              </ListItemIcon>
              <ListItemText primary="My Requests" sx={{ color: "#2e7d32" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => console.log("Sign Out")}>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: "#2e7d32" }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ color: "#2e7d32" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default NavbarDrawer;
