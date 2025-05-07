import React, { useState, useEffect } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CartItemList = ({
  cartItems,
  selectedItems,
  setSelectedItems,
  toggleSelectItem,
  handleQuantityChange,
  handleConfirmQuantityChange,
  handleDelete,
  loading, // Assuming 'loading' is passed as a prop
}) => {
  const [quantityInputs, setQuantityInputs] = useState({});
  const [pendingUpdates, setPendingUpdates] = useState({});

  const handleInputChange = (id, value) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(99999, Math.max(1, numericValue));

      setQuantityInputs((prev) => ({ ...prev, [id]: clampedValue }));
      setPendingUpdates((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleConfirmChange = async (id) => {
    if (quantityInputs[id] !== undefined) {
      await handleConfirmQuantityChange(id, quantityInputs[id]);
      setPendingUpdates((prev) => ({ ...prev, [id]: false }));
    }
  };

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
        // "&:last-child": {
        //   paddingBottom: 0,
        // },
      }}
    >
      {loading ? ( // Show loading spinner when loading is true
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
                      (item.isDisplay === undefined || item.isDisplay === true)
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
                      (item.isDisplay === undefined || item.isDisplay === true)
                  ).length > 0 &&
                  cartItems
                    .filter(
                      (item) =>
                        item.status !== "Unavailable" &&
                        (item.isDisplay === undefined ||
                          item.isDisplay === true)
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
                    (item.isDisplay !== undefined && item.isDisplay === false)
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
                          value={quantityInputs[item.id] ?? item.quantity}
                          onChange={(e) =>
                            handleInputChange(item.id, e.target.value)
                          }
                          type="number"
                          disabled={
                            item.status === "Unavailable" ||
                            (item.isDisplay !== undefined &&
                              item.isDisplay === false)
                          }
                          inputProps={{ min: 1, max: 99999, maxLength: 5 }}
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

                        {/* Confirmation Check Button */}
                        {pendingUpdates[item.id] && (
                          <IconButton
                            size="small"
                            sx={{ color: "blue", padding: "2px", ml: 1 }}
                            onClick={() => handleConfirmChange(item.id)}
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        )}
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
