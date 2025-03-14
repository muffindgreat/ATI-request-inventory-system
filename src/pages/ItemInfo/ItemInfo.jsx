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
} from "@mui/material";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";
import { useState } from "react";

const ItemInfo = ({ material }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isExpanded, setIsExpanded] = useState(false);

  // Sample Data (Used if no props are passed)
  const sampleMaterial = {
    name: "Sustainable Farming Guide",
    type: "Brochure",
    image:
      "https://diybookcovers.com/wp-content/uploads/2023/07/scifi4thumb.jpg", // Replace with an actual image URL
    bannerPrograms: ["Organic Agriculture", "Agri-Tech Innovations"],
  };

  // Use the provided material or fallback to sampleMaterial
  const item = material || sampleMaterial;

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
        sx={{
          alignContent: "center",
          pt: { xs: 12, sm: 14, md: 16 }, // Adjust padding top based on screen size
          mb: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "-8px 8px 14px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Header */}
          <CustomCardHeader title="Item Info" showBackButton />

          {/* Main Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              p: 3,
              gap: 2,
            }}
          >
            {/* Image Placeholder */}
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
                src={item.image}
                alt={item.name}
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
              <Typography
                variant="h6"
                gutterBottom
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  cursor: "pointer", // Makes it clear it's clickable
                  display: isExpanded ? "block" : "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: isExpanded ? "unset" : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: isExpanded ? "normal" : "unset",
                }}
              >
                {item.name}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {item.type}
              </Typography>

              {/* Banner Programs */}
              {item.bannerPrograms?.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, flexWrap: "wrap" }}
                >
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
                  flexWrap: "wrap", // Ensures wrapping if needed
                  width: "100%", // Makes sure buttons expand properly
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1A854B",
                    color: "white",
                    textTransform: "none",
                    width: isSmallScreen ? "100%" : "auto", // Explicitly set width
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
                    width: isSmallScreen ? "100%" : "auto", // Ensures proper width
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
