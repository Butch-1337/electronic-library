import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element: React.ReactNode, container: Element) => {
    return element;
  }
}));

describe('ConfirmationModal', () => {
  it('renders the modal when isOpen is true', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this item\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <ConfirmationModal
        isOpen={false}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.queryByText(/Confirm Action/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Are you sure you want to delete this item\?/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Yes/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/No/i)).not.toBeInTheDocument();
  });

  it('calls onConfirm when Yes button is clicked', () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationModal
        isOpen={true}
        message="Are you sure you want to delete this item?"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );

    fireEvent.click(screen.getByText(/Yes/i));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when No button is clicked', () => {
    const onCancel = jest.fn();
    render(
      <ConfirmationModal
        isOpen={true}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText(/No/i));
    expect(onCancel).toHaveBeenCalled();
  });
});
