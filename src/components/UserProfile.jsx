import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserProfile = () => {
  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          backgroundColor: "#2E7D32",
          display: "flex",
          alignItems: "center",
          color: "white",
          py: 2,
          px: 3,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <IconButton sx={{ color: "white", mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Profile Information
        </Typography>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          padding: 4,
          alignItems: "center",
        }}
      >
        {/* Profile Picture and Actions Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Change Profile Picture
          </Button>
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Change Password
          </Button>
        </Box>

        {/* User Details Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}
          />
          <TextField
            label="Section"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
      </CardContent>

      {/* Edit Profile Button */}
      <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2E7D32",
            color: "white",
            borderRadius: 1,
            textTransform: "none",
          }}
        >
          Edit Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserProfile;
