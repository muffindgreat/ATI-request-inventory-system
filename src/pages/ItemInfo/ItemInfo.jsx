import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig"; // Ensure your Firebase config is correct
import { doc, getDoc } from "firebase/firestore";

const ItemInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "inventory", id); // Fetch from Firestore collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem(docSnap.data());
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Header */}
      <Paper
        sx={{
          backgroundColor: "#1A854B",
          color: "white",
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: "white" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Item Info
        </Typography>
      </Paper>

      {/* Content */}
      <Paper
        sx={{
          p: 3,
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 3,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "30%" },
            maxWidth: 250,
            aspectRatio: "3/4",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.300",
          }}
        >
          <img
            src={item.imageUrl || "/default-image.jpg"} // Use default image if none
            alt={item.itemName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Info Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {item.itemName} {/* Now displayed in large font */}
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

          {/* Tags */}
          {item.bannerPrograms?.length > 0 && (
            <Stack direction="row" sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
              {item.bannerPrograms.map((program, i) => (
                <Chip key={i} label={program} color="primary" size="small" />
              ))}
            </Stack>
          )}

          {/* Buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#1A854B", color: "white", textTransform: "none" }}
              onClick={() => window.open(item.pdfUrl, "_blank")}
              disabled={!item.pdfUrl}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#1A854B", color: "white", textTransform: "none" }}
            >
              Add to Request Cart
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ItemInfo;
