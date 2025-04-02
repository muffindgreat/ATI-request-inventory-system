import MostViewed from "../../components/LandingPage/MostViewed";
import ItemSort from "../../components/ItemSort/SearchFilterBar";
import Library from "../../components/LandingPage/Library";
import Navbar from "../../components/NavBar/Navbar";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function Home() {
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
            sm: "64px", // Default for larger screens
          },
        }}
      >
        <MostViewed />
        <ItemSort />
        <Library />
      </Box>
    </>
  );
}
