import { useState } from "react";
import { IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterButton = ({ onFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleFilter = (order) => {
    onFilter(order);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: "white",
          borderRadius: "50%",
          width: isMobile ? "35px" : "40px",
          height: isMobile ? "35px" : "40px",
          ml: isMobile ? 0 : 1, // Adjust margin for spacing
          // "&:hover": {
          //   bgcolor: "#00b300", // Change background color on hover
          // },
        }}
      >
        <FilterListIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleFilter("asc")}>A - Z</MenuItem>
        <MenuItem onClick={() => handleFilter("desc")}>Z - A</MenuItem>
      </Menu>
    </>
  );
};

export default FilterButton;
