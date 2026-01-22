import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

function ImageComparison({ selectedYear }) {
  // Mock image data - replace with actual images later
  const mockImage = 'https://via.placeholder.com/400x300?text=Satellite+Image+' + selectedYear;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            {selectedYear}
          </Typography>
          <Box
            component="img"
            src={mockImage}
            alt={`Satellite image from ${selectedYear}`}
            sx={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Dense urban area with mixed vegetation
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            {selectedYear - 5} (5 years earlier)
          </Typography>
          <Box
            component="img"
            src={'https://via.placeholder.com/400x300?text=Satellite+Image+' + (selectedYear - 5)}
            alt={`Satellite image from ${selectedYear - 5}`}
            sx={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Less urban development, more vegetation cover
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ImageComparison;
