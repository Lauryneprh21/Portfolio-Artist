import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { AuthProvider } from '../AuthContext';

// Mock Axios pour éviter de faire de vraies requêtes API
jest.mock('axios', () => ({
  post: jest.fn(() =>
    Promise.resolve({ data: { token: 'fakeToken' } })
  ),
}));

describe('LoginPage', () => {
  test('affiche le formulaire avec les champs email et mot de passe', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  test('affiche un message d’erreur en cas de connexion échouée', async () => {
    const axios = require('axios');
    axios.post.mockRejectedValue({ response: { data: { message: 'Email ou mot de passe invalide' } } });

    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    const errorMessage = await screen.findByText(/email ou mot de passe invalide/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
