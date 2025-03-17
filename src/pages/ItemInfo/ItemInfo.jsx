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

  // Sample Data (From provided materials)
  const sampleMaterial = {
    name: "Fisheries Guide Book",
    type: "Book",
    image: "/broiler.jpg",
    bannerPrograms: ["Livestock", "Poultry", "Agriculture"],
    views: 120,
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
          pt: { xs: 12, sm: 14, md: 16 },
          mb: 10,
        }}
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
                  cursor: "pointer",
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
                Views: {item.views}
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
                Downloads: {item.downloadCount || 0}
              </Typography>

              {/* Banner Programs */}
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
