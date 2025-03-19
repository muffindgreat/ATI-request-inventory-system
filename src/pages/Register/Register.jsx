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
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import logo from "/atilogs.png";
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore under "test" collection
      await setDoc(doc(db, "test", user.uid), {
        fname: firstName,
        lname: lastName,
        email: user.email,
        createdAt: new Date(),
      });

      console.log("User registered and data saved in Firestore!");
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message);
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
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email Address"
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
              Register
            </Button>
          </form>
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
