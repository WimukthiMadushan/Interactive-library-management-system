import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginPage from "./LoginPage";
import { useAuth } from "../../Hooks/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// Mock the useAuth hook
vi.mock("../../Hooks/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock axios
vi.mock("axios");

describe("LoginPage", () => {
    const mockLogin = vi.fn();
    beforeEach(() => {
        useAuth.mockReturnValue({
            login: mockLogin,
        });
    });

    it("renders the login page", () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByTestId("login-page")).toBeInTheDocument();
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
        expect(screen.getByTestId("username-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("login-button")).toBeInTheDocument();
    });

    it("shows error modal on failed login", async () => {
        // Mock axios to simulate a failed login request
        axios.post.mockRejectedValueOnce(new Error("Login failed"));

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Fill in form and submit
        fireEvent.change(screen.getByTestId("username-input"), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByTestId("login-button"));

        // Wait for the error modal to appear
        await waitFor(() => {
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
            expect(screen.getByText("Login Failed")).toBeInTheDocument();
        });
    });

    it("calls login on successful login", async () => {
        // Mock axios to simulate a successful login request
        axios.post.mockResolvedValueOnce({
            data: { token: "fake-jwt-token" },
        });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Fill in form and submit
        fireEvent.change(screen.getByTestId("username-input"), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByTestId("login-button"));

        // Wait for login to be called
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("fake-jwt-token");
        });
    });
});
