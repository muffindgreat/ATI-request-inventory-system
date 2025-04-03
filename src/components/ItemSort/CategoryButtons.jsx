import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, useMediaQuery } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const CategoryDropdown = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
      const categoryList = [
        "All Categories",
        ...snapshot.docs.map((doc) => doc.data().bannerProgram),
      ];
      setCategories(categoryList);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelect(category === "All Categories" ? null : category);
  };

  return (
    <FormControl sx={{ width: "250px", height: "45px" }}>
      <Select
        value={selectedCategory}
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: "white",
          height: "45px", // Match search bar height
          borderRadius: "15px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9ACD32",
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
      >
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
