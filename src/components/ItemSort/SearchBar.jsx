import { TextField, InputAdornment, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TextField
      variant="outlined"
      placeholder="Search item..."
      size="small"
      value={value}
      onChange={onChange}
      fullWidth={isMobile}
      sx={{
        bgcolor: "white",
        borderRadius: "15px",
        maxWidth: isMobile ? "100%" : "100%",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: isMobile ? "40px" : "45px",
          borderRadius: "15px",
          "& fieldset": {
            border: "none", // ✅ Removes the outline border
          },
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
