import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomSnackbar from '../../components/CustomSnackbar';

describe('CustomSnackbar Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders success message', () => {
    render(
      <CustomSnackbar
        open={true}
        onClose={mockOnClose}
        message="Success message"
        severity="success"
      />
    );
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(
      <CustomSnackbar
        open={true}
        onClose={mockOnClose}
        message="Error message"
        severity="error"
      />
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('renders warning message', () => {
    render(
      <CustomSnackbar
        open={true}
        onClose={mockOnClose}
        message="Warning message"
        severity="warning"
      />
    );
    
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  test('renders info message', () => {
    render(
      <CustomSnackbar
        open={true}
        onClose={mockOnClose}
        message="Info message"
        severity="info"
      />
    );
    
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  test('renders loading state with progress indicator', () => {
    render(
      <CustomSnackbar
        open={true}
        onClose={mockOnClose}
        message="Loading message"
        severity="loading"
      />
    );
    
    expect(screen.getByText('Loading message')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
}); 
