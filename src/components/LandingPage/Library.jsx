import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import ImageCard from "../Items/ImageCard";

const Library = ({ selectedCategory, searchTerm, sortOrder, db }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Inventory"));
        const imageList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            src: data.imageUrl || "",
            views: data.views || 0,
            category:
              Array.isArray(data.bannerProgram) && data.bannerProgram.length > 0
                ? data.bannerProgram[0]
                : "Unknown",

            itemName: data.title || "",
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
  }, [db]);

  if (loading) {
    return (
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // ✅ Apply filtering
  let filteredImages = images.filter((img) => {
    const categoryMatch =
      selectedCategory === null || img.category === selectedCategory;
    const searchMatch =
      searchTerm === "" ||
      img.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // ✅ Apply Sorting (A-Z or Z-A)
  filteredImages.sort(
    (a, b) =>
      sortOrder === "asc"
        ? a.itemName.localeCompare(b.itemName) // Sort A-Z
        : b.itemName.localeCompare(a.itemName) // Sort Z-A
  );

  return (
    <Container sx={{ pt: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {filteredImages.map((img) => (
          <Grid item key={img.id} xs={10} sm={6} md={4} lg={3} xl={2.4}>
            <ImageCard
              id={img.id}
              src={img.src || "https://via.placeholder.com/150"}
              alt={img.itemName}
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
