import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import Register from "../components/Register"; // Ajusta la ruta

// Mock de Firebase
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, _email: string, _password: string) =>
      Promise.resolve({ user: { uid: "123" } })
  ),
}));
jest.mock("../../firebase", () => ({
  auth: {},
}));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders register form correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a password")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("shows error when email and password are empty", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(
        screen.getByText("Please enter both email and password")
      ).toBeInTheDocument();
    });
  });

  it("shows error when email is invalid", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    });
  });

  it("shows error when password is too short", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });
  });

  it("navigates to /starShips on successful registration", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: "123" },
    });
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/starShips");
    });
  });

  it("toggles checkbox and shows terms on click", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const moreLink = screen.getByText("More...");
    // Verifica que los términos no estén visibles inicialmente
    expect(
      screen.queryByText("How we use your personal data and your rights:")
    ).not.toBeInTheDocument();
    // Simula el clic en "More..."
    fireEvent.click(moreLink);
    // Verifica que los términos sean visibles
    expect(
      screen.getByText("How we use your personal data and your rights:")
    ).toBeInTheDocument();
  });
});