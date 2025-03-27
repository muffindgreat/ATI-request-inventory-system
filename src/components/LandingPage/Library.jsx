import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; // ✅ Import Firestore instance
import ImageCard from "../Items/ImageCard";

const Library = ({ selectedCategory, searchTerm }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const inventoryRef = collection(db, "inventory"); // ✅ Using db directly
        const querySnapshot = await getDocs(inventoryRef);

        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          src: doc.data().icon || "",
          views: doc.data().views || 0,
          category: doc.data().category || "Unknown",
          itemName: doc.data().itemName || "Untitled",
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

  if (loading) {
    return (
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {images.length > 0 ? (
          images.map((img) => (
            <Grid item key={img.id} xs={10} sm={6} md={4} lg={3} xl={2.4}>
              <ImageCard
                id={img.id}
                src={img.src}
                alt={img.itemName}
                views={img.views}
                category={img.category}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: "center", color: "gray" }}>
            No matching results found.
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Library;
