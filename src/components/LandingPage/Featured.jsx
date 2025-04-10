import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  ButtonBase,
  styled,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledBox = styled(Box)(({ theme }) => ({
  background: "#faf9f6",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  "& .slick-dots": {
        position: "absolute",
        display: "flex",
        justifyContent: "center", // Center the dots
        listStyle: "none",
        padding: 0,
        margin: 0,
      },
      "& .slick-dots li": {
        margin: "0px 16px", // Adjust horizontal spacing
      },
      "& .slick-dots li button": {
        padding: 0,
        border: "none",
        background: "transparent",
        width: "32px", // Smaller dot width
        height: "8px", // Smaller dot height
        borderRadius: "8px", // Make them circles
      },
      "& .slick-dots li button:before": {
        content: '""',
        display: "block",
        width: "32px",
        height: "8px",
        background: theme.palette.grey[400], // Light grey color
        transition: "all 0.3s ease",
        borderRadius: "8px",
        opacity: 0.6,
      },
      "& .slick-dots li.slick-active button:before": {
        background: "#1E874A", // Primary color for active dot
        width: "32px", // Slightly larger active dot
        height: "8px",
        opacity: 1,
        borderRadius: "8px",
      },
}));

const FeaturedSection = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeout = useRef(null);

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
    }, 200);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    variableWidth: false,
    swipeToSlide: true,
    beforeChange: handleSlideChange,
    afterChange: handleSlideAfterChange,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 5 } },
      { breakpoint: 1600, settings: { slidesToShow: 4 } },
      { breakpoint: 1440, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 375, settings: { slidesToShow: 1 } },
      { breakpoint: 320, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const featuredQuery = query(
          collection(db, "Inventory"),
          where("isFeatured", "==", true),
          limit(5)
        );
        const querySnapshot = await getDocs(featuredQuery);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedItems(items);
      } catch (error) {
        console.error("Error fetching featured items:", error);
        // Optionally set an error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  return (
    <StyledBox sx={{
      "& .slick-dots": {
        position: "absolute",
        display: "flex",
        justifyContent: "center", // Center the dots
        listStyle: "none",
        padding: 0,
        margin: 0,
      },
      "& .slick-dots li": {
        margin: "0px 16px", // Adjust horizontal spacing
      },
      "& .slick-dots li button": {
        padding: 0,
        border: "none",
        background: "transparent",
        width: "32px", // Smaller dot width
        height: "8px", // Smaller dot height
        borderRadius: "8px", // Make them circles
      },
      "& .slick-dots li button:before": {
        content: '""',
        display: "block",
        width: "32px",
        height: "8px",
        background: theme.palette.grey[400], // Light grey color
        transition: "all 0.3s ease",
        borderRadius: "8px",
        opacity: 0.6,
      },
      "& .slick-dots li.slick-active button:before": {
        background: "#1E874A", // Primary color for active dot
        width: "32px", // Slightly larger active dot
        height: "8px",
        opacity: 1,
        borderRadius: "8px",
      },
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" sx={{ textAlign: "center",
              fontWeight: "bold",
              position: "relative",
              zIndex: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              "@media (max-width: 600px)": {
                fontSize: "2rem",
              },
              
            }}>
          Featured Items
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : featuredItems.length > 0 ? (
          <Slider {...settings}>
            {featuredItems.map((item) => (
              <Box key={item.id} sx={{ px: 1 }}>
                <Card
                  elevation={3}
                  sx={{
                    margin: "12px",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.03)" },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <ButtonBase
                    onClick={() => handleClick(item.id)}
                    sx={{
                      display: "block",
                      width: "100%",
                      flexGrow: 1,
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "9 / 16",
                        overflow: "hidden",
                        borderRadius: "8px 8px 0 0",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.imageUrl || "/placeholder.jpg"}
                        alt={item.title || "Featured item"}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                  </ButtonBase>
                </Card>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography variant="body1" align="center">
            No featured items found.
          </Typography>
        )}
      </Container>
    </StyledBox>
  );
};

export default FeaturedSection;
