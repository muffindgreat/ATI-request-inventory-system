import {
  Container,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // ✅ Import useAuth

const ItemInfo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { currentUser } = useAuth(); // ✅ Use currentUser from AuthContext
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasUpdated = useRef(false); // Prevents duplicate updates

  useEffect(() => {
    console.log("Current User from AuthContext:", currentUser); // ✅ Debugging user state

    const fetchAndUpdateViews = async () => {
      if (hasUpdated.current) return;
      hasUpdated.current = true;

      try {
        const docRef = doc(db, "Inventory", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = docSnap.data();

          // Optimistically update state to show new views count
          setItem({
            ...itemData,
            views: (itemData.views || 0) + 1,
          });

          // Update Firestore views count
          await updateDoc(docRef, { views: increment(1) });

          // Fetch updated data
          const updatedSnap = await getDoc(docRef);
          if (updatedSnap.exists()) {
            setItem(updatedSnap.data());
          }
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching/updating item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateViews();
  }, [id, currentUser]);

  const addToCart = async () => {
    console.log("Current User in addToCart:", currentUser); // ✅ Debugging user state

    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const userDocRef = doc(db, "User", currentUser.uid); // ✅ Use correct user UID

      await updateDoc(userDocRef, {
        cart: arrayUnion({ itemId: id, quantity: 1 }),
      });

      alert("Item added to request cart!");
    } catch (error) {
      console.error("Error adding item to cart:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        userUID: currentUser?.uid,
        itemId: id,
      });
      alert(`Failed to add item to cart. Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Item not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundImage />
      <Container
        maxWidth="md"
        sx={{ alignContent: "center", pt: { xs: 12, sm: 14, md: 16 }, mb: 10 }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 900,
            overflow: "hidden",
            boxShadow: "-8px 8px 14px rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
          }}
        >
          <CustomCardHeader title="Item Info" showBackButton />

          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              p: 3,
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: isSmallScreen ? "100%" : "30%",
                height: isSmallScreen ? 240 : 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                aspectRatio: "3/4",
                overflow: "hidden",
                bgcolor: "grey.300",
              }}
            >
              <img
                src={item.imageUrl || "/default-image.jpg"}
                alt={item.itemName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box sx={{ flex: 1, p: isSmallScreen ? 2 : 5 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {item.itemName}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {item.type}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Views: {item.views || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Downloads: {item.downloads || 0}
              </Typography>

              {item.bannerPrograms?.length > 0 && (
                <Stack direction="row" sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
                  {item.bannerPrograms.map((program, i) => (
                    <Chip
                      key={i}
                      label={program}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Stack>
              )}

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexDirection: isSmallScreen ? "column" : "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1A854B",
                    color: "white",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    if (item.pdfLink) {
                      console.log("Downloading PDF from:", item.pdfLink);
                      window.open(item.pdfLink, "_blank");
                    } else {
                      console.error("Error: No PDF link available.");
                      alert("PDF is not available for download.");
                    }
                  }}
                >
                  Download PDF
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1A854B",
                    color: "white",
                    textTransform: "none",
                  }}
                  onClick={addToCart}
                >
                  Add to Request Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ItemInfo;
