import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";
import { allMaterials } from "../UI/sample_data"; // Import the materials data

const MostViewed = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = allMaterials.length;
  const maxDots = 5;

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
    draggable: true,
    focusOnSelect: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => {
      let start = Math.max(0, currentSlide - Math.floor(maxDots / 2));
      let end = Math.min(totalSlides - 1, start + maxDots - 1);
      if (end - start + 1 < maxDots) start = Math.max(0, end - maxDots + 1);
      const isActive = i === currentSlide;
      return (
        <div
          onClick={() => setCurrentSlide(i)}
          style={{
            width: "20px",
            height: "4px",  
            background: isActive ? "#00ff1e" : "#f5f5f5", //Change color of the Pagination dots <left = active>
            margin: "0 5px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
        />
      );
    },
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
          width: "100vw",
          backgroundImage: "url('/image.png')",
          py: 6,
          backgroundSize: "cover", // Ensures the image fully covers the background
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
          margin: 0,
          zIndex:"-2",
        }}
      >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
          zIndex:"-1",
        }}
      />
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#fff",
            textAlign: "center",
            mb: { xs: 1, sm: 2 },
            fontWeight: "normal",
            mt: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
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
              bottom: '-40px',
              display: 'flex',
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
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "300px",
                      maxHeight: "440px",
                      aspectRatio: "9 / 16",
                      overflow: "hidden",
                      borderRadius: "8px",
                      display: "flex",
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
                        objectFit: "cover",
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
