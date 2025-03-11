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
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "@mui/material/styles";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
            <Tooltip title="User Profile">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            {isMobile && (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            )}
          </Box>

          {/* Mobile Drawer (HOME Button) */}
          <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
            <Box sx={{ width: 250 }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDrawerToggle}>
                    <ListItemText primary="HOME" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {/* Profile Dropdown Menu */}
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
