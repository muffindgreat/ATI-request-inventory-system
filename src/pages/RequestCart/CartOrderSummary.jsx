import {
  Card,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHeaderCenter from "../../components/UI/CardHeaderCenter";

export default function CartOrderSummary({
  cartItems,
  selectedItems,
  totalItems,
  totalQuantity,
}) {
  const navigate = useNavigate();
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
                  backgroundColor: "#e0e0e0",
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
              .map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell
                    sx={{
                      maxWidth: "50px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {/* <Tooltip title={item.name} arrow> */}
                    <span>{item.name}</span>
                    {/* </Tooltip> */}
                  </TableCell>

                  <TableCell align="center" sx={{ width: "100px" }}>
                    {item.quantity} pcs
                  </TableCell>
                </TableRow>
              ))}
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
