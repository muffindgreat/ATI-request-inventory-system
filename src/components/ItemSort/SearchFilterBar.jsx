import { useState, useEffect } from "react";
import { Box, Stack, useMediaQuery, Container } from "@mui/material";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import CategoryButtons from "./CategoryButtons";
import ImageLibrary from "../LandingPage/Library";

const SearchFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (order) => setFilter(order);
  const handleCategorySelect = (category) => setSelectedCategory(category);

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
            maxWidth: isMobile ? "90%" : "1200px", // Mobile: 90% width, Desktop: max 1200px
          }}
        >
          <Stack
            direction="row"
            spacing={isMobile ? 1 : 2} // Reduce spacing on mobile
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
          {" "}
          {/* Adjust spacing for mobile */}
          <CategoryButtons onSelect={handleCategorySelect} />
        </Box>
      </Box>

      <ImageLibrary selectedCategory={selectedCategory} />
    </>
  );
};

export default SearchFilterBar;
