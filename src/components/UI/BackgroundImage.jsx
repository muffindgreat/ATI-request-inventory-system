import { Box } from "@mui/material";

const BackgroundImage = ({ imageUrl }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundImage;
