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
  Tooltip,
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
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        padding: isMobile ? "8px 0" : "10px 0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={navLogo}
              alt="Logo"
              style={{
                height: isMobile ? "40px" : "50px",
                width: isMobile ? "auto" : "auto",
              }}
            />
          </Box>

          {/* HOME Button (Hidden on Mobile) */}
          {!isTablet && (
            <Button
              sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
            >
              HOME
            </Button>
          )}

          {/* Icons Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton>
              <ShoppingCartIcon
                sx={{ color: "black", fontSize: isMobile ? "22px" : "24px" }}
              />
            </IconButton>

            {/* Profile Icon with Hover and Click Menu */}
            {!isTablet && (
              <Tooltip title="User Profile">
                <IconButton onClick={handleOpenUserMenu}>
                  <AccountCircleIcon
                    sx={{ color: "black", fontSize: "28px" }}
                  />
                </IconButton>
              </Tooltip>
            )}

            {/* Mobile Menu Icon */}
            {isTablet && (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            )}
          </Box>

          {/* Mobile Drawer (Sidebar) */}
          <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
            <Box sx={{ width: 250, paddingTop: "10px" }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDrawerToggle}>
                    <ListItemText primary="HOME" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <PersonIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <AssignmentIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="My Requests" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ExitToAppIcon sx={{ marginRight: "10px" }} />
                    <ListItemText primary="Sign Out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {/* Profile Dropdown Menu (Desktop) */}
          <Menu
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
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
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
              <AccountCircleIcon sx={{ fontSize: "40px", color: "white" }} />
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
