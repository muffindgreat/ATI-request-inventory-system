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
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function NavbarDrawer({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();
  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#2e7d32", // Green color from the provided image
          color: "white",
        },
      }}
    >
      <Box sx={{ width: 250, paddingTop: "10px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="HOME" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/user-profile")}>
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/my-requests")}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="My Requests" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => console.log("Sign Out")}>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default NavbarDrawer;
