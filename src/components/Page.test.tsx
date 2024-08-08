import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './Page';
import '@testing-library/jest-dom/extend-expect';

// Mock the Breadcrumbs component to simplify testing
jest.mock('./Breadcrumbs', () => () => <div>Breadcrumbs</div>);

describe('Page', () => {
  it('renders the title correctly', () => {
    render(<Page title="Test Page Title">Content</Page>);

    expect(screen.getByText(/Test Page Title/i)).toBeInTheDocument();
  });

  it('renders the Breadcrumbs component', () => {
    render(<Page title="Test Page Title">Content</Page>);

    expect(screen.getByText(/Breadcrumbs/i)).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Page title="Test Page Title"><div>Child Content</div></Page>);

    expect(screen.getByText(/Child Content/i)).toBeInTheDocument();
  });
});
