import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavbarHome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "16px",
          mr: "5px", // Adjust spacing
        }}
        onClick={() => navigate("/home")}
      >
        HOME
      </Button>
      {/* Vertical Line */}
      <Box
        sx={{
          width: "1px",
          height: "20px",
          mr: "30px",
          backgroundColor: "gray", // Adjust color as needed
        }}
      />
    </Box>
  );
}

export default NavbarHome;
