import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import NavbarHome from "./NavbarHome";
import NavbarCart from "./NavbarCart";
import NavbarProfile from "./NavbarProfile";
import NavbarDrawer from "./NavbarDrawer";
import navLogo from "/navlogs.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        padding: isMobile ? "8px 0" : "15px 0",
        fontFamily: "'Lato', sans-serif", // Apply font to AppBar
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: isMobile ? 0 : 4,
            fontFamily: "'Lato', sans-serif", // Apply font to Toolbar
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              fontFamily: "'Lato', sans-serif", // Apply font to Box
            }}
          >
            <img
              src={navLogo}
              alt="Logo"
              style={{
                height: isMobile ? "35px" : isTablet ? "45px" : "50px",
                width: "auto",
                cursor: "pointer",
              }}
              onClick={() => navigate("/home")}
            />
          </Box>

          {/* Navbar Home */}
          {!isTablet && <NavbarHome />}

          {/* Right-side Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Lato', sans-serif", // Apply font here
            }}
          >
            {isAuthenticated ? (
              <>
                <NavbarCart />
                {!isTablet && <NavbarProfile />}
                {isTablet && (
                  <IconButton onClick={handleDrawerToggle}>
                    <MenuIcon sx={{ color: "black", fontSize: "28px" }} />
                  </IconButton>
                )}
              </>
            ) : (
              <Button
                variant="text"
                color="success"
                onClick={() => navigate("/login")}
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Lato', sans-serif", // Font for login button
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {isAuthenticated && (
        <NavbarDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
    </AppBar>
  );
}

export default Navbar;
