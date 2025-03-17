import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Button,
  IconButton,
  CardMedia,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const CartItemList = ({
  cartItems,
  selectedItems,
  setSelectedItems,
  toggleSelectItem,
  handleQuantityChange,
  handleDelete,
  setCartItems,
}) => {
  const [quantityInputs, setQuantityInputs] = useState({});

  const handleInputChange = (id, value) => {
    if (!isNaN(value) && value >= 1) {
      setQuantityInputs((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleInputBlur = (id) => {
    const newQuantity = parseInt(
      quantityInputs[id] || cartItems.find((item) => item.id)?.quantity,
      10
    );
    if (newQuantity >= 1) {
      handleQuantityChange(
        id,
        newQuantity - cartItems.find((item) => item.id)?.quantity
      );
    }
  };

  return (
    <CardContent sx={{ padding: 0 }}>
      {cartItems.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray", py: 5 }}>
          No items added
        </Typography>
      ) : (
        <>
          {/* Sticky Select All & Delete Options */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
              py: 1,
              borderBottom: "1px solid #ddd",
              padding: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 0.5, p: 1 }}>
              <Checkbox
                checked={
                  selectedItems.length === cartItems.length &&
                  cartItems.length > 0
                }
                onChange={() =>
                  setSelectedItems(
                    selectedItems.length === cartItems.length
                      ? []
                      : cartItems.map((item) => item.id)
                  )
                }
              />
              <Typography sx={{ fontWeight: "bold", color: "green" }}>
                Select All
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
              }}
            >
              <Button
                color="error"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                disabled={selectedItems.length === 0}
                onClick={() => {
                  setCartItems((prev) =>
                    prev.filter((item) => !selectedItems.includes(item.id))
                  );
                  setSelectedItems([]);
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>

          {/* Cart Items List */}
          <Box sx={{ maxHeight: "500px", overflowY: "auto", pr: 1, p: 0 }}>
            {cartItems.map((item, index) => {
              return (
                <Box
                  key={item.id || index}
                  display="grid"
                  gridTemplateColumns="50px 1fr 50px"
                  alignItems="center"
                  gap={2}
                  p={1}
                >
                  {/* Checkbox for Selection */}
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />

                  {/* Item Details */}
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ overflow: "hidden", width: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 60, height: 60, borderRadius: 1 }}
                      image={item.image}
                      alt={item.name}
                    />
                    <Box sx={{ ml: 2, width: "100%" }}>
                      <Typography fontWeight="bold">{item.name}</Typography>

                      {/* Quantity Controls */}
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "6px",
                          padding: "1px 4px",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ color: "green", padding: "2px" }}
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        {/* Quantity Input */}
                        <TextField
                          value={quantityInputs[item.id] ?? item.quantity}
                          onChange={(e) =>
                            handleInputChange(item.id, e.target.value)
                          }
                          onBlur={() => handleInputBlur(item.id)}
                          type="number"
                          inputProps={{ min: 1 }}
                          variant="standard"
                          size="small"
                          sx={{
                            width: "30px",
                            textAlign: "center",
                            mx: 0.5,
                            padding: 0,
                            "& .MuiInputBase-root": {
                              borderBottom: "none !important",
                              padding: "0 !important",
                              minHeight: "auto",
                            },
                            "& .MuiInput-underline:before, & .MuiInput-underline:after":
                              {
                                display: "none",
                              },
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                              padding: "0 !important",
                              fontSize: "0.85rem",
                              MozAppearance: "textfield",
                              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                                {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                            },
                          }}
                        />

                        <IconButton
                          size="small"
                          sx={{ color: "green", padding: "2px" }}
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {/* Remove Button */}
                  <Box display="flex" justifyContent="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </CardContent>
  );
};

export default CartItemList;
