import { Tabs, Tab } from "@mui/material";

export default function RequestTabs({ tabIndex, handleChange }) {
  const tabCount = 4;
  const tabWidth = `${100 / tabCount}%`; // 25% if 4 tabs

  return (
    <Tabs
      value={tabIndex}
      onChange={handleChange}
      textColor="inherit"
      indicatorColor="primary"
      variant="scrollable"
      allowScrollButtonsMobile
      scrollButtons={false}
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        ".MuiTabs-indicator": { backgroundColor: "#1A854B" },
        ".MuiTab-root": {
          backgroundColor: "white",
          color: "#1A854B",
          textTransform: "none",
          fontSize: "1rem",
          width: tabWidth,
          flexShrink: 0,
        },
        ".Mui-selected": {
          backgroundColor: "#78B99E",
          color: "#1A854B",
        },
      }}
    >
      <Tab label="All" />
      <Tab label="Pending" />
      <Tab label="Processed" />
      <Tab label="Completed" />
    </Tabs>
  );
}
