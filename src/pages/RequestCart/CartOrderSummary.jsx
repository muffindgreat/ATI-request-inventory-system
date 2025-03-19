import {
  Card,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CardHeaderCenter from "../../components/UI/CardHeaderCenter";

export default function CartOrderSummary({
  cartItems,
  selectedItems,
  totalItems,
  totalQuantity,
}) {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        opacity: selectedItems.length > 0 ? 1 : 0,
        transform: selectedItems.length > 0 ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        maxHeight: "400px",
      }}
    >
      <CardHeaderCenter
        title="Summary"
        sx={{
          height: "40px",
          backgroundColor: "#1E874A",
          color: "#fff",
          flexShrink: 0,
        }}
      />

      {/* Item List Section */}
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: 1.5,
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "250px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#ffffff",
                  color: "#1A854B",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  maxWidth: "200px",
                }}
              >
                Particulars
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  color: "#1A854B",
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
              .map((item, index) => {
                const isExpanded = expandedRows.includes(item.id);
                return (
                  <TableRow
                    key={item.id || index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#e0e0e0" : "#ffffff",
                      cursor: "pointer",
                      transition: "max-height 0.3s ease-in-out",
                      maxHeight: isExpanded ? "100px" : "50px",
                      overflow: "hidden",
                    }}
                    onClick={() => toggleRowExpansion(item.id)}
                  >
                    <TableCell
                      sx={{
                        maxWidth: isExpanded ? "none" : "50px",
                        overflow: isExpanded ? "visible" : "hidden",
                        textOverflow: isExpanded ? "clip" : "ellipsis",
                        whiteSpace: isExpanded ? "normal" : "nowrap",
                        border: "none",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {item.name}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        width: "100px",
                        border: "none",
                        transition: "opacity 0.3s ease-in-out",
                        opacity: isExpanded ? 1 : 0.8,
                      }}
                    >
                      {item.quantity} pcs
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>

      {/* Footer Section: Always Stays at Bottom */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Total {totalItems} items: {totalQuantity} pcs
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1A854B",
            color: "white",
            textTransform: "none",
            p: 1,
          }}
          onClick={() => navigate("/material-request")}
        >
          Check Out
        </Button>
      </Box>
    </Card>
  );
}
