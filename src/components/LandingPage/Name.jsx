import React from 'react';
import { Typography, Box, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme, imageUrl }) => ({
  backgroundImage: `url('/books.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  padding: theme.spacing(8, 0),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  position: 'relative',
  zIndex: 2,
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
  position: 'relative',
  zIndex: 2,
  color: 'white',
  marginTop: theme.spacing(2), // Add some spacing between title and subtitle
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
}));

const Title = ({ imageUrl }) => {
  return (
    <StyledBox imageUrl={imageUrl}>
      <StyledTitle variant="h2">ATI-CALABARZON E-Library</StyledTitle>
      <StyledSubtitle variant="subtitle1">
      Your online portal to agricultural knowledge and learning materials.
      </StyledSubtitle>
    </StyledBox>
  );
};

export default Title;