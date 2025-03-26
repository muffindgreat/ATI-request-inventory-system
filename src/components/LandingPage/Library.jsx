import React, { useEffect, useState } from "react";
import { Card, CardMedia, Grid, Container, CircularProgress } from "@mui/material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; 
import { useNavigate } from "react-router-dom"; // Import for navigation

const ImageCard = ({ id, src, alt }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const imageRef = doc(db, "images", id);
      await updateDoc(imageRef, { views: views + 1 }); // Increment views in Firestore
      navigate(`/image/${id}`); // Redirect to a detail page
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "9 / 16",
        boxShadow: 2,
        borderRadius: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6, cursor: "pointer" },
      }}
      onClick={handleClick}
    >
      <CardMedia component="img" image={src} alt={alt} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </Card>
  );
};

// ImageLibrary Component (Fetches images from Firestore)
const ImageLibrary = ({ selectedCategory }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          src: doc.data().url,
          views: doc.data().views || 0, 
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

  const filteredImages = selectedCategory === null ? images : images.filter((img) => img.category === selectedCategory);

  return (
    <Container sx={{ pt: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredImages.map((img) => (
            <Grid item key={img.id} xs={10} sm={6} md={4} lg={3} xl={2.4}>
              <ImageCard id={img.id} src={img.src} alt={img.category} views={img.views} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ImageLibrary;
