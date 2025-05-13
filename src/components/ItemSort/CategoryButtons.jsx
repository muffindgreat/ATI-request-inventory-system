import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, useMediaQuery } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams

const CategoryDropdown = ({ onSelect }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manage query params

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
      const activeCategories = snapshot.docs
        .map((doc) => doc.data())
        .filter((data) => data.status === "Active")
        .map((data) => data.bannerProgram);

      const sortedActiveCategories = activeCategories.sort((a, b) =>
        a.localeCompare(b)
      );

      const categoryList = ["All Categories", ...sortedActiveCategories];
      setCategories(categoryList);

      // Ensure selected category is valid
      setSelectedCategory((prev) =>
        categoryList.includes(prev) ? prev : "All Categories"
      );
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Sync selected category with the query parameter
    const categoryFromParams = searchParams.get("category") || "All Categories";
    setSelectedCategory(categoryFromParams);
  }, [searchParams]);

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Preserve the search query parameter while updating the category query
    const currentSearch = searchParams.get("search");
    if (category === "All Categories") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    if (currentSearch) searchParams.set("search", currentSearch);

    setSearchParams(searchParams);

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
