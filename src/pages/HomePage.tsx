import React from 'react';
import { Link } from 'react-router-dom';
import {Typography} from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to the Electronic Library
      </Typography>

      <div>
        <Link to="/Books">View Books</Link>
      </div>
      <div>
        <Link to="/Authors">View Authors</Link>
      </div>
    </div>
  );
};

export default HomePage;
