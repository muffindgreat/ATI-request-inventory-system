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
import { userData } from "../UI/sample_data";

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
        disableScrollLock={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            minWidth: "250px", // ✅ Mas malapad para hindi dikit-dikit
          },
        }}
      >
        {/* Profile Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px", // ✅ Mas consistent ang padding
            borderBottom: "1px solid #2e7d32",
          }}
        >
          <AccountCircleIcon
            sx={{ fontSize: "40px", marginRight: "10px", color: "#1A854B" }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: "#1A854B",
              fontWeight: "bold",
              maxWidth: "120px", // ✅ Limitahan ang width
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis", // ✅ Maglagay ng "..."
            }}
          >
            {userData.name}
          </Typography>
        </Box>

        {/* Menu Items */}
        <MenuItem
          onClick={() => {
            navigate("/user-profile");
            handleCloseUserMenu();
          }}
          sx={{
            color: "#1A854B",
            paddingY: "10px", // ✅ More spacing
            paddingX: "16px",
          }}
        >
          <PersonIcon sx={{ color: "#1A854B", marginRight: "12px" }} /> Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/my-requests");
            handleCloseUserMenu();
          }}
          sx={{
            color: "#1A854B",
            paddingY: "10px",
            paddingX: "16px",
          }}
        >
          <AssignmentIcon sx={{ color: "#1A854B", marginRight: "12px" }} /> My
          Requests
        </MenuItem>

        <MenuItem
          onClick={() => {
            console.log("Sign Out");
            handleCloseUserMenu();
          }}
          sx={{
            color: "#1A854B",
            paddingY: "10px",
            paddingX: "16px",
          }}
        >
          <ExitToAppIcon sx={{ color: "#2e7d32", marginRight: "12px" }} /> Sign
          Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavbarProfile;
