import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import logo from "/atilogs.png"; // Ensure this is inside `public/`

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore on unmount
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setError("");
    console.log("Logging in with:", { email, password });
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
          position: "fixed", // Ensure it covers everything
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
      <Box sx={{ position: "absolute", top: 1, left: -100 }}>
        <img src={logo} alt="Logo" style={{ width: 350 }} />
      </Box>

      {/* Login Form */}
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
          LOGIN
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="EMAIL"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <TextField
            label="PASSWORD"
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
            sx={{
              backgroundColor: "green",
              color: "white",
              mb: 2,
              borderRadius: "20px",
            }}
          >
            LOGIN
          </Button>
        </form>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link href="#" color="primary">
            Register Account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
