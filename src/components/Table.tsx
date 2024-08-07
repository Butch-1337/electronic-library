import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  render: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.id}>{column.label}</TableCell>
          ))}
          {actions && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
              <Typography variant="body1" align="center">
                No records to display
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          data.map(row => (
            <TableRow key={row.id}>
              {columns.map(column => (
                <TableCell key={column.id}>{column.render(row)}</TableCell>
              ))}
              {actions && <TableCell>{actions(row)}</TableCell>}
            </TableRow>
          ))
        )}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
