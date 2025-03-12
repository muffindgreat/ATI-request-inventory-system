import { Tabs, Tab } from "@mui/material";

export default function RequestTabs({ tabIndex, handleChange }) {
  return (
    <Tabs
      value={tabIndex}
      onChange={handleChange}
      textColor="inherit"
      indicatorColor="primary"
      variant="fullWidth"
      sx={{
        ".MuiTabs-indicator": { backgroundColor: "#1A854B" },
        ".MuiTab-root": { backgroundColor: "white", color: "#1A854B", textTransform: "none", fontSize: "1rem" },
        ".Mui-selected": { backgroundColor: "#78B99E", color: "#1A854B" }
      }}
    >
      <Tab label="All" />
      <Tab label="Pending" />
      <Tab label="Completed" />
    </Tabs>
  );
}
