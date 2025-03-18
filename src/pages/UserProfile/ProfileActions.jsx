import React from "react";
import { CardActions, Button } from "@mui/material";

const ProfileActions = ({
  isEditing,
  handleSave,
  handleCancel,
  setIsEditing,
}) => (
  <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
    {isEditing ? (
      <>
        <Button
          variant="outlined"
          sx={{ borderRadius: 1, textTransform: "none" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2E7D32",
            color: "white",
            borderRadius: 1,
            textTransform: "none",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </>
    ) : (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2E7D32",
          color: "white",
          borderRadius: 1,
          textTransform: "none",
        }}
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </Button>
    )}
  </CardActions>
);

export default ProfileActions;
