import { Button, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";

const categories = ["All", "Rice", "Corn", "Coconut", "Livestock", "Fisheries", "Organic Agriculture"];

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
      spacing={isMobile ? 1 : 2} // Adjust spacing for mobile
      mt={isMobile ? 0.5 : 1}
      flexWrap="wrap"
      justifyContent="center"
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "contained" : "outlined"}
          sx={{
            bgcolor: activeCategory === category ? "#FFB603" : "white",
            color: activeCategory === category ? "white" : "black",
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "bold",
            minWidth: isMobile ? "80px" : "140px", // Adjust button width
            fontSize: isMobile ? "12px" : "14px",
            mx: isMobile ? "5px" : "10px", // Adjust horizontal margin
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
