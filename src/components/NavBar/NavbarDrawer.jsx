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
          backgroundColor: "white", // Background changed to white
          color: "#2e7d32", // Text color changed to green
        },
      }}
    >
      <Box sx={{ width: 250, paddingTop: "10px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#2e7d32" }} /> {/* Icon Green */}
              </ListItemIcon>
              <ListItemText
                primary="HOME"
                sx={{ color: "#2e7d32", fontWeight: "bold" }} // Text Green
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
