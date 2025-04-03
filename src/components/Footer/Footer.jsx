import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1E874A',
        color: 'white',
        textAlign: 'center',
        padding: '16px', // Equivalent to p-4 in Tailwind (16px = 1rem)
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} IEC Material Request System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;