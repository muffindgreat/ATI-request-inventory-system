import { useEffect, useState } from "react";
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
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CardHeaderCenter from "../../components/UI/CardHeaderCenter";
import useToast from "../../components/Toastify/useToast";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

export default function CartOrderSummary({
  cartItems,
  selectedItems,
  totalItems,
}) {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);
  const [userData, setUserData] = useState({
    designation: null,
    section: null,
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const showToast = useToast();

  // Fetch user data to check designation and section
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "User", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData({
              designation: data.designation || null,
              section: data.section || null,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Recalculate total quantity whenever selectedItems or cartItems change
  useEffect(() => {
    const total = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, [cartItems, selectedItems]);

  const handleOpenCheckoutConfirm = () => {
    setOpenConfirm(true); // Open the confirmation dialog
  };

  const handleConfirmCheckout = () => {
    if (!userData.designation || !userData.section) {
      showToast(
        "Please complete your profile with designation and section to proceed.",
        "error"
      );
    } else {
      navigate("/material-request-form", {
        state: { selectedItems: getSelectedCartItems() },
      });
    }
    setOpenConfirm(false); // Close the confirmation dialog
  };

  const getSelectedCartItems = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id)) // Filter selected items
      .map(({ id, name, quantity, type }) => ({
        itemID: id,
        quantity,
        title: name,
        type,
      }));
  };

  return (
    <>
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
                        backgroundColor:
                          index % 2 === 0 ? "#e0e0e0" : "#ffffff",
                        cursor: isExpanded ? "default" : "pointer",
                        transition: "max-height 0.3s ease-in-out",
                        maxHeight: isExpanded ? "100px" : "50px",
                        overflow: "hidden",
                      }}
                      onClick={() =>
                        setExpandedRows((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((rowId) => rowId !== item.id)
                            : [...prev, item.id]
                        )
                      }
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

        {/* Footer Section */}
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
            onClick={handleOpenCheckoutConfirm}
          >
            Check Out
          </Button>
        </Box>
      </Card>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Confirm Checkout"
        message={
          <>
            <Typography>
              Are you sure you want to proceed to checkout with the following
              items?
            </Typography>
            <ul>
              {cartItems
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} pcs
                  </li>
                ))}
            </ul>
          </>
        } // Dynamically list selected items and their quantities
        onConfirm={handleConfirmCheckout}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
}
