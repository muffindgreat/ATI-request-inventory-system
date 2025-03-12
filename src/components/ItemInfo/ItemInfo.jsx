import { Container, Paper, Box, useMediaQuery, useTheme } from "@mui/material";
import TopBar from "./TopBar";
import ImagePlaceholder from "./ImagePlaceholder";
import ItemDetails from "./ItemDetails";

const ItemInfo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            p: 3,
            gap: 2,
          }}
        >
          <ImagePlaceholder
            isSmallScreen={isSmallScreen}
            imageSrc="/ngulay.jpg"
          />
          <ItemDetails isSmallScreen={isSmallScreen} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ItemInfo;
