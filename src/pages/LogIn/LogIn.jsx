import { Container, TextField, Button, Box, Typography, Link, Card } from "@mui/material";
import { useState, useEffect } from "react";
import logo from "/atilogs.png"; // Ensure this is inside `public/`
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

export default function LogIn() {
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
      position: "relative",
      overflow: "hidden",
    }}
  >
      <BackgroundImage imageUrl={bgImage} />

      {/* Logo at Top Left */}
      <Box sx={{ position: "absolute", top: 1, left: -100 }}>
        <img src={logo} alt="Logo" style={{ width: 350 }} />
      </Box>

      {/* Login Form Container */}
      <Container
        maxWidth="xs"
        sx={{
            display: "flex",
            justifyContent: "center",
            mt: 20, 
            mb: 10
        }}
        >
        <Card elevation={3}
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 4,
            textAlign: "center",
            marginX: "auto",
            width: "100%",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="green" mb={2}>
            LOG IN
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "green", color: "white", mb: 2 }}
            >
              LOG IN
            </Button>
          </form>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="#" color="primary">
              Register Account
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
