import { useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import CategoryButtons from "./CategoryButtons";

const SearchFilterBar = ({ onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (order) => setFilter(order);
  const handleCategorySelect = (category) => onCategoryChange(category);

  return (
    <Box
      sx={{
        bgcolor: "green",
        p: isMobile ? 1 : 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 1 : 2}
        alignItems="center"
        width={isMobile ? "100%" : "auto"}
      >
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <FilterButton onFilter={handleFilterChange} />
      </Stack>
      <CategoryButtons onSelect={handleCategorySelect} />
    </Box>
  );
};

export default SearchFilterBar;
