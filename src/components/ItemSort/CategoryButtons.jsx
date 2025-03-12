import { Button, Stack, useMediaQuery } from "@mui/material";

const categories = ["Rice", "Corn", "Coconut"];

const CategoryButtons = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      direction="row"
      spacing={isMobile ? 0.5 : 1}
      mt={1}
      flexWrap="wrap"
      justifyContent="center"
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
            minWidth: isMobile ? "70px" : "80px",
            fontSize: isMobile ? "12px" : "14px",
            "&:hover": { bgcolor: "lightgray" },
          }}
          onClick={() => onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </Stack>
  );
};

export default CategoryButtons;
