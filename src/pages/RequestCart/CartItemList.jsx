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
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(99999, Math.max(1, numericValue));
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: clampedValue } : item
        )
      );
    }
  };

  const handleInputBlur = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item || isNaN(item.quantity) || item.quantity < 1) {
      handleQuantityChange(id, 1);
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
            {cartItems.map((item) => (
              <Box
                key={item.id}
                display="grid"
                gridTemplateColumns="50px 1fr 50px"
                alignItems="center"
                gap={1}
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
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </Typography>

                    {item?.type ? (
                      <Typography variant="body2" color="textSecondary">
                        {item.type}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        No type available
                      </Typography>
                    )}

                    {/* Display Banner Programs
                    {item.bannerPrograms?.length > 0 && (
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        {item.bannerPrograms.map((program, i) => (
                          <Chip
                            key={i}
                            label={program}
                            color="primary"
                            size="small"
                            sx={{ m: 0 }}
                          />
                        ))}
                      </Box>
                    )} */}

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "6px",
                        padding: "1px 4px",
                        mt: 1,
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
                        inputProps={{ min: 1, max: 99999, maxLength: 5 }}
                        variant="standard"
                        size="small"
                        sx={{
                          width: "50px",
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
            ))}
          </Box>
        </>
      )}
    </CardContent>
  );
};

export default CartItemList;
