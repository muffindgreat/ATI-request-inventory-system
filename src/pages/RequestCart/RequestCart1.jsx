import { useState } from "react";
import { Typography, Button, IconButton, Card, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CartItemList from "./CartItemList";
import CartOrderSummary from "./CartOrderSummary";

import CustomCardHeader from "../../components/UI/CustomCardHeader";

import BackgroundImage from "../../components/UI/BackgroundImage";

// Sample cart items state
const initialCartItems = [
  {
    id: 1,
    name: "Book A",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 2,
    name: "Book B",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 3,
    name: "Book C",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 4,
    name: "Book D",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 5,
    name: "Book E",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 6,
    name: "Book F",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 7,
    name: "Book G",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 8,
    name: "Book H",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 9,
    name: "Book I",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
  {
    id: 10,
    name: "Book J",
    image: "https://dummyimage.com/60x60/000/fff",
    quantity: 1,
  },
];

export default function ReqCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle item selection in the cart
  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle quantity change for items
  const handleQuantityChange = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
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
