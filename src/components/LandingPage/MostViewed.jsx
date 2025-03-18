import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";
import { allMaterials } from "../UI/sample_data"; // Import materials data
import VisibilityIcon from "@mui/icons-material/Visibility";

const MostViewed = () => {
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    centerMode: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots", // Ensures dots are properly applied
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
          maxWidth: "100%",
          minHeight: "90vh",
          backgroundImage: "url('/image.png')", // Change to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />

        {/* Title */}
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
            position: "relative",
            zIndex: 2,
          }}
        >
          MOST VIEWED
        </Typography>

        {/* Carousel Section */}
        <Box
          sx={{
            width: "90%",
            mx: "auto",
            position: "relative",
            zIndex: 2,
            "& .slick-track": {
              display: "flex",
              gap: { xs: "4px", sm: "8px", md: "12px" },
            },
            "& .slick-slide": {
              display: "flex",
              justifyContent: "center",
            },
            "& .slick-list": {
              overflow: "hidden",
            },

            /* ✅ Fixed Pagination Dots Styling */
            "& .slick-dots": {
              position: "absolute",
              bottom: "-35px", // Ensures visibility
              display: "flex",
              justifyContent: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
            },
            "& .slick-dots li": {
              margin: "0 6px",
            },
            "& .slick-dots li button": {
              padding: 0,
              border: "none",
              background: "#fff",
              width: "20px", // Default dot size
              height: "6px",
            },
            "& .slick-dots li button:before": {
              content: '""',
              display: "block",
              width: "20px", // Default dot size
              height: "6px",
              background: "#fff", // Default inactive color
              transition: "all 0.3s ease",
            },
            "& .slick-dots li.slick-active button:before": {
              width: "20px", // Larger active dot
              height: "6px",
              background: "#1E874A", // Active color (adjust as needed)
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
                  {/* View Counter */}
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
                      gap: "4px",
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: "16px", color: "white" }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {material.views}
                    </Typography>
                  </Box>

                  {/* Image */}
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "300px",
                      maxHeight: "450px",
                      position: "relative",
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
