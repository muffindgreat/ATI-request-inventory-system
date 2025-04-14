import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, useMediaQuery } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const CategoryDropdown = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
      const categoryList = [
        "All Categories",
        ...snapshot.docs.map((doc) => doc.data().bannerProgram),
      ];
      const sortedCategoryList = categoryList.sort((a, b) =>
        a.localeCompare(b)
      );
      setCategories(sortedCategoryList);

      // Ensure selected category is valid
      setSelectedCategory((prev) =>
        sortedCategoryList.includes(prev) ? prev : "All Categories"
      );
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelect(category === "All Categories" ? null : category);
  };

  return (
    <FormControl
      sx={{ width: "250px", height: "45px", fontFamily: "'Lato', sans-serif" }}
    >
      <Select
        value={categories.includes(selectedCategory) ? selectedCategory : ""}
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: "white",
          height: "45px",
          borderRadius: "15px",
          fontFamily: "'Lato', sans-serif",
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
              fontFamily: "'Lato', sans-serif",
            },
          },
        }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            value={category}
            sx={{ fontFamily: "'Lato', sans-serif" }}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
