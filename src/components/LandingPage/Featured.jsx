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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

const FeaturedSection = ({ data }) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/item-info/${id}`);
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredItems = data.filter((item) => item.isFeatured);
      setFeaturedItems(filteredItems);
      setIsLoading(false);
    } else {
      setIsLoading(false); // avoid indefinite loading if data is not an array
    }
  }, [data]);

  return (
    <StyledBox>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Featured Items
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {isLoading ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Loading featured items...
              </Typography>
            </Grid>
          ) : (
            <>
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {featuredItems.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    No featured items found.
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default FeaturedSection;
