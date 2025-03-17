import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";

const MostViewed = () => {
  const images = [
    { src: "https://img.pikbest.com/origin/06/28/72/12zpIkbEsTVjv.jpg!w700wp", views: 10027, link: "#" },
    { src: "https://files.magzter.com/resize/magazine/1403149542/1570239156/view/3.jpg", views: 14136, link: "#" },
    { src: "https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/433884370_791061999576137_5594001860413791526_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=iqz9ph-sYJkQ7kNvgGAZZN0&_nc_oc=AdieVZmEdryZpPClZPbFOo5zlcb8hIPgqDshSTB7ggI-vuX7mdhWuYL3xaMgwmizpCs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&oh=03_Q7cD1wEabxRpfcn0UM8AtFJ--48BDolPoKFimPULadrc19gMVg&oe=67FF3C79", views: 10027, link: "#" },
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
            {images.map((item, index) => (
              <Box key={index} sx={{ flex: "0 0 auto" }}>
                <a
                  href={item.link}
                  style={{
                    textDecoration: "none",
                    position: "relative",
                    display: "block",
                  }}
                >
                  {/* view count */}
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
                      maxWidth: "250px", // Set uniform width
                      maxHeight: "400px", // Set uniform height
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
                      src={item.src}
                      alt={`Publication ${index + 1}`}
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
