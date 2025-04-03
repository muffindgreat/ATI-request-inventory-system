import React, { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const NavbarCart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, "User", currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const cartItems = userData.cart || [];

        if (!Array.isArray(cartItems)) {
          console.error("Cart data is not an array!", cartItems);
          return;
        }

        // Count the number of unique items (maps) in the cart
        setCartCount(cartItems.length);
      } else {
        console.warn("User document does not exist.");
        setCartCount(0);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentUser]);

  return (
    <IconButton onClick={() => navigate("/request-cart")}>
      <Badge
        badgeContent={cartCount}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#1E874A", // Updated green color
            color: "white",
          },
        }}
      >
        <ShoppingCartIcon sx={{ color: "black", fontSize: "24px" }} />
      </Badge>
    </IconButton>
  );
};

export default NavbarCart;
