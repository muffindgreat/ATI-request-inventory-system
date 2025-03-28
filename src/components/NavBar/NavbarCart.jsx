import React, { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const NavbarCart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, "test", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log("Fetched User Data:", userData);

          const cartItems = userData.cart || [];

          if (!Array.isArray(cartItems)) {
            console.error("Cart data is not an array!", cartItems);
            return;
          }

          // Count the number of unique items (maps) in the cart
          const totalItems = cartItems.length;

          console.log("Total Unique Items in Cart:", totalItems);
          setCartCount(totalItems);
        } else {
          console.warn("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [currentUser]);

  return (
    <IconButton onClick={() => navigate("/request-cart")}>
      <Badge key={cartCount} badgeContent={cartCount} color="secondary">
        <ShoppingCartIcon sx={{ color: "black", fontSize: "24px" }} />
      </Badge>
    </IconButton>
  );
};

export default NavbarCart;
