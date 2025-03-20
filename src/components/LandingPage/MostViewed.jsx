import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../NavBar/Navbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const MostViewed = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "materials"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials: ", error);
      }
    };
    fetchMaterials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    arrows: false,
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
          maxWidth: "100%",
          minHeight: "90vh",
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          "& .slick-dots": {
            position: "absolute",
            bottom: "-30px",
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            padding: 0,
            margin: 0,
          },
          "& .slick-dots li": {
            margin: "0 5px",
          },
          "& .slick-dots li button": {
            padding: 0,
            border: "none",
            background: "transparent",
            width: "16px",
            height: "6px",
            borderRadius: "8px",
          },
          "& .slick-dots li button:before": {
            content: '""',
            display: "block",
            width: "16px",
            height: "6px",
            background: "#fff",
            transition: "all 0.3s ease",
            borderRadius: "8px",
            opacity: 0.6,
          },
          "& .slick-dots li.slick-active button:before": {
            width: "24px",
            height: "6px",
            background: "#1E874A",
            opacity: 1,
            borderRadius: "8px",
          },
        }}
      >
        {/* Overlay for dark effect */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />

        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            position: "relative",
            zIndex: 2,
            mb: 2,
          }}
        >
          MOST VIEWED
        </Typography>

        <Box sx={{ width: "90%", mx: "auto", position: "relative", zIndex: 2 }}>
          <Slider {...settings}>
            {materials.map((material) => (
              <Box
                key={material.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    position: "relative",
                    display: "block",
                    maxWidth: "250px",
                    width: "100%",
                  }}
                >
                  {/* Views Box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                      {material.views || 0}
                    </Typography>
                  </Box>

                  {/* Image */}
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "250px",
                      aspectRatio: "9 / 16",
                      overflow: "hidden",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={material.imageUrl || "/placeholder.jpg"}
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
