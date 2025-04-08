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

  const handleClick = (id) => {
    navigate(`/item-info/${id}`);
  };

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const featuredQuery = query(
          collection(db, "Inventory"),
          where("isFeatured", "==", true),
          limit(3) // You can adjust the number of featured items to display
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
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  elevation={3}
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <ButtonBase
                    onClick={() => handleClick(item.id)}
                    sx={{ display: "block", width: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.imageUrl || "/placeholder.jpg"}
                      alt={item.title || "Featured item"}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                  </ButtonBase>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    {/* You can display other relevant information here */}
                  </CardContent>
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