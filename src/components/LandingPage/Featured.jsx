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
  Dialog,
  DialogContent,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, query, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

// --- Styled Components ---
const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "#faf9f6",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const StyledBannerContainer = styled(Box)({
  width: "100%",
  position: "relative",
  overflow: "hidden",
});

const BannerImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})(({ theme, isMobile }) => ({
  width: "100%",
  height: isMobile ? 200 : 400,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#eaeaea",
}));

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
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
  width: 30,
  height: 30,
  backgroundColor: "white",
  color: "#333",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  ...(direction === "left" && {
    left: theme.spacing(1),
  }),
  ...(direction === "right" && {
    right: theme.spacing(1),
  }),
  [theme.breakpoints.up("sm")]: {
    width: 40,
    height: 40,
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    ...(direction === "left" && {
      left: theme.spacing(2),
    }),
    ...(direction === "right" && {
      right: theme.spacing(2),
    }),
  },
}));

// --- Main Component ---
const FeaturedSection = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeout = useRef(null);
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isFullScreen = isMobile || isLargeScreen;

  const handleImageClick = (url) => {
    if (!isDragging) {
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => {
        setOpenImage(url);
      }, 150);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: !isMobile,
    dots: false,
    beforeChange: () => {
      setIsDragging(true);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    },
    afterChange: () => {
      setTimeout(() => setIsDragging(false), 100);
    },
    onSwipe: () => {
      setIsDragging(true);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    },
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

  useEffect(() => {
    const carouselQuery = query(collection(db, "Carousel"), limit(5));

    const unsubscribe = onSnapshot(
      carouselQuery,
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl, // Remove this for applying video format
          // mediaUrl: doc.data().mediaUrl,               // Use For Video .mp4 format
          // mediaType: doc.data().mediaType || "image"   // Use For Video .mp4 format
        }));
        setFeaturedItems(items);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <StyledBox>
      <Container maxWidth="lg">
        <StyledBannerContainer>
          {featuredItems.length > 1 && !isMobile && (
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
                <Box key={item.id}>
                  <BannerImageContainer isMobile={isMobile}>
                    <BannerImage
                      src={item.imageUrl || "/placeholder.jpg"}
                      alt={`Featured ${item.id}`}
                      onClick={() => handleImageClick(item.imageUrl)}
                      style={{ cursor: "pointer" }}
                    />
                    {/*Change The Banner Image to this for applying video .mp4 format  */}
                    {/* {item.mediaType === "video" ? (
                      <video
                        src={item.mediaUrl}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onClick={() => handleImageClick(item.mediaUrl)}
                      />
                    ) : (
                      <BannerImage
                        src={item.mediaUrl || "/placeholder.jpg"}
                        alt={`Featured ${item.id}`}
                        onClick={() => handleImageClick(item.mediaUrl)}
                        style={{ cursor: "pointer" }}
                      />
                    )} */}
                  </BannerImageContainer>
                </Box>
              ))}
            </StyledSlider>
          ) : (
            <Box py={4} textAlign="center">
              <Typography variant="body1">No featured items found.</Typography>
            </Box>
          )}
          <Dialog
            open={Boolean(openImage)}
            onClose={() => setOpenImage(null)}
            maxWidth={false}
            PaperProps={{
              sx: {
                margin: {
                  xs: "0 auto",
                  sm: "16px auto",
                  md: "32px auto",
                  lg: "48px auto",
                },
                width: {
                  xs: "100%",
                  sm: "95%",
                  md: "90%",
                  lg: "80%",
                  xl: "70%",
                },
                maxWidth: "100%",
                height: "auto",
                maxHeight: "90vh",
                backgroundColor: "#000",
                borderRadius: {
                  xs: 0,
                  sm: 2,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <DialogContent
              sx={{
                p: 0,
                position: "relative",
                overflow: "auto",
                width: "100%",
                backgroundColor: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => setOpenImage(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 26,
                  height: 26,
                  padding: 0,
                  borderRadius: "50%",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                  fontSize: 24,
                  fontWeight: "bold",
                  lineHeight: 1,
                  zIndex: 10,
                }}
              >
                ×
              </IconButton>

              {/* Media Content */}
              {openImage?.endsWith(".mp4") ? (
                <video
                  src={openImage}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  src={openImage}
                  alt="Full View"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* // for viewing video
                // {openImage?.endsWith(".mp4") ? (
                //   <video
                //     src={openImage}
                //     controls
                //     autoPlay
                //     style={{
                //       width: "100%",
                //       height: "auto",
                //       maxHeight: "90vh",
                //       objectFit: "contain",
                //     }}
                //   />
                // ) : (
                //   <img
                //     src={openImage}
                //     alt="Full View"
                //     style={{
                //       width: "100%",
                //       height: "auto",
                //       maxHeight: "90vh",
                //       objectFit: "contain",
                //     }}
                //   />
                // )} */}
        </StyledBannerContainer>
      </Container>
    </StyledBox>
  );
};

export default FeaturedSection;
