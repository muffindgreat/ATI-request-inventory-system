import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1E874A', // Darker green for better contrast
        color: 'white',
        textAlign: 'center',
        padding: '12px 0', // Reduced vertical padding
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          © {new Date().getFullYear()} IEC Material Request System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;