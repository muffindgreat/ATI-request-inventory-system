import {
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ value, onChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClear = () => {
    onChange({ target: { value: "" } });
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search Title..."
      size="small"
      value={value}
      onChange={onChange}
      autoComplete="off"
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
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
