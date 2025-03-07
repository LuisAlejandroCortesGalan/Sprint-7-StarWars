// src/--tests--/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../authContext/AuthContext';

// Direct mocks
jest.mock('../App.css', () => ({}));
jest.mock('../assets/img/star-wars-logo.jpg', () => 'mocked-image-path');
jest.mock('../assets/img/facebook.png', () => 'mocked-image-path');
jest.mock('../assets/img/instagram.png', () => 'mocked-image-path');

// Mock de useAuth y useNavigate
jest.mock('../authContext/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock de useNavigate
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  });

  // Prueba 1: Renderiza "Loading..." mientras loading es true
  it('muestra "Loading..." cuando loading es true', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Prueba 2: Renderiza LOG IN cuando no hay usuario autenticado
  it('muestra "LOG IN" cuando el usuario no está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('LOG IN')).toBeInTheDocument();
    expect(screen.queryByText('LOG OUT')).not.toBeInTheDocument();
    expect(screen.queryByText(/Bienvenido/i)).not.toBeInTheDocument();
  });

  // Prueba 3: Renderiza "Bienvenido" y "LOG OUT" cuando hay usuario autenticado
  it('muestra "Bienvenido" y "LOG OUT" cuando el usuario está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido test@example.com')).toBeInTheDocument();
    expect(screen.getByText('LOG OUT')).toBeInTheDocument();
    expect(screen.queryByText('LOG IN')).not.toBeInTheDocument();
  });

  // Prueba 4: Llama a logout y navega a /LogIn al hacer clic en LOG OUT
  it('llama a logout y navega a /LogIn al hacer clic en LOG OUT', async () => {
    mockLogout.mockResolvedValue(undefined); // Simula una promesa resuelta
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('LOG OUT'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    await Promise.resolve(); // Espera a que la promesa de logout se resuelva
    expect(mockNavigate).toHaveBeenCalledWith('/LogIn');
  });

  // Prueba 5: Maneja errores en logout sin romper la UI
  it('maneja errores en logout y no navega si falla', async () => {
    mockLogout.mockRejectedValue(new Error('Logout falló')); // Simula un error
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false,
      logout: mockLogout,
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('LOG OUT'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    await Promise.resolve(); // Espera a que la promesa rechazada se maneje
    expect(mockNavigate).not.toHaveBeenCalled(); // No navega si hay error
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cerrar sesión:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  // Prueba 6: Renderiza los enlaces de redes sociales correctamente
  it('renderiza los enlaces de redes sociales con los atributos correctos', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const facebookLink = screen.getByAltText('Facebook').closest('a');
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/starwars.es');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    const twitterLink = screen.getByAltText('Twitter').closest('a');
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/starwars');
  });

  test('el logo de Star Wars enlaza a la raíz ("/")', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo de Star Wars');
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/'); 
  });
});