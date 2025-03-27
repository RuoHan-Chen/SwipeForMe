import { render, screen } from '@testing-library/react';
import Home from '../pages/home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  test('renders hero section with main heading', () => {
    renderHome();
    expect(screen.getByText('Make Every Meal Count')).toBeInTheDocument();
  });

  test('renders hero section description', () => {
    renderHome();
    expect(screen.getByText(/Swipe4Me is a peer-to-peer platform/i)).toBeInTheDocument();
  });

  test('renders "Why Choose" section', () => {
    renderHome();
    expect(screen.getByText('Why Choose Swipe4Me?')).toBeInTheDocument();
  });

  test('renders all three feature boxes', () => {
    renderHome();
    expect(screen.getByText('Easy to Use')).toBeInTheDocument();
    expect(screen.getByText('Rate & Review for Trust')).toBeInTheDocument();
    expect(screen.getByText('Feel Our Design')).toBeInTheDocument();
  });

  test('renders join movement section', () => {
    renderHome();
    expect(screen.getByText('Join the Movement!')).toBeInTheDocument();
  });

  test('renders Instagram button with correct link', () => {
    renderHome();
    const instagramLink = screen.getByRole('link', { 
      name: /Follow Us On Instagram!/i 
    });
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/swipe4me');
  });

  test('renders create account button with correct link', () => {
    renderHome();
    const createAccountButton = screen.getByRole('link', { 
      name: /Create an Account/i 
    });
    expect(createAccountButton).toHaveAttribute('href', '/login');
  });

  test('renders all learn more buttons', () => {
    renderHome();
    const learnMoreButtons = screen.getAllByText('Learn More');
    expect(learnMoreButtons).toHaveLength(3);
    learnMoreButtons.forEach(button => {
      expect(button).toHaveClass('btn', 'btn-primary');
    });
  });

  test('renders feature descriptions', () => {
    renderHome();
    expect(screen.getByText(/Post your unused swipes/i)).toBeInTheDocument();
    expect(screen.getByText(/Our mutual rating system/i)).toBeInTheDocument();
    expect(screen.getByText(/Samples will show you/i)).toBeInTheDocument();
  });

  test('renders hero background elements', () => {
    const { container } = renderHome();
    expect(container.querySelector('.eclipse')).toBeInTheDocument();
    expect(container.querySelector('.nebula')).toBeInTheDocument();
    expect(container.querySelector('.texture')).toBeInTheDocument();
  });

  test('renders important UI elements', () => {
    render(<Home />);
    
    // Test critical content
    expect(screen.getByText('Make Every Meal Count')).toBeInTheDocument();
    expect(screen.getByText(/Swipe4Me is a peer-to-peer platform/)).toBeInTheDocument();
    
    // Test important interactive elements
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    // ... other specific assertions
  });
}); 