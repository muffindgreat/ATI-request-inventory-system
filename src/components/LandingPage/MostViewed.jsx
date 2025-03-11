import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Navbar from "../NavBar/Navbar";

const MostViewed = () => {
  return (
    <>
      <Navbar />

      {/* Title - MOST VIEWED */}
      <Typography variant="h6">Line One {"\n"} Line Two</Typography>
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          mb: 2,
          position: "relative",
          zIndex: 10, // Ensures it's above other elements
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#000", textTransform: "uppercase" }}
          gutterBottom
        >
          MOST VIEWED
        </Typography>
      </Box>

      {/* Image Grid */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        mb={4}
        sx={{ flexWrap: "wrap" }}
      >
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 180,
              height: 220,
              bgcolor: "grey.300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <SearchIcon fontSize="large" />
          </Box>
        ))}
      </Box>

      {/* Search & Filters */}
      <Box
        sx={{
          bgcolor: "green",
          py: 2,
          px: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
        }}
      >
        {/* Search Input */}
        <TextField
          variant="outlined"
          placeholder="Search by..."
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            width: "250px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <FilterListIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filter Buttons */}
        {["Rice", "Corn", "Coconut"].map((item, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default MostViewed;
