import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../../context/AuthContext';

describe('Navbar', function () {
  let warnSpy;

  beforeEach(function () {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(function () {});
  });

  afterEach(function () {
    warnSpy.mockRestore();
  });

  it('shows guest navigation before login', function () {
    sessionStorage.clear();

    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('GiftLink Sparkle')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
  });
});