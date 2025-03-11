import React, { useState } from "react";
import navLogo from "../Logo/navlogs.png";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "@mui/material/styles";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMouseEnter = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null); // Isara ang menu kapag may pinindot
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: "none", padding: "5px 0" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={navLogo} alt="Logo" style={{ height: "50px" }} />
          </Box>

          {/* HOME Button (Hidden on Mobile) */}
          {!isMobile && (
            <Button
              sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
            >
              HOME
            </Button>
          )}

          {/* Icons Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton>
              <ShoppingCartIcon sx={{ color: "black", fontSize: "24px" }} />
            </IconButton>

            {/* Profile Icon with Hover and Click Menu */}
            {!isMobile && (
              <Box onMouseEnter={handleMouseEnter}>
                <IconButton>
                  <AccountCircleIcon
                    sx={{ color: "black", fontSize: "28px" }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  sx={{
                    mt: "10px",
                    "& .MuiPaper-root": {
                      borderRadius: "20px",
                      backgroundColor: "#187737",
                      padding: "10px",
                      minWidth: "220px",
                      color: "white",
                      zIndex: 1302,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ fontSize: "40px", color: "white" }}
                    />
                    <Box sx={{ textAlign: "center", mt: 1 }}>
                      <strong>Name</strong>
                      <br />
                      <small>Role</small>
                    </Box>
                  </Box>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <PersonIcon /> Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <AssignmentIcon /> My Requests
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <ExitToAppIcon /> Sign Out
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
                <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            )}
          </Box>

          {/* Mobile Drawer (Sidebar) */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          >
            <Box sx={{ width: 250, paddingTop: "10px" }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setMobileOpen(false)}>
                    <ListItemText primary="HOME" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCloseUserMenu}>
                    <PersonIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCloseUserMenu}>
                    <AssignmentIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="My Requests" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCloseUserMenu}>
                    <ExitToAppIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="Sign Out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
