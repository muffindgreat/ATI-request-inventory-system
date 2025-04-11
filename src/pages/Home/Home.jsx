import MostViewed from "../../components/LandingPage/MostViewed";
import ItemSort from "../../components/ItemSort/SearchFilterBar";
import Library from "../../components/LandingPage/Library";
import Navbar from "../../components/NavBar/Navbar";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FeaturedSection from "../../components/LandingPage/Featured";
import Title from "../../components/LandingPage/Name";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      html, body, #root {
        margin: 0;
        padding: 0;
        height: 100vh; 
        width: 100vw;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: {
            xs: "56px", // Adjust for smaller screens (e.g., mobile)
            sm: "94px", // Default for larger screens
          },
          // paddingTop: { // Add paddingTop to create space below Navbar
          //   xs: "56px",
          //   sm: "64px",
          // },
        }}
      >
        <Title />
        <FeaturedSection
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}        
        />
        <MostViewed 
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}        
        />
        <ItemSort />
        <Library />
      </Box>
    </>
  );
}
