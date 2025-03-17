import { useState, useEffect } from "react";
import { Box, Stack, useMediaQuery, Container } from "@mui/material";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import CategoryButtons from "./CategoryButtons";

const SearchFilterBar = ({ onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (order) => setFilter(order);
  const handleCategorySelect = (category) => onCategoryChange(category);

  return (
    <>
      <Box sx={{ height: `${navbarHeight}px` }} />{" "}
      {/* Spacer for content shift */}
      <Box
        sx={{
          bgcolor: "green",
          p: isMobile ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          top: `${navbarHeight}px`, // Position below navbar
          width: "100vw", // Full width of viewport
          maxWidth: "100%", // Prevent overflow
          overflowX: "hidden", // Remove horizontal scrolling
          boxSizing: "border-box", // Include padding/margin in width calculation
          zIndex: 1000,
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Stack
            direction="row" // Ensures row layout
            spacing={2} // Adjust spacing between SearchBar & FilterButton
            alignItems="center" // Centers items vertically
            justifyContent="center" // Centers items horizontally
            sx={{
              flexWrap: "nowrap", // Prevents wrapping to the next line
              mx: isMobile ? 2 : 0, // Adds left & right margin on small screens
            }}
          >
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            <FilterButton onFilter={handleFilterChange} />
          </Stack>
        </Container>

        <CategoryButtons onSelect={handleCategorySelect} />
      </Box>
    </>
  );
};

export default SearchFilterBar;
