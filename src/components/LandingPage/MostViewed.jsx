import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";
import { allMaterials } from "../UI/sample_data"; // Import the materials data

const MostViewed = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: false,
    arrows: false,
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#555",
          borderRadius: "50%",
          margin: "0 5px",
          transition: "all 0.3s ease",
        }}
      />
    ),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "rgb(255, 255, 255)",
          py: 6,
          margin: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#000",
            textAlign: "center",
            mb: { xs: 1, sm: 2 }, // Adjusts margin bottom for different screens
            fontWeight: "normal",
            mt: { xs: 3, sm: 4, md: 6 }, // Adjusts margin top
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // Responsive font size
          }}
        >
          MOST VIEWED
        </Typography>
        <Box 
          sx={{ 
            width: "90%", 
            mx: "auto", 
            position: "relative",
            '& .slick-track': {
              display: 'flex',
              gap: { xs: '4px', sm: '8px', md: '12px' }, // Adjust spacing between slides
            },
            '& .slick-slide': {
              display: 'flex',
              justifyContent: 'center',
            },
            '& .slick-list': {
              overflow: "hidden",
            },
            '& .slick-dots': {
              position: 'absolute',
              bottom: '-60px', /* Move dots lower */
              display: 'flex !important',
              justifyContent: 'center',
              listStyle: 'none',
            },
          }}
        >
          <Slider {...settings}>
            {allMaterials.map((material, index) => (
              <Box key={index} sx={{ flex: "0 0 auto" }}>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    position: "relative",
                    display: "block",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.22)",
                      borderRadius: "4px",
                      px: 1,
                      py: 0.5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: "transparent",
                        border: "2px solid white",
                        mr: 0.5,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {material.views}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "300px", // Set uniform width
                      maxHeight: "450px", // Set uniform height
                      position: "relative",
                      aspectRatio: "9 / 16",
                      overflow: "hidden",
                      borderRadius: "8px",
                      display: "flex", // Ensures images take up full box
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={material.image}
                      alt={material.name}
                      style={{
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", // Ensures images fill the box uniformly
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </a>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default MostViewed;