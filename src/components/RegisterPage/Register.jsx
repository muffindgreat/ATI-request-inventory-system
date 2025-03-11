import { useState, useEffect } from "react";
import logo from "../Logo/atilogs.png";
import {
  ImageListItem,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Link,
} from "@mui/material";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll on unmount
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }
    setError("");
    console.log("Registering with:", { firstName, lastName, email, password });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full screen height
        width: "100vw", // Full screen width
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-Screen Background Image with Blur */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('/image.png')`, // Ensure this image is inside `public/`
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1, // Send it behind everything
        }}
      />

      {/* Logo at Top Left */}
      <Box sx={{ position: "absolute", top: -10, left: -100 }}>
        <img src={logo} alt="Logo" style={{ width: 350 }} />
      </Box>

      {/* Registration Form */}
      <Box
        p={4}
        boxShadow={3}
        borderRadius={4}
        bgcolor="white"
        width={350}
        textAlign="center"
        sx={{
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="green" mb={2}>
          REGISTER
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "green", color: "white", mb: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="/login" color="primary">
            Login Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
