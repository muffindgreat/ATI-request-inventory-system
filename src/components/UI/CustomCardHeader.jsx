import { CardHeader, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // Import for navigation

const CustomCardHeader = ({ title, showBackButton = false, sx = {} }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <CardHeader
      title={
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", color: "white" }}
        >
          {showBackButton && (
            <IconButton sx={{ mr: 1, color: "white" }} onClick={handleBack}>
              <ArrowBackIcon sx={{ color: "white" }} />{" "}
              {/* Ensures the icon is white */}
            </IconButton>
          )}
          {title}
        </Typography>
      }
      sx={{
        backgroundColor: "#1A854B",
        color: "white",
        textAlign: "center",
        ...sx,
      }}
    />
  );
};

export default CustomCardHeader;
