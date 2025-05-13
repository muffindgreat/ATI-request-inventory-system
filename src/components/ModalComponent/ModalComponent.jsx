import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalComponent = ({ open, handleClose, title, content, actions }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="h-screen max-h-full">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            width: { xs: "80%", sm: "70%", md: "50%" },
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            {content}
          </Box>
          <Box>{actions}</Box>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalComponent;
