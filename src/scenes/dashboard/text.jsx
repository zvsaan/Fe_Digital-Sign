import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AppText() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
      <Box sx={{ maxWidth: '480px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Perbanyak Dokumen Anda!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Ingin mendapatkan manfaat penuh dari layanan kami? Tingkatkan ke paket premium sekarang dan nikmati fitur-fitur eksklusif yang tidak tersedia dalam paket.
        </Typography>
        <Button variant="contained" color="primary">
          Premium
        </Button>
      </Box>
    </Box>
  );
}