import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  useMediaQuery,
  Container,
  Typography,
} from "@mui/material";
import { db } from "../../config/firebaseConfig";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import CategoryButtons from "./CategoryButtons";
import ImageLibrary from "../LandingPage/Library";

const SearchFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting A-Z
  const isMobile = useMediaQuery("(max-width:600px)");
  const [navbarHeight, setNavbarHeight] = useState(70);
  const [images, setImages] = useState([]); // Add images state

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    } else {
      setNavbarHeight(isMobile ? 70 : 90); // If navbar not found, adjust based on screen size
    }
  }, [isMobile]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (order) => setSortOrder(order); // Update sorting order
  const handleCategorySelect = (category) => setSelectedCategory(category);

  // Callback to get images from ImageLibrary
  const handleImagesReceived = (imagesData) => {
    setImages(imagesData);
  };

  // Check if there's a search term or selected category
  const hasSearchedOrFiltered = searchTerm || selectedCategory;

  // Check if no images match the criteria (Search term or Category)
  const filteredImages = images.filter(
    (image) =>
      (searchTerm
        ? image.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        : true) &&
      (selectedCategory ? image.categories.includes(selectedCategory) : true)
  );

  const isNoImagesAvailable =
    filteredImages.length === 0 && hasSearchedOrFiltered;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#1E874A",
          p: isMobile ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          top: `${navbarHeight}px`,
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          boxSizing: "border-box",
          zIndex: 1000,
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: isMobile ? "90%" : "1200px",
          }}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1 : 2}
            alignItems={isMobile ? "stretch" : "center"}
            justifyContent="space-between"
            sx={{
              flexWrap: "nowrap",
              width: "100%",
              maxWidth: isMobile ? "100%" : "1200px", // Ensure there's space for all elements
            }}
          >
            <Box sx={{ width: isMobile ? "100%" : "auto", flexGrow: 1 }}>
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: isMobile ? "100%" : "auto",
                justifyContent: "center", // Center the group of Category and Filter buttons
                alignItems: "center", // Align items vertically within the group
                flexShrink: 0, // Allow the stack to grow to fill available space
              }}
            >
              <CategoryButtons onSelect={handleCategorySelect} />
              <Box sx={{ marginLeft: 1 }}>
                <FilterButton onFilter={handleFilterChange} />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <ImageLibrary
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        db={db}
        onImagesReceived={handleImagesReceived}
      />

      {/* If no images found and search term or category is provided */}
      {isNoImagesAvailable && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            {searchTerm
              ? "No materials found matching your search."
              : selectedCategory
              ? "No materials found in this category."
              : "No materials available."}
          </Typography>
        </Box>
      )}

      {/* Show "No materials available" only if the user has not searched or selected a category */}
      {images.length === 0 && !hasSearchedOrFiltered && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 2,
          }}
        ></Box>
      )}
    </>
  );
};

export default SearchFilterBar;
