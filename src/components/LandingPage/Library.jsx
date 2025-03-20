import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; // Ensure correct Firebase config import

// ImageCard Component
const ImageCard = ({ src, alt }) => {
  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "9 / 16",
        boxShadow: 2,
        borderRadius: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        image={src || "https://via.placeholder.com/150"} // Default placeholder
        alt={alt || "Image"}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Card>
  );
};

// ImageLibrary Component (Fetches images from Firestore)
const ImageLibrary = ({ selectedCategory }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from Firestore on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          src: doc.data().url, // Cloudinary URL
          category: doc.data().category,
        }));
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filter images based on category selection
  const filteredImages =
    selectedCategory === null
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <Container sx={{ pt: 3 }}>
      {loading ? (
        <CircularProgress /> // Show loading spinner
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredImages.map((img) => (
            <Grid item key={img.id} xs={10} sm={6} md={4} lg={3} xl={2.4}>
              <ImageCard src={img.src} alt={img.category} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ImageLibrary;
