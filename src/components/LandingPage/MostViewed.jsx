import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "@fontsource/lato/400.css"; // Import Lato Regular font

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  overflow: "hidden",
  backgroundImage: "url('/image.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
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

const MostViewed = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchMaterials = async () => {
      try {
        const materialsQuery = query(
          collection(db, "Inventory"),
          orderBy("views", "desc")
        );
        const querySnapshot = await getDocs(materialsQuery);

        const imageList = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            if (data.isDisplay === false) return null;
            return {
              id: doc.id,
              src: data.imageUrl,
              views: data.views || 0,
              itemName: data.title,
            };
          })
          .filter((item) => item !== null)
          .slice(0, 5);

        setMaterials(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
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
            color: "#fff",
            position: "relative",
            zIndex: 2,
            fontFamily: "Lato, sans-serif",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            "@media (max-width: 600px)": {
              fontSize: "2rem",
            },
          }}
        >
          Most Viewed
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : materials.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {materials.map((material) => (
              <Box key={material.id} sx={{ px: 1 }}>
                <Card
                  elevation={3}
                  sx={{
                    margin: "12px",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.03)" },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <ButtonBase
                    onClick={() => handleClick(material.id)}
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
                        image={material.src}
                        alt={material.itemName}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />

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
                          zIndex: 2,
                        }}
                      >
                        <VisibilityIcon
                          sx={{ fontSize: "16px", color: "white" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          {material.views}
                        </Typography>
                      </Box>
                    </Box>
                  </ButtonBase>
                </Card>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "#fff", fontFamily: "Lato, sans-serif" }}
          >
            No most viewed items found.
          </Typography>
        )}

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
      </Container>
    </StyledBox>
  );
};

export default MostViewed;
