import { Button, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";

const categories = ["All", "Rice", "Corn", "Coconut"];

const CategoryButtons = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleClick = (category) => {
    setActiveCategory(category);
    onSelect(category === "All" ? null : category); // Reset filter if "All" is selected
  };

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
          variant={activeCategory === category ? "contained" : "outlined"}
          sx={{
            bgcolor: activeCategory === category ? "#00b300" : "white",
            color: activeCategory === category ? "white" : "black",
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
            minWidth: isMobile ? "70px" : "80px",
            fontSize: isMobile ? "12px" : "14px",
            "&:hover": { bgcolor: "lightgray" },
          }}
          onClick={() => handleClick(category)}
        >
          {category}
        </Button>
      ))}
    </Stack>
  );
};

export default CategoryButtons;
