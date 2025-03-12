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
        borderRadius: "20px",
        maxWidth: isMobile ? "100%" : "250px", // Adjust width for desktop
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          height: "40px",
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
