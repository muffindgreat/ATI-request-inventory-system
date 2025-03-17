import React from "react";
import { Card, CardMedia, Grid, Container } from "@mui/material";

// ImageCard Component
const ImageCard = ({ src, alt }) => {
  return (
    <Card sx={{ width: "100%", aspectRatio: "9 / 16", boxShadow: 2, borderRadius: 2 }}>
      <CardMedia
        component="img"
        image={src || "https://via.placeholder.com/150"}
        alt={alt || "Image"}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }} // Ensures full coverage
      />
    </Card>
  );
};

// ImageLibrary Component
const ImageLibrary = ({ selectedCategory }) => {
  const images = [
    { src: "/ngulay.jpg", category: "Rice" },
    { src: "/isda.jpg", category: "Corn" },
    { src: "/broiler.jpg", category: "Coconut" },
    { src: "/organic.jpg", category: "Rice" },
    { src: "/vege.jpg", category: "Corn" },
    { src: "/vege.jpg", category: "Corn" },
    { src: "/organic.jpg", category: "Rice" },
    { src: "/broiler.jpg", category: "Coconut" },
    { src: "/isda.jpg", category: "Corn" },
    { src: "/ngulay.jpg", category: "Rice" },
  ];

  // Filter images based on selected category
  const filteredImages = selectedCategory
    ? images.filter((img) => img.category === selectedCategory)
    : images;

  return (
    <Container sx={{ pt: 4, pb: 4}}>
      <Grid container spacing={2} justifyContent="center">
        {filteredImages.map((img, index) => (
          <Grid item key={index} xs={10} sm={6} md={4} lg={3} xl={2.4}>
            <ImageCard src={img.src} alt={img.category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ImageLibrary;
