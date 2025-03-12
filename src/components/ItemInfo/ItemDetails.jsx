import { Box, Typography, Button } from "@mui/material";

const ItemDetails = ({ isSmallScreen }) => {
  return (
    <Box sx={{ flex: 1, p: isSmallScreen ? 2 : 5 }}>
      <Typography variant="h6" gutterBottom>
        Item Name
      </Typography>
      <Typography variant="body2" gutterBottom>
        Categories
      </Typography>

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
  );
};

export default ItemDetails;
