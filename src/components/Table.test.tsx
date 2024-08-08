import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom/extend-expect';

describe('Table', () => {
  const columns = [
    { id: 'id', label: 'ID', render: (row: any) => row.id },
    { id: 'name', label: 'Name', render: (row: any) => row.name },
  ];

  const data = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  it('renders table headers based on columns prop', () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.queryByText(/Actions/i)).not.toBeInTheDocument();
  });

  it('renders table rows based on data prop', () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it('displays no records message when data is empty', () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText(/No records to display/i)).toBeInTheDocument();
  });

  it('renders actions column if actions prop is provided', () => {
    const actions = () => <button>Action button</button>;

    render(<Table columns={columns} data={data} actions={actions} />);

    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Action button/i)).toHaveLength(2);
  });
});
