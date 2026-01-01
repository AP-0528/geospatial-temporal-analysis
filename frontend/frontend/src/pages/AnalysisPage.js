import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapComponent from '../components/MapComponent';
import TimelineSlider from '../components/TimelineSlider';
import ImageComparison from '../components/ImageComparison';

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { latitude, longitude } = location.state || { latitude: '28.6139', longitude: '77.2090' };

  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [years] = useState([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box mb={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            Back to Home
          </Button>
          <Paper sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Temporal Analysis Results
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Location: Latitude {latitude}, Longitude {longitude}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign="right">
                <Chip label="Analysis Complete" color="success" sx={{ mr: 1 }} />
                <Chip label={`${years.length} Years`} />
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {loading ? (
          <Box textAlign="center" py={10}>
            <CircularProgress size={60} />
            <Typography variant="h6" mt={2}>
              Analyzing temporal data...
            </Typography>
          </Box>
        ) : (
          <>
            {/* Map */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Location Map
              </Typography>
              <MapComponent latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} />
            </Paper>

            {/* Timeline */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Timeline: {selectedYear}
              </Typography>
              <TimelineSlider
                years={years}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />
            </Paper>

            {/* Image Comparison */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Temporal Comparison
              </Typography>
              <ImageComparison selectedYear={selectedYear} />
            </Paper>

            {/* Statistics */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2} bgcolor="#e3f2fd" borderRadius={2}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      45%
                    </Typography>
                    <Typography variant="body2">Urban Growth</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2} bgcolor="#e8f5e9" borderRadius={2}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      -23%
                    </Typography>
                    <Typography variant="body2">Forest Cover</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2} bgcolor="#fff3e0" borderRadius={2}>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                      12%
                    </Typography>
                    <Typography variant="body2">Agricultural Land</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2} bgcolor="#fce4ec" borderRadius={2}>
                    <Typography variant="h4" color="error.main" fontWeight="bold">
                      8
                    </Typography>
                    <Typography variant="body2">Major Changes</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}

export default AnalysisPage;