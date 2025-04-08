import React from "react";
import { Typography, Box, styled } from "@mui/material";

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
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 0, // no gap between koob and title
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const KoobLogo = styled("img")(({ theme }) => ({
  height: 200,
  position: "relative",
  zIndex: 2,
  margin: 0,
  gap: 0,
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
}));

const AtisLogo = styled("img")(({ theme }) => ({
  height: 60,
  position: "relative",
  zIndex: 2,
  margin: 0,
  padding: 0,
  display: "block",
  [theme.breakpoints.down("sm")]: {
    height: 40,
  },
}));

const TitleTextContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: 0,
  padding: 0,
}));

const TitleRow = styled(Box)({
  display: "flex",
  alignItems: "center", // try "baseline" if text is slightly off
  gap: 0,
  margin: 0,
  padding: 0,
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  color: "white",
  lineHeight: 1,
  margin: 0,
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

const StyledTitle1 = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  color: "white",
  lineHeight: 1,
  margin: 0,
  padding: 0,
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
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

const Title = () => {
  return (
    <StyledBox>
      <KoobLogo src="/koob.png" alt="Koob Logo" />
      <TitleTextContainer>
        <TitleRow>
          <AtisLogo src="/atis.png" alt="ATI Logo" />
          <StyledTitle variant="h2">ATI-CALABARZON</StyledTitle>
        </TitleRow>
        <StyledTitle1 variant="h2">E-Library</StyledTitle1>
        <StyledSubtitle variant="subtitle1">
          Your online portal to agricultural knowledge and learning materials.
        </StyledSubtitle>
      </TitleTextContainer>
    </StyledBox>
  );
};

export default Title;
