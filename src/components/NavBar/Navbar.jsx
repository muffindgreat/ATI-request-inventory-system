import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import NavbarCart from "./NavbarCart";
import NavbarProfile from "./NavbarProfile";
import NavbarDrawer from "./NavbarDrawer";
import navLogo from "/navlogs.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

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
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={navLogo}
              alt="Logo"
              style={{ height: "50px", width: "auto", cursor: "pointer" }}
              onClick={() => navigate("/home")}
            />
          </Box>
          {!isTablet && <NavbarHome />}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <NavbarCart />
            {!isTablet && <NavbarProfile />}
            {isTablet && (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      <NavbarDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </AppBar>
  );
}

export default Navbar;
