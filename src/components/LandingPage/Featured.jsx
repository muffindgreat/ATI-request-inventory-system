// Top imports remain the same
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { collection, query, limit, onSnapshot } from "firebase/firestore";

// --- Styled Components ---
const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "#faf9f6",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledBannerContainer = styled(Box)({
  width: "100%",
  position: "relative",
  overflow: "hidden",
});

const BannerImageContainer = styled(Box)({
  width: "100%",
  height: 450, //Sizing of the image inside the container
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // make image fill container
});

const StyledSlider = styled(Slider)`
  & .slick-list {
    overflow: hidden;
  }
  & .slick-track {
    display: flex !important;
  }
  & .slick-slide > div {
    height: 100%;
  }
  & .slick-dots {
    display: none !important;
  }
`;

const ArrowButton = styled(IconButton)(({ theme, direction }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: 40,
  height: 40,
  backgroundColor: "white",
  color: "#333",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  ...(direction === "left" && {
    left: theme.spacing(2),
  }),
  ...(direction === "right" && {
    right: theme.spacing(2),
  }),
}));

// --- Main Component ---
const FeaturedSection = ({ currentSlide, setCurrentSlide }) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    const carouselQuery = query(collection(db, "Carousel"), limit(5));

    const unsubscribe = onSnapshot(
      carouselQuery,
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
        }));
        setFeaturedItems(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching carousel images:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <StyledBox>
      <Container maxWidth="lg">
        <StyledBannerContainer>
          {featuredItems.length > 1 && (
            <>
              <ArrowButton direction="left" onClick={goToPrev}>
                <ArrowBackIosNew fontSize="small" />
              </ArrowButton>
              <ArrowButton direction="right" onClick={goToNext}>
                <ArrowForwardIos fontSize="small" />
              </ArrowButton>
            </>
          )}
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : featuredItems.length > 0 ? (
            <StyledSlider ref={sliderRef} {...settings}>
              {featuredItems.map((item) => (
                <Box
                  key={item.id}
                >
                  <BannerImageContainer>
                    <BannerImage
                      src={item.imageUrl || "/placeholder.jpg"}
                      alt={`Featured ${item.id}`}
                    />
                  </BannerImageContainer>
                </Box>
              ))}
            </StyledSlider>
          ) : (
            <Box py={4} textAlign="center">
              <Typography variant="body1">No featured items found.</Typography>
            </Box>
          )}
        </StyledBannerContainer>
      </Container>
    </StyledBox>
  );
};

export default FeaturedSection;
