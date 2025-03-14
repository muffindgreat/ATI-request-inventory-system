import { CardHeader, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomCardHeader = ({ title, showBackButton = false, sx = {} }) => {
  return (
    <CardHeader
      title={
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          {showBackButton && (
            <IconButton sx={{ mr: 1 }}>
              <ArrowBackIcon />
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
