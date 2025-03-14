import { Box } from "@mui/material";
import bgImage from "/image.png";

const BackgroundImage = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundImage;
