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

const ItemInfo = ({ material }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Sample Data (Used if no props are passed)
  const sampleMaterial = {
    name: "Sustainable Farming Guide Sustainable Farming Guide Sustainable Farming Guide Sustainable Farming Guide Sustainable Farming Guide ",
    type: "Brochure",
    image:
      "https://diybookcovers.com/wp-content/uploads/2023/07/scifi4thumb.jpg", // Replace with an actual image URL
    bannerPrograms: ["Organic Agriculture", "Agri-Tech Innovations"],
  };

  // Use the provided material or fallback to sampleMaterial
  const item = material || sampleMaterial;

  return (
    <Box>
      <BackgroundImage />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          height: "95vh",
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
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
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
                }}
              >
                <Button
                  variant="contained"
                  fullWidth={isSmallScreen}
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
                  fullWidth={isSmallScreen}
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
