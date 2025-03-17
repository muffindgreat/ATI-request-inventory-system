import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const ProfileForm = ({ userData, isEditing, handleInputChange }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      gap: 2,
      width: "100%",
    }}
  >
    {Object.entries(userData).map(([key, value]) => (
      <Box key={key} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <TextField
          name={key}
          value={value}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={!isEditing}
        />
      </Box>
    ))}
  </Box>
);

export default ProfileForm;
