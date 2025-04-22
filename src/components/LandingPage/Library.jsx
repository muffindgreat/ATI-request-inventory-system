import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress, Button } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import ImageCard from "../Items/ImageCard";

const Library = ({
  selectedCategory,
  searchTerm,
  sortOrder,
  db,
  onImagesReceived,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 initially

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Inventory"));
        const imageList = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            if (data.isDisplay === false) return null;
            if (!data.title || !data.imageUrl || !data.bannerProgram) {
              return null;
            }
            return {
              id: doc.id,
              src: data.imageUrl,
              views: data.views || 0,
              categories:
                Array.isArray(data.bannerProgram) &&
                data.bannerProgram.length > 0
                  ? data.bannerProgram
                  : ["Unknown"],
              itemName: data.title,
            };
          })
          .filter(Boolean);

        setImages(imageList);

        if (onImagesReceived) {
          onImagesReceived(imageList); // ✅ This line is the fix
        }
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
      selectedCategory === null || img.categories.includes(selectedCategory);
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

  // ✅ Limit the visible images to `visibleCount`
  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <Container sx={{ pt: 3, textAlign: "center" }}>
      <Grid container spacing={2} justifyContent="center">
        {visibleImages.map((img) => (
          <Grid item key={img.id} xs={4} sm={6} md={4} lg={3} xl={2.4}>
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

      {/* Show More Button */}
      {visibleCount < filteredImages.length && (
        <Button
          onClick={() => setVisibleCount((prev) => prev + 8)}
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#9ACD32", // Yellow-green color
            "&:hover": { bgcolor: "#7DAF28" }, // Darker yellow-green on hover
          }}
        >
          Show More
        </Button>
      )}
    </Container>
  );
};

export default Library;
