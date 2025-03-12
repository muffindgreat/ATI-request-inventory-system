import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfileHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2E7D32",
        display: "flex",
        alignItems: "center",
        color: "white",
        py: 2,
        px: 3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <IconButton sx={{ color: "white", mr: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" fontWeight="bold">
        Profile Information
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
