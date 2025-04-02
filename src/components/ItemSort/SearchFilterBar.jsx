import { useState, useEffect } from "react";
import { Box, Stack, useMediaQuery, Container, Typography } from "@mui/material";
import { db } from "../../config/firebaseConfig";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import CategoryButtons from "./CategoryButtons";
import ImageLibrary from "../LandingPage/Library";

const SearchFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting A-Z
  const isMobile = useMediaQuery("(max-width:600px)");
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [images, setImages] = useState([]); // Add images state

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    } else {
      setNavbarHeight(80);
    }
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (order) => setSortOrder(order); // Update sorting order
  const handleCategorySelect = (category) => setSelectedCategory(category);

  // Callback to get images from ImageLibrary
  const handleImagesReceived = (imagesData) => {
    setImages(imagesData);
  };

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
            direction="row"
            spacing={isMobile ? 1 : 2}
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: "nowrap",
              width: "100%",
              maxWidth: isMobile ? "100%" : "600px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
            </Box>
            <FilterButton onFilter={handleFilterChange} />
          </Stack>
        </Container>

        <Box sx={{ mt: isMobile ? 1 : 1.25 }}>
          <CategoryButtons onSelect={handleCategorySelect} />
        </Box>
      </Box>

      <ImageLibrary
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        sortOrder={sortOrder} // ✅ Pass sort order to Library
        db={db}
        onImagesReceived={handleImagesReceived} // pass callback
      />

      {images.length === 0 || searchTerm && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 2,
          }}
        >
          <Typography variant="body1" color="textSecondary">
            No images found matching your search.
          </Typography>
        </Box>
      )}

      {images.length === 0 && selectedCategory && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 2,
          }}
        >
          {/* <Typography variant="body1" color="textSecondary">
            No images found in this category.
          </Typography> */}
        </Box>
      )}

      {images.length === 0 && !searchTerm && !selectedCategory && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 2,
          }}
        >
          {/* <Typography variant="body1" color="textSecondary">
            No images available.
          </Typography> */}
        </Box>
      )}

    </>
  );
};

export default SearchFilterBar;