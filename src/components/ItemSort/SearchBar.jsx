import { TextField, InputAdornment, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TextField
      variant="outlined"
      placeholder="Search by..."
      size="small"
      value={value}
      onChange={onChange}
      fullWidth={isMobile} // Make full width on mobile
      sx={{
        bgcolor: "white",
        borderRadius: "15px",
        maxWidth: isMobile ? "100%" : "800px", // Wider search bar on desktop
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "15px",
          height: isMobile ? "40px" : "45px", // Slightly smaller on mobile
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
