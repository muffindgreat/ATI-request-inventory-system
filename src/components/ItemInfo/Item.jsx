import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ItemInfo() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="md"
      sx={{
        display:"flex",
        alignContent:"center",
        alignItems:"center",
        alignItems: "center",
        justifyContent:"center",
        height:"95vh",
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
        {/* Top Bar */}
        <AppBar position="static" sx={{ bgcolor: "green" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Item Info</Typography>
          </Toolbar>
        </AppBar>

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
              bgcolor: "grey.300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              aspectRatio: "3/4",
            }}
          >
            <Typography variant="body2">Image Placeholder</Typography>
          </Box>

          {/* Text and Buttons */}
          <Box sx={{ flex: 1, p: isSmallScreen ? 2 : 5 }}>
            <Typography variant="h6" gutterBottom>
              Item Name
            </Typography>
            <Typography variant="body2" gutterBottom>
              Categories
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2, flexDirection: isSmallScreen ? "column" : "row" }}>
              <Button
                variant="contained"
                fullWidth={isSmallScreen}
                sx={{ bgcolor: "green", color: "white" }}
              >
                Download PDF
              </Button>
              <Button
                variant="contained"
                fullWidth={isSmallScreen}
                sx={{ bgcolor: "green", color: "white" }}
              >
                Add to Request Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
