import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import ImageCard from "../Items/ImageCard";

const Library = ({ selectedCategory, searchTerm, db }) => { // Receive db as prop
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory")); // Use db from props
        const imageList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            src: data.icon || "",
            views: data.views || 0,
            category: data.category || "Unknown",
            itemName: data.itemName || "",
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
  }, [db]); // add db to the dependency array.

  if (loading) {
    return (
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  const filteredImages = images.filter((img) => {
    const categoryMatch = selectedCategory === null || img.category === selectedCategory;
    const searchMatch = searchTerm === "" || img.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

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
    </Container>
  );
};

export default Library;