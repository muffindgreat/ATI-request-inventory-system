import { useState } from "react";
import styles from "./Register.css";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
  Link,
} from "@mui/material";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }
    setError("");
    console.log("Registering with:", { firstName, lastName, email, password });
    // Add authentication logic here
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box p={4} boxShadow={3} borderRadius={2} bgcolor="white" width="100%">
          <Typography variant="h5" align="center" gutterBottom>
            REGISTER
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Register
            </Button>
          </form>
        <Typography variant="body2" sx={{ mt: 2}}>
          Already have an account? <Link href="/login" color="primary"> Login Here </Link>
        </Typography>
        </Box>
      </Box>
    </Container>
  );
}
