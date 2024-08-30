import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../src/Pages/LoginPage";
import { AuthProvider } from "../src/Hooks/AuthContext";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("LoginPage", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test("renders login page and inputs", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();

    // Check if the input fields are rendered
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("handles input changes", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Check if the input values are updated
    expect(screen.getByPlaceholderText("Username").value).toBe("testuser");
    expect(screen.getByPlaceholderText("Password").value).toBe("password123");
  });

  test("handles successful login", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "mockToken" } });

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Check if the axios call was made with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/login",
      {
        Username: "testuser",
        Password: "password123",
      }
    );

    // The user would be redirected, but we can't test that easily here.
    // Instead, check if the login function was called (you can mock useAuth)
  });

  test("handles login error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Login failed"));

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Check if the error modal is displayed
    expect(screen.getByText("Login Failed")).toBeInTheDocument();
  });
});
