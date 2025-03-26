import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ id, src, alt, views, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item-info/${id}`, {
      state: { id, src, alt, views, category },
    });
  };

  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "9 / 16",
        boxShadow: 2,
        borderRadius: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        image={src || "https://via.placeholder.com/150"}
        alt={alt}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Card>
  );
};

export default ImageCard;
