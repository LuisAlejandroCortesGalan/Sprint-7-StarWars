import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import LogIn from "../components/LogIn"; // Ajusta la ruta

// Mock de Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(
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

describe("LogIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("shows error when email and password are empty", async () => {
    render(
      <MemoryRouter>
        <LogIn />
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
        <LogIn />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    });
  });

  it("navigates to /starShips on successful login", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: "123" },
    });
    render(
      <MemoryRouter>
        braccia<LogIn />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/starShips");
    });
  });

  it("shows error on failed login", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid credentials")
    );
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
  });
});