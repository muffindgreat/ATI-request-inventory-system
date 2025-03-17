import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Card,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "/atilogs.png";
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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

      <Box
        sx={{
          position: "absolute",
          top: 1,
          left: { xs: "50%", md: "-100px" },
          transform: { xs: "translateX(-50%)", md: "none" },
        }}
      >
        <img src={logo} alt="Logo" style={{ width: 350 }} />
      </Box>

      <Container
        maxWidth="xs"
        sx={{ display: "flex", justifyContent: "center", mt: 20, mb: 10 }}
      >
        <Card
          elevation={3}
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
            Log In
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
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <Link href="/register" color="primary">
              Register here
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
