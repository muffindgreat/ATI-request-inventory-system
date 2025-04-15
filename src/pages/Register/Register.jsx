import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Link,
  Card,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "/atilogs.png";
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

// ...imports stay the same

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setError("");
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "User", user.uid), {
        firstName,
        lastName,
        email: user.email,
        createdAt: new Date(),
      });
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please use another one.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      minHeight="100vh"
    >
      <Helmet>
        <title>ATI CALABARZON e-Library</title>
      </Helmet>
      <BackgroundImage imageUrl={bgImage} />

      <Box
        sx={{
          position: "absolute",
          top: 1,
          left: { xs: "50%", md: "-100px" },
          transform: { xs: "translateX(-50%)", md: "none" },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "100%",
            maxWidth: 350,
          }}
        />
      </Box>

      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          elevation={3}
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="green" mb={2}>
            Register
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!fieldErrors.firstName}
              helperText={fieldErrors.firstName}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!fieldErrors.lastName}
              helperText={fieldErrors.lastName}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" color="primary">
              Log in here
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
