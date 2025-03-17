import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavbarHome() {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
      onClick={() => navigate("/home")}
    >
      HOME
    </Button>
  );
}

export default NavbarHome;
