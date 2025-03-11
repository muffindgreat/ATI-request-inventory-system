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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["HOME"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        padding: "5px 0",
        top: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src={navLogo}
              alt="Logo"
              style={{ height: "60px", objectFit: "contain" }}
            />
          </Box>

          {/* Right Side - Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Button
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              HOME
            </Button>
            <IconButton>
              <ShoppingCartIcon sx={{ color: "black", fontSize: "24px" }} />
            </IconButton>
            <Tooltip title="User Profile">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
            </IconButton>
          )}

          {/* Mobile Drawer */}
          <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
            <List>
              {pages.map((page) => (
                <ListItem key={page} disablePadding>
                  <ListItemButton onClick={handleDrawerToggle}>
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Dropdown Menu */}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
