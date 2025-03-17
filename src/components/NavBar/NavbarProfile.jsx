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
            backgroundColor: "#2e7d32",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid white",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Name
            </Typography>
            <Typography variant="body2">Role</Typography>
          </Box>
        </Box>
        <MenuItem
          onClick={() => {
            navigate("/user-profile");
            handleCloseUserMenu();
          }}
        >
          <PersonIcon sx={{ color: "white", marginRight: "10px" }} /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-requests");
            handleCloseUserMenu();
          }}
        >
          <AssignmentIcon sx={{ color: "white", marginRight: "10px" }} /> My
          Requests
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Sign Out");
            handleCloseUserMenu();
          }}
        >
          <ExitToAppIcon sx={{ color: "white", marginRight: "10px" }} /> Sign
          Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavbarProfile;
