import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../NavBar/Navbar";

const MostViewed = () => {
  return (
    <>
      <Navbar />

      {/* Title */}
      <Typography
        variant="h6"
        sx={{ whiteSpace: "pre-line", textAlign: "center", mt: 2 }}
      >
        Line One {"\n"} Line Two
      </Typography>

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
    </>
  );
};

export default MostViewed;
