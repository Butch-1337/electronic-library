import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Electronic Library
      </Typography>

      <Typography variant="body1" gutterBottom>
        Discover a world of books and authors. Explore our collection, find your next read,
        and learn more about your favorite writers.
      </Typography>

      <Box marginTop={'16px'}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/Books"
          sx={{marginRight: '16px'}}
        >
          View Books
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/Authors"
        >
          View Authors
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
