import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index, array) => {

        //Do not show id after edit
        if (array[index - 1] === 'Edit') {
          return null;
        }

        const last = index === pathnames.length - 1 || value === 'Edit';
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link component={RouterLink} color="inherit" to={to} key={to}>
            {value}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
