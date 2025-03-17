import { Card, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function CartOrderSummary({ cartItems, selectedItems, totalItems, totalQuantity }) {
  if (selectedItems.length === 0) return null; // Hide summary if no items are selected

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        opacity: 1,
        transform: "scale(1)",
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        maxHeight: "400px",
      }}
    >
      {/* Header Section */}
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

      {/* Item List Section */}
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
                      maxWidth: "200px",
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
        <Button variant="contained" sx={{ backgroundColor: "green", color: "white", textTransform: "none" }}>
          Check Out
        </Button>
      </Box>
    </Card>
  );
}
