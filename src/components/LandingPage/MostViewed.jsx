import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";

const MostViewed = () => {
  const images = [
    { src: "/ngulay.jpg", views: 10027, link: "#" },
    { src: "/isda.jpg", views: 14136, link: "#" },
    { src: "/broiler.jpg", views: 10027, link: "#" },
    { src: "/organic.jpg", views: 14136, link: "#" },
    { src: "/vege.jpg", views: 14136, link: "#" },
  ];

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
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#000",
            textAlign: "center",
            mb: 2,
            fontWeight: "normal",
            mt: 5,
          }}
        >
          MOST VIEWED
        </Typography>
        <Box sx={{ width: "90%", mx: "auto", position: "relative" }}>
          <Slider {...settings}>
            {images.map((item, index) => (
              <Box key={index} sx={{ padding: "0 10px" }}>
                <a
                  href={item.link}
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
                      {item.views}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 450, // Fixed height
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "none",
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.src}
                      alt={`Publication ${index + 1}`}
                      style={{
                        width: 250, // Fixed width
                        height: 450, // Fixed height
                        objectFit: "cover",
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
