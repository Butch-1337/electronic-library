import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

const CancelButton: React.FC = () => {
  const history = useHistory();

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => history.goBack()}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
