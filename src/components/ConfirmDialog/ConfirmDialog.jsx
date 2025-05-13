import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./ConfirmDialog.css";

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers className="confirm-dialog-content">
        <div className="py-4 px-2">{message}</div>
      </DialogContent>
      <DialogActions className="gap-2 mr-2 my-2">
        <Button
          onClick={onCancel}
          variant="outlined"
          color="error"
          disabled={loading}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          autoFocus
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
