import React from "react";
import { CardActions, Button } from "@mui/material";

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "designation",
  "section",
  "phoneNumber",
];

const ProfileActions = ({
  isEditing,
  handleSave,
  handleCancel,
  setIsEditing,
  userData,
}) => {
  const hasEmptyField =
    requiredFields.some((key) => !userData || !userData[key]) ||
    !/^\d{11}$/.test(userData?.phoneNumber || "");

  return (
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
            disabled={hasEmptyField}
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
};

export default ProfileActions;
