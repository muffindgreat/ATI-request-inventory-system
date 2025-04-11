import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back arrow icon
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export default function ForgotPasswordModal({
  open,
  onClose,
  email,
  setEmail,
}) {
  const [step, setStep] = useState(1);

  const handleNext = async () => {
    if (step === 1) {
      if (!email) {
        alert("Please enter your email.");
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email);
        alert(`Password reset email sent to ${email}. Check your inbox.`);
        handleClose();
      } catch (error) {
        console.error("Error sending password reset email:", error);
        alert("Failed to send reset email. Please try again.");
      }
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    onClose();
  };

  const handleBack = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs" // makes it responsive on small screens
    >
      <Box
        sx={{
          px: { xs: 2, sm: 4 }, // padding x: responsive for small and up
          py: { xs: 3, sm: 4 }, // padding y
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: { xs: 18, sm: 22 } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{
              position: "absolute",
              left: 20,
              top: 10,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          Reset Password
        </DialogTitle>
        <DialogContent>
          {step === 1 && (
            <>
              <Typography
                mb={2}
                sx={{ textAlign: "center", fontSize: { xs: 14, sm: 16 } }}
              >
                Enter your email address:
              </Typography>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              bgcolor: "#2E7D32",
              color: "white",
              textTransform: "none",
              px: 2,
              py: 1,
              fontSize: { xs: 12, sm: 14 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Send Email
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
