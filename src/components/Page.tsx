import React from 'react';
import { Container, Typography } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <Container>
      <Breadcrumbs />
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default Page;
