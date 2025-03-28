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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/atilogs.png";
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);
      navigate("/home"); // Redirect to home after successful login
    } catch (err) {
      console.error("Firebase Error:", err);
      if (typeof err.code === "string") {
        switch (err.code) {
          case "auth/invalid-credential":
            setError("Incorrect email or password.");
            break;
          case "auth/user-not-found":
            setError("No account found with this email.");
            break;
          case "auth/too-many-requests":
            setError("Too many failed login attempts. Try again later.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Check your internet connection.");
            break;
          default:
            setError(`Login failed: ${err.message}`);
        }
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "green", color: "white", mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "LOG IN"
              )}
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
