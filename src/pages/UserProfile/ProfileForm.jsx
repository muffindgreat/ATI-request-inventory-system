import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, FormHelperText } from "@mui/material";
import { use } from "react";

const fieldLabels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  designation: "Designation",
  section: "Section/Office",
  phoneNumber: "Phone Number",
};

// Define the correct field order
const fieldOrder = [
  "firstName",
  "lastName",
  "email",
  "designation",
  "section",
  "phoneNumber",
];

const ProfileForm = ({ userData, isEditing, handleInputChange }) => {
  const [phoneError, setPhoneError] = useState("");

  // Ensure userData has default values for all fields
  const defaultUserData = {
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    section: "",
    phoneNumber: "",
  };

  const finalUserData = { ...defaultUserData, ...userData };

  // Function to allow only numeric input for the phone number field
  // ✅ Allow only up to 11 digits and validate
  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;

    // Only keep digits, max 11
    const numericValue = value.replace(/\D/g, "").slice(0, 11);

    // Validation
    let error = "";
    if (numericValue.length > 0 && numericValue.length < 11) {
      error = "Phone number must be exactly 11 digits.";
    }

    setPhoneError(error);
    handleInputChange({ target: { name, value: numericValue } });
  };

  // ✅ Clear error when not editing
  useEffect(() => {
    if (!isEditing) {
      setPhoneError("");
    }
  }, [isEditing]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
        width: "100%",
      }}
    >
      {fieldOrder.map((key) => (
        <Box key={key} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" fontWeight="medium" sx={{ mb: 0.5 }}>
            {fieldLabels[key]}
          </Typography>
          <TextField
            name={key}
            value={finalUserData[key]}
            onChange={
              key === "phoneNumber"
                ? handlePhoneNumberChange
                : handleInputChange
            }
            variant="outlined"
            size="small"
            fullWidth
            disabled={!isEditing || key === "email"}
            error={
              (key === "phoneNumber" && Boolean(phoneError)) ||
              (isEditing && !finalUserData[key])
            }
            autoComplete="off"
            required
          />
          {key === "phoneNumber" && (
            <FormHelperText sx={{ color: "red", minHeight: "20px", mt: 0.5 }}>
              {isEditing
                ? phoneError ||
                  (!finalUserData[key] ? "This field is required." : " ")
                : " "}
            </FormHelperText>
          )}

          {key !== "phoneNumber" && isEditing && !finalUserData[key] && (
            <FormHelperText sx={{ color: "red", minHeight: "20px", mt: 0.5 }}>
              This field is required.
            </FormHelperText>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProfileForm;
