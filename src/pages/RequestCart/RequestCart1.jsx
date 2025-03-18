import { useState } from "react";
import { Typography, Button, IconButton, Card, Box } from "@mui/material";
import CartItemList from "./CartItemList";
import CartOrderSummary from "./CartOrderSummary";

import CustomCardHeader from "../../components/UI/CustomCardHeader";

import BackgroundImage from "../../components/UI/BackgroundImage";
import { allMaterials } from "../../components/UI/sample_data";

export default function ReqCart() {
  const [cartItems, setCartItems] = useState(
    allMaterials.map(({ id, name, image, quantity }) => ({
      id,
      name,
      image,
      quantity: 1,
    }))
  );
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle item selection in the cart
  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle quantity change for items
  const handleQuantityChange = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let newQuantity = item.quantity + change;

          // Ensure quantity stays within bounds
          if (newQuantity < 1) newQuantity = 1;
          if (newQuantity > 99999) newQuantity = 99999;

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove an item from the cart
  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((item) => item !== id));
  };

  // Calculate total items and total quantity for selected items
  const totalItems = selectedItems.length;
  const totalQuantity = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        // mt: "80px",
        px: 3,
      }}
    >
      <BackgroundImage />
      {/* <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "green", fontWeight: "bold", mb: 1 }}
      >
        REQUEST CART
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          "@media (min-width: 600px)": {
            flexDirection: "row",
          },
          pt: { xs: 12, sm: 14, md: 16 },
          mb: 10,
          ml: { xs: 0, md: 10 },
          mr: { xs: 0, md: 10 },
        }}
      >
        <Card sx={{ borderRadius: 2, boxShadow: 3, flex: 2 }}>
          <CustomCardHeader title="Request Cart" showBackButton />

          <CartItemList
            cartItems={cartItems}
            selectedItems={selectedItems}
            toggleSelectItem={toggleSelectItem}
            handleQuantityChange={handleQuantityChange}
            handleDelete={handleDelete}
            setSelectedItems={setSelectedItems}
            setCartItems={setCartItems}
          />
        </Card>

        <CartOrderSummary
          cartItems={cartItems}
          selectedItems={selectedItems}
          totalItems={totalItems}
          totalQuantity={totalQuantity}
        />
      </Box>
    </Box>
  );
}
