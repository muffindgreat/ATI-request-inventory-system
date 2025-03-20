import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const fieldLabels = {
  fname: "First Name",
  lname: "Last Name",
  email: "Email",
  designation: "Designation",
  section: "Section",
  phoneNumber: "Phone Number",
};

// Define the correct field order
const fieldOrder = [
  "fname",
  "lname",
  "email",
  "designation",
  "section",
  "phoneNumber",
];

const ProfileForm = ({ userData, isEditing, handleInputChange }) => {
  // Function to allow only numeric input for the phone number field
  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      handleInputChange({ target: { name, value } });
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
        width: "100%",
      }}
    >
      {fieldOrder
        .filter((key) => userData[key] !== undefined) // Ensure only existing fields are shown
        .map((key) => (
          <Box key={key} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
              {fieldLabels[key]}
            </Typography>
            <TextField
              name={key}
              value={userData[key]}
              onChange={
                key === "phoneNumber"
                  ? handlePhoneNumberChange
                  : handleInputChange
              }
              variant="outlined"
              size="small"
              fullWidth
              disabled={!isEditing || key === "email"} // Email is always disabled
            />
          </Box>
        ))}
    </Box>
  );
};

export default ProfileForm;
