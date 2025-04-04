import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const MostViewed = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeout = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsQuery = query(
          collection(db, "Inventory"),
          orderBy("views", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(materialsQuery);

        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          src: doc.data().imageUrl,
          views: doc.data().views || 0,
          itemName: doc.data().title,
        }));

        setMaterials(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleClick = (id) => {
    if (!isDragging) {
      navigate(`/item-info/${id}`);
    }
  };

  const handleSlideChange = () => {
    setIsDragging(true);
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }
  };

  const handleSlideAfterChange = () => {
    clickTimeout.current = setTimeout(() => {
      setIsDragging(false);
    }, 200); // 200ms delay before allowing click
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 200, // Reduced speed for smoother transition
    slidesToShow: isMobile ? 1 : 5,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    cssEase: "ease-in-out", // Added easing for smoother transition
    arrows: false,
    centerMode: false,
    beforeChange: handleSlideChange,
    afterChange: handleSlideAfterChange,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 5, variableWidth: false, } },
      { breakpoint: 1600, settings: { slidesToShow: 4, variableWidth: false, } },
      { breakpoint: 1440, settings: { slidesToShow: 4, variableWidth: false, } },
      { breakpoint: 1200, settings: { slidesToShow: 3, variableWidth: false, } },
      { breakpoint: 1024, settings: { slidesToShow: 3, variableWidth: false, } },
      { breakpoint: 992, settings: { slidesToShow: 3, variableWidth: false, } },
      { breakpoint: 768, settings: { slidesToShow: 2, variableWidth: false, } },
      { breakpoint: 600, settings: { slidesToShow: 2, variableWidth: false, } },
      { breakpoint: 480, settings: { slidesToShow: 1, variableWidth: false, } },
      { breakpoint: 375, settings: { slidesToShow: 1, variableWidth: false, } },
      { breakpoint: 320, settings: { slidesToShow: 1, variableWidth: false, } },
    ],
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "20px 0", // Added padding top and bottom
        "@media (max-width: 1600px)": { padding: "25px 0",},
        "@media (max-width: 1440px)": { padding: "30px 0",},
        "@media (max-width: 1200px)": { padding: "35px 0",},
        "@media (max-width: 1024px)": { padding: "40px 0",},
        "@media (max-width: 768px)": { padding: "45px 0",},
        "@media (max-width: 480px)": { padding: "50px 0",},
        "@media (max-width: 375px)": { padding: "55px 0",},
        "@media (max-width: 320px)": { padding: "60px 0",},
        "& .slick-dots": {
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          listStyle: "none",
          padding: 0,
          margin: 0,
        },
        "& .slick-dots li": {
          margin: "0 12px",
        },
        "& .slick-dots li button": {
          padding: 0,
          border: "none",
          background: "transparent",
          width: "32px",
          height: "8px",
          borderRadius: "8px",
        },
        "& .slick-dots li button:before": {
          content: '""',
          display: "block",
          width: "32px",
          height: "8px",
          background: "#fff",
          transition: "all 0.3s ease",
          borderRadius: "8px",
          opacity: 0.6,
        },
        "& .slick-dots li.slick-active button:before": {
          width: "32px",
          height: "8px",
          background: "#1E874A",
          opacity: 1,
          borderRadius: "8px",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />
      {isDragging && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      )}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              position: "relative",
              zIndex: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              "@media (max-width: 600px)": {
                fontSize: "2rem",
              },
            }}
          >
            MOST VIEWED
          </Typography>
        </Box>

        {loading ? (
          <Typography sx={{ color: "white", position: "relative", zIndex: 2 }}>
            Loading...
          </Typography>
        ) : (
          <div style={{ width: "90%", mx: "auto", position: "relative", zIndex: 2 }}>
            <Slider {...settings}>
              {materials.map((material) => (
                <Box
                  key={material.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    boxSizing: "border-box",
                    margin: "0",
                  }}
                >
                  <a
                    onClick={() => handleClick(material.id)}
                    style={{
                      textDecoration: "none",
                      position: "relative",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
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
                      <Typography variant="body2" sx={{ color: "#fff", fontWeight: "bold" }}>
                        {material.views}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        height: isMobile ? "" : "100%",
                        width: "100%",
                        aspectRatio: isMobile ? "9 / 16" : "9 / 16",
                        overflow: "hidden",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      <img
                        id={material.id}
                        src={material.src}
                        alt={material.itemName}
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
          </div>
        )}
      </Box>
    </Box>
  );
};

export default MostViewed;