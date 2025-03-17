import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

function NavbarProfile() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <>
      <Tooltip title="User Profile">
        <IconButton onClick={handleOpenUserMenu}>
          <AccountCircleIcon sx={{ color: "black", fontSize: "28px" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #2e7d32",
          }}
        >
          <AccountCircleIcon
            sx={{ fontSize: "40px", marginRight: "10px", color: "#2e7d32" }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#2e7d32", fontWeight: "bold" }}
            >
              Name
            </Typography>
            <Typography variant="body2" sx={{ color: "#2e7d32" }}>
              Role
            </Typography>
          </Box>
        </Box>
        <MenuItem
          onClick={() => {
            navigate("/user-profile");
            handleCloseUserMenu();
          }}
          sx={{ color: "#2e7d32" }} // Make text green
        >
          <PersonIcon sx={{ color: "#2e7d32", marginRight: "10px" }} /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-requests");
            handleCloseUserMenu();
          }}
          sx={{ color: "#2e7d32" }} // Make text green
        >
          <AssignmentIcon sx={{ color: "#2e7d32", marginRight: "10px" }} /> My
          Requests
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Sign Out");
            handleCloseUserMenu();
          }}
          sx={{ color: "#2e7d32" }} // Make text green
        >
          <ExitToAppIcon sx={{ color: "#2e7d32", marginRight: "10px" }} /> Sign
          Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavbarProfile;
