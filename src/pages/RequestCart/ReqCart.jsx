import { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ReqCart() {
  // State for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Book A", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 2, name: "Book B", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 3, name: "Book C", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 4, name: "Book D", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 5, name: "Book E", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 6, name: "Book F", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 7, name: "Book G", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 8, name: "Book H", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 9, name: "Book I", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
    { id: 10, name: "Book J", image: "https://dummyimage.com/60x60/000/fff", quantity: 1 },
  ]);

  // State for selected items (checkbox selections)
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
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
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
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box sx={{ mt: "80px", p: 2 }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "green", fontWeight: "bold", mb: 1 }}
      >
        REQUEST CART
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "@media (min-width: 600px)": {
            flexDirection: "row",
          },
        }}
      >
        {/* Cart Section */}
        <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ color: "green", p: 2 }}>
            <IconButton sx={{ p: 0, ml: 1, color: "green" }}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <CardContent sx={{ p: 2 }}>
            {/* If no items, show a notice */}
            {cartItems.length === 0 ? (
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "gray",
                  py: 5,
                }}
              >
                No items added
              </Typography>
            ) : (
              <>
                {/* Select All & Delete Options */}
                <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
                  {/* Select All */}
                  <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                    <Checkbox
                      checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                      onChange={() =>
                        setSelectedItems(
                          selectedItems.length === cartItems.length ? [] : cartItems.map((item) => item.id)
                        )
                      }
                    />
                    <Typography sx={{ fontWeight: "bold", color: "green" }}>Select All</Typography>
                  </Box>

                  {/* Delete Button */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="error"
                      sx={{ textDecoration: "underline", fontWeight: "bold" }}
                      disabled={selectedItems.length === 0}
                      onClick={() => {
                        setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
                        setSelectedItems([]); // Clear selections after deletion
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>

                {/* Cart Items List */}
                <Box sx={{ maxHeight: "250px", overflowY: "auto", pr: 1 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      display="grid"
                      gridTemplateColumns="50px 1fr 50px"
                      alignItems="center"
                      gap={2}
                      mb={2}
                    >
                      {/* Checkbox for Selection */}
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />

                      {/* Item Details with Quantity Controls */}
                      <Box display="flex" alignItems="center" sx={{ overflow: "hidden", width: "100%" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 60, height: 60, borderRadius: 1 }}
                          image={item.image} // Use the image from your cartItems state
                          alt={item.name}
                        />
                        <Box sx={{ ml: 2, width: "100%" }}>
                          {/* Item Title */}
                          <Typography fontWeight="bold">
                            {item.name} {/* Display the book names */}
                          </Typography>

                          {/* Quantity Controls Below Title */}
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              backgroundColor: "#e0e0e0",
                              borderRadius: "8px",
                              padding: "2px 6px",
                            }}
                          >
                            <IconButton size="small" sx={{ color: "green", padding: "3px" }} onClick={() => handleQuantityChange(item.id, -1)}>
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ fontSize: "0.85rem", minWidth: "20px", textAlign: "center" }}>{item.quantity}</Typography>
                            <IconButton size="small" sx={{ color: "green", padding: "3px" }} onClick={() => handleQuantityChange(item.id, 1)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>

                      {/* Remove Button */}
                      <Box display="flex" justifyContent="center">
                        <IconButton color="error" onClick={() => handleDelete(item.id)}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        {/* Order Summary Section (Hidden if no item is selected) */}
        {selectedItems.length > 0 && (
          <Card
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 3,
              opacity: selectedItems.length > 0 ? 1 : 0,
              transform: selectedItems.length > 0 ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              maxHeight: "400px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "green",
                color: "white",
                p: 1,
                textAlign: "center",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Typography fontWeight="bold">Summary</Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#e0e0e0",
                borderRadius: 1.5,
                m: 1.5,
                flexGrow: 1,
                overflowY: "auto",
                maxHeight: "250px",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#e0e0e0",
                        color: "green",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        maxWidth: "200px",
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                        color: "green",
                        width: "100px",
                      }}
                    >
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems
                    .filter((item) => selectedItems.includes(item.id))
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          sx={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            maxWidth: "200px", // Matches header width to ensure consistency
                          }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "100px" }}>
                          {item.quantity} pcs
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

            {/* Footer Section: Total Items & Check Out Button */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total {totalItems} items: {totalQuantity}
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white", textTransform: "none" }}
              >
                Check Out
              </Button>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
}