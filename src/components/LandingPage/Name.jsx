import React from "react";
import { Typography, Box, styled } from "@mui/material";

// Background wrapper
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url('/books.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  padding: theme.spacing(10, 2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: theme.spacing(2),
  textAlign: "center",
}));

// Logos
const KoobLogo = styled("img")(({ theme }) => ({
  height: 100,
  position: "relative",
  zIndex: 2,
  margin: 0, // removed extra spacing
  padding: 0, // just in case
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
}));

const AtisLogo = styled("img")(({ theme }) => ({
  height: 50,
  position: "relative",
  zIndex: 2,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    height: 40,
  },
}));

// Title container
const TitleTextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "white",
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  color: "white",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

const StyledTitle1 = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  color: "white",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  color: "white",
  marginTop: theme.spacing(0),
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

// Main Component
const Title = () => {
  return (
    <StyledBox>
      {/* Top logo row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 0, // no space between KoobLogo and title
          position: "relative",
          zIndex: 2,
        }}
      >
        <KoobLogo src="/koob.png" alt="Koob Logo" />
        <TitleTextContainer>
          <TitleRow>
            <AtisLogo src="/atis.png" alt="ATI Logo" />
            <StyledTitle variant="h2">ATI-CALABARZON</StyledTitle>
          </TitleRow>
          <StyledTitle1 variant="h2">E-Library</StyledTitle1>
        </TitleTextContainer>
      </Box>

      {/* Subtitle below */}
      <StyledSubtitle variant="subtitle1">
        Your online portal to agricultural knowledge and learning materials.
      </StyledSubtitle>
    </StyledBox>
  );
};

export default Title;
