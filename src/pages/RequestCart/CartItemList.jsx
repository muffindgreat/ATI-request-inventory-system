import React, { useState, useEffect, useRef } from "react";
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
  CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CartItemList = ({
  cartItems,
  selectedItems,
  setSelectedItems,
  toggleSelectItem,
  handleConfirmQuantityChange,
  handleQuantityChange,
  handleDelete,
  loading,
}) => {
  const [quantityInputs, setQuantityInputs] = useState({});
  const debounceTimers = useRef({}); // Use a ref to store timers

  const handleInputChange = (id, value) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(9999, Math.max(0, numericValue)); // Allow 0 as the minimum value
      setQuantityInputs((prev) => ({ ...prev, [id]: clampedValue }));

      // Call handleQuantityChange to update localQuantity immediately
      handleQuantityChange(id, clampedValue);

      // Uncheck the checkbox if quantity is set to 0
      if (clampedValue === 0 && selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      }

      // Clear any existing timer for this item
      if (debounceTimers.current[id]) {
        clearTimeout(debounceTimers.current[id]);
      }

      // Set a new timer for 3 seconds to confirm the change
      debounceTimers.current[id] = setTimeout(() => {
        handleConfirmQuantityChange(id, clampedValue); // Update the database
        delete debounceTimers.current[id]; // Clean up the timer after execution
      }, 3000);
    }
  };

  useEffect(() => {
    // Cleanup timers when the component unmounts
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        clearTimeout(timer);
      });
      debounceTimers.current = {}; // Ensure all timers are cleared
    };
  }, []);

  const handleRemoveItem = (itemId) => {
    handleDelete(itemId);
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  return (
    <CardContent
      sx={{
        padding: 0,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : cartItems.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray", py: 5 }}>
          No items added
        </Typography>
      ) : (
        <>
          {/* Sticky Select All & Remove Buttons */}
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
              userSelect: "none",
            }}
          >
            <Box
              onClick={() => {
                const availableItems = cartItems
                  .filter(
                    (item) =>
                      item.status !== "Unavailable" &&
                      (item.isDisplay === undefined ||
                        item.isDisplay === true) &&
                      (quantityInputs[item.id] ?? item.quantity) > 0 // Exclude items with quantity 0
                  )
                  .map((item) => item.id);

                if (
                  availableItems.length > 0 &&
                  availableItems.every((id) => selectedItems.includes(id))
                ) {
                  setSelectedItems([]); // Deselect all
                } else {
                  setSelectedItems(availableItems); // Select only available items
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                userSelect: "none",
                cursor: "pointer",
              }}
            >
              <Checkbox
                checked={
                  cartItems.filter(
                    (item) =>
                      item.status !== "Unavailable" &&
                      (item.isDisplay === undefined ||
                        item.isDisplay === true) &&
                      (quantityInputs[item.id] ?? item.quantity) > 0 // Exclude items with quantity 0
                  ).length > 0 &&
                  cartItems
                    .filter(
                      (item) =>
                        item.status !== "Unavailable" &&
                        (item.isDisplay === undefined ||
                          item.isDisplay === true) &&
                        (quantityInputs[item.id] ?? item.quantity) > 0 // Exclude items with quantity 0
                    )
                    .every((item) => selectedItems.includes(item.id))
                }
                onChange={() => {}} // Prevent default checkbox behavior
              />

              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "green",
                  fontSize: "0.875rem",
                }}
              >
                Select All
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <Button
                color="error"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                disabled={selectedItems.length === 0}
                onClick={() => handleDelete(selectedItems)}
              >
                Remove
              </Button>
            </Box>
          </Box>

          {/* Cart Items List */}
          <Box
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
              pr: 1,
              p: 0,
            }}
          >
            {cartItems.map((item) => (
              <Box
                key={item.id}
                display="flex"
                gridTemplateColumns="50px 1fr 50px"
                alignItems="center"
                p={1}
                sx={{
                  borderBottom: "1px solid #ddd",
                  userSelect: "none",
                  backgroundColor:
                    item.status === "Unavailable" ||
                    (item.isDisplay !== undefined && item.isDisplay === false)
                      ? "grey.200"
                      : "transparent",
                }}
              >
                {/* Checkbox for Selection */}
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  disabled={
                    item.status === "Unavailable" ||
                    (item.isDisplay !== undefined &&
                      item.isDisplay === false) ||
                    (quantityInputs[item.id] ?? item.quantity) === 0 // Disable if quantity is 0
                  }
                  onChange={() => toggleSelectItem(item.id)}
                />

                {/* Item Details */}
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 90,
                        minWidth: 60,
                        minHeight: 90,
                        borderRadius: 1,
                        flexShrink: 0,
                        objectFit: "cover",
                        padding: 1,
                        userSelect: "none",
                      }}
                      image={item.image}
                      alt={item.name}
                    />

                    <Box sx={{ ml: 1, flexGrow: 1 }}>
                      <Typography
                        fontWeight="bold"
                        component={Link}
                        to={`/item-info/${item.id}`}
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <>
                          {item.name}{" "}
                          {(item.status === "Unavailable" ||
                            item.isDisplay === false) && (
                            <span
                              style={{ color: "red" }}
                            >{`(Unavailable)`}</span>
                          )}
                        </>
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {item.type || "Unknown"}
                      </Typography>

                      {/* Quantity Controls & Stocks Info */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 1,
                        }}
                      >
                        {/* Quantity Controls */}
                        <div>
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
                              disabled={
                                item.status === "Unavailable" ||
                                (item.isDisplay !== undefined &&
                                  item.isDisplay === false)
                              }
                              sx={{
                                color: "green",
                                padding: "2px",
                              }}
                              onClick={() =>
                                handleInputChange(
                                  item.id,
                                  (quantityInputs[item.id] ?? item.quantity) - 1
                                )
                              }
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            {/* Quantity Input */}
                            <TextField
                              value={
                                quantityInputs[item.id] ??
                                item.localQuantity ??
                                item.quantity
                              }
                              onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                              }
                              onFocus={(e) => e.target.select()} // Select the value when the field is focused
                              type="number"
                              disabled={
                                item.status === "Unavailable" ||
                                (item.isDisplay !== undefined &&
                                  item.isDisplay === false)
                              }
                              inputProps={{ min: 0, max: 99999, maxLength: 5 }} // Allow 0 as the minimum value
                              variant="standard"
                              size="small"
                              sx={{
                                width: "50px",
                                textAlign: "center",
                                padding: 0,
                                userSelect: "none",
                                pointerEvents:
                                  item.status === "Unavailable" ||
                                  (item.isDisplay !== undefined &&
                                    item.isDisplay === false)
                                    ? "none"
                                    : "auto",
                                opacity:
                                  item.status === "Unavailable" ||
                                  (item.isDisplay !== undefined &&
                                    item.isDisplay === false)
                                    ? 0.5
                                    : 1,
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
                              disabled={
                                item.status === "Unavailable" ||
                                (item.isDisplay !== undefined &&
                                  item.isDisplay === false)
                              }
                              sx={{
                                color: "green",
                                padding: "2px",
                              }}
                              onClick={() =>
                                handleInputChange(
                                  item.id,
                                  (quantityInputs[item.id] ?? item.quantity) + 1
                                )
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </div>
                        {/* Stocks Info */}
                        <Typography
                          variant="body2"
                          sx={{ color: "gray", minWidth: "80px" }}
                        >
                          Stocks: {item.stocks}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Remove Button */}
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </>
      )}
    </CardContent>
  );
};

export default CartItemList;
