import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ArrowBackIcon />}
      onClick={() => history.goBack()}
      style={{ marginBottom: '1rem' }}
    >
      Back
    </Button>
  );
};

export default BackButton;
