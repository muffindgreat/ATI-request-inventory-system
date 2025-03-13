import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const ProfileDetails = ({ userData, handleInputChange, isEditing }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
        width: "100%",
      }}
    >
      {["First Name", "Last Name"].map((label, index) => {
        const fieldNames = ["firstName", "lastName"];
        return (
          <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
              {label}
            </Typography>
            <TextField
              name={fieldNames[index]}
              value={userData[fieldNames[index]]}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        );
      })}
      {["Email Address", "Designation"].map((label, index) => {
        const fieldNames = ["email", "designation"];
        return (
          <Box
            key={index + 2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gridColumn: { xs: "span 1", md: "span 2" },
            }}
          >
            <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
              {label}
            </Typography>
            <TextField
              name={fieldNames[index]}
              value={userData[fieldNames[index]]}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        );
      })}
      {["Section", "Phone Number"].map((label, index) => {
        const fieldNames = ["section", "phoneNumber"];
        return (
          <Box
            key={index + 4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
              {label}
            </Typography>
            <TextField
              name={fieldNames[index]}
              value={userData[fieldNames[index]]}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ProfileDetails;
