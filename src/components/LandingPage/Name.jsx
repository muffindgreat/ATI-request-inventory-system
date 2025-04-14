import React from "react";
import { Typography, Box, styled } from "@mui/material";

// Background wrapper
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url('/pic.jpg')`,
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
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
    zIndex: 1,
  },
  padding: theme.spacing(2, 2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: theme.spacing(1),
  textAlign: "center",
}));

const AtisLogo = styled("img")(({ theme }) => ({
  height: 100,
  position: "relative",
  zIndex: 2,
  marginBottom: theme.spacing(0),
  [theme.breakpoints.down("sm")]: {
    height: 50,
  },
}));

const TitleTextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  position: "relative",
  zIndex: 2,
});

const StyledTitle = styled(Typography)({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 400,
  color: "white",
  lineHeight: 1.2,
  fontSize: "clamp(1.2rem, 4vw, 2rem)",
});

const StyledTitle1 = styled(Typography)({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 600,
  color: "white",
  lineHeight: 1.2,
  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
});

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Lato', sans-serif",
  color: "white",
  marginTop: theme.spacing(0),
  position: "relative",
  zIndex: 2,
  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
  lineHeight: 1.2, // Adjust the line height here to reduce spacing between lines
}));

const Title = () => {
  return (
    <StyledBox>
      <AtisLogo src="/atis.png" alt="ATI Logo" />
      <TitleTextContainer>
        <StyledTitle variant="h2">Agricultural Training Institute</StyledTitle>
        <StyledTitle variant="h2">CALABARZON</StyledTitle>
        <StyledTitle1 variant="h2">e-Library</StyledTitle1>
      </TitleTextContainer>
      <StyledSubtitle variant="subtitle1">
        Your online portal to agricultural knowledge and learning materials.
      </StyledSubtitle>
    </StyledBox>
  );
};

export default Title;
