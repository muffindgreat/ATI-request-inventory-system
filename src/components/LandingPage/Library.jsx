import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; // Adjusted path
import MostViewed from "./MostViewed"; // Assuming this is a related component
import ImageCard from "../Items/ImageCard"; // Adjusted to where it fits

const Library = ({ selectedCategory }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const imageList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            src: data.icon || "",
            views: data.views || 0,
            category: data.category || "Unknown",
          };
        });

        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (images.length === 0) {
    return (
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <p>No images found.</p>
      </Container>
    );
  }

  const filteredImages =
    selectedCategory === null
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <Container sx={{ pt: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {filteredImages.map((img) => (
          <Grid item key={img.id} xs={10} sm={6} md={4} lg={3} xl={2.4}>
            <ImageCard
              id={img.id}
              src={img.src}
              alt={img.category}
              views={img.views}
              category={img.category}
            />
          </Grid>
        ))}
      </Grid>
      {/* <MostViewed images={images} /> */}
    </Container>
  );
};

export default Library;
