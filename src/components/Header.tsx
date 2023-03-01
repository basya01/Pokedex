import { Box, Typography } from '@mui/material';
import React from 'react';

export const Header = () => {
  return (
    <Box component="header" py={3}>
      <Typography sx={{ cursor: 'default', textAlign: 'center' }} variant="h3" component="h1">
        Pokedex
      </Typography>
    </Box>
  );
};
