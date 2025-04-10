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
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
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
    justifyContent: "center",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  "& .slick-dots li": {
    margin: "0px 16px",
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
    background: theme.palette.grey[400],
    transition: "all 0.3s ease",
    borderRadius: "8px",
    opacity: 0.6,
  },
  "& .slick-dots li.slick-active button:before": {
    background: "#1E874A",
    width: "32px",
    height: "8px",
    opacity: 1,
    borderRadius: "8px",
  },
}));

const FeaturedSection = ({ currentSlide, setCurrentSlide }) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeout = useRef(null);
  const sliderRef = useRef();

  const handleClick = (id) => {
    if (!isDragging) {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      clickTimeout.current = setTimeout(() => {
        navigate(`/item-info/${id}`);
      }, 200);
    }
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
    beforeChange: () => {
      setIsDragging(true);
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    },
    afterChange: (index) => {
      setCurrentSlide(index);
      setTimeout(() => setIsDragging(false), 100);
    },
    onSwipe: () => {
      setIsDragging(true);
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    },
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
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    const featuredQuery = query(
      collection(db, "Inventory"),
      where("isFeatured", "==", true),
      limit(5)
    );

    const unsubscribe = onSnapshot(
      featuredQuery,
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedItems(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching featured items in real-time:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <StyledBox>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            textAlign: "center",
            color: "#1E874A",
            position: "relative",
            zIndex: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            "@media (max-width: 600px)": {
              fontSize: "2rem",
            },
          }}
        >
          Featured Items
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : featuredItems.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
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
                    padding: 0,
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
