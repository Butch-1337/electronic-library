import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} style={{ marginBottom: '1rem' }}>
      Back
    </button>
  );
};

export default BackButton;
