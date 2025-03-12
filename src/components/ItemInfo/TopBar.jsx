import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TopBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "green" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Item Info</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
