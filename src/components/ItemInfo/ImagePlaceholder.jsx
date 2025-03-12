import { Box } from "@mui/material";

const ImagePlaceholder = ({ isSmallScreen, imageSrc }) => {
  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "30%",
        height: isSmallScreen ? 240 : 360,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        aspectRatio: "3/4",
        overflow: "hidden",
        bgcolor: "grey.300",
      }}
    >
      <img
        src={imageSrc || "/ngulay.jpg"}
        alt="Item"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain", // Ensures full image is visible without cropping
        }}
      />
    </Box>
  );
};

export default ImagePlaceholder;
