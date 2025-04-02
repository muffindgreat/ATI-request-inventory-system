import { Button, Stack, useMediaQuery } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";

const CategoryButtons = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Real-time listener for the "Category" collection
    const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
      const categoryList = [
        "All",
        ...snapshot.docs.map((doc) => doc.data().bannerProgram),
      ]; // Add "All" as default
      setCategories(categoryList);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => unsubscribe();
  }, []);

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
