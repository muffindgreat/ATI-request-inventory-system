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
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const ItemInfo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasUpdated = useRef(false); // Prevents duplicate updates

  useEffect(() => {
    const fetchAndUpdateViews = async () => {
      if (hasUpdated.current) return; // Prevent multiple updates in strict mode
      hasUpdated.current = true;

      try {
        const docRef = doc(db, "inventory", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = docSnap.data();

          // Optimistically update state to show new views count
          setItem((prev) => ({
            ...itemData,
            views: (itemData.views || 0) + 1, // Increase views count before Firestore update
          }));

          // Update Firestore views count
          await updateDoc(docRef, { views: increment(1) });

          // Fetch the latest data to ensure consistency
          const updatedSnap = await getDoc(docRef);
          if (updatedSnap.exists()) {
            setItem(updatedSnap.data()); // Set the real updated data
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
  }, [id]);

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
            {/* Image */}
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

            {/* Item Details */}
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

              {/* Buttons */}
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
                  onClick={() => window.open(item.pdfUrl, "_blank")}
                  disabled={!item.pdfUrl}
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
