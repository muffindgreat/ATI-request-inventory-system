import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box, styled } from '@mui/material';
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center content horizontally
  width: '100%', // Ensure Box takes full width
}));

const FeaturedSection = ({ data }) => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredItems = data.filter((item) => item.isFeatured);
      setFeaturedItems(filteredItems);
    }
  }, [data]);

  return (
    <StyledBox>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center"> {/* Center the title */}
          Featured Items
        </Typography>
        <Grid container spacing={3} justifyContent="center"> {/* Center the grid */}
          {featuredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.title}
                />
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
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default FeaturedSection;