import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

function NavbarCart() {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate("/request-cart")}>
      <Badge badgeContent={20} color="secondary">
        <ShoppingCartIcon sx={{ color: "black", fontSize: "24px" }} />
      </Badge>
    </IconButton>
  );
}

export default NavbarCart;
