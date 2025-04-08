import React, { useState, useEffect } from "react";
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

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const FeaturedSection = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (id) => {
    navigate(`/item-info/${id}`);
  };

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const featuredQuery = query(
          collection(db, "Inventory"),
          where("isFeatured", "==", true)
          // You can add orderBy and limit here if needed for featured items
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
    <StyledBox>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Featured Items
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : featuredItems.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {featuredItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={isMobile ? 12 : 6}
                md={isTablet ? 6 : 4}
                lg={3} // Adjust for larger screens
                key={item.id}
              >
                <Card
                  elevation={3}
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.03)" },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%", // Make cards take up equal height in the row
                  }}
                >
                  <ButtonBase
                    onClick={() => handleClick(item.id)}
                    sx={{ display: "block", width: "100%", flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "9 / 16", // Same aspect ratio as MostViewed
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
              </Grid>
            ))}
          </Grid>
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