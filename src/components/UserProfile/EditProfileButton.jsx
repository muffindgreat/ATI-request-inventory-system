import React from "react";
import { Button, CardActions } from "@mui/material";

const EditProfileButton = ({ isEditing, toggleEditing }) => {
  return (
    <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2E7D32",
          color: "white",
          borderRadius: 1,
          textTransform: "none",
        }}
        onClick={toggleEditing}
      >
        {isEditing ? "Save Profile" : "Edit Profile"}
      </Button>
    </CardActions>
  );
};

export default EditProfileButton;
