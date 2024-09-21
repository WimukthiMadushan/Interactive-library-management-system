import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

// Mock useAuth hook
vi.mock("./../../Hooks/AuthContext.jsx", () => ({
  useAuth: vi.fn(),
}));

// Partially mock react-router-dom to only mock useNavigate
vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual("react-router-dom");
    return {
      ...originalModule, // Keep all other functionalities
      useNavigate: vi.fn(), // Mock only useNavigate
    };
});
  

describe("NavBar component", () => {
    const mockLogout = vi.fn();
    const mockNavigate = vi.fn();

    const mockAuthState = (userId = null, role = null) => {
        useAuth.mockReturnValue({
            authState: { userId, role },
            logout: mockLogout,
        });
    };

    const renderNavBar = () =>
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
    );
    
    beforeEach(() => {
        // Ensure that mockNavigate is returned by useNavigate
        useNavigate.mockReturnValue(mockNavigate);
    });
    
    afterEach(() => {
        vi.clearAllMocks();
    });
    
    
    it("renders navbar correctly", () => {
        mockAuthState(null, null); // No user logged in
        renderNavBar();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("logo")).toBeInTheDocument();
        expect(screen.getByTestId("login-signup-container")).toBeInTheDocument();
    });

    it("shows the dropdown menu when logged in", () => {
        mockAuthState("123", "Administrator");
        renderNavBar();
        const profileButton = screen.getByTestId("profile-pic");
        fireEvent.click(profileButton);
        expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown-profile")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown-bookdetails")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown-logout")).toBeInTheDocument();
    });

    it("does not display the dropdown menu initially", () => {
        mockAuthState("123", "Administrator");
        renderNavBar();
        expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
    });

    it("shows Admin link when role is Administrator", () => {
        mockAuthState("123", "Administrator");
        renderNavBar();
        expect(screen.getByTestId("nav-admin")).toBeInTheDocument();
    });

    it("shows Reception link when role is Receptionist", () => {
        mockAuthState("123", "Receptionist");
        renderNavBar();
        expect(screen.getByTestId("nav-reception")).toBeInTheDocument();
    });

    it("calls the logout function and navigates to home on logout", () => {
        mockAuthState("123", "Administrator");
        renderNavBar();
        const profileButton = screen.getByTestId("profile-pic");
        fireEvent.click(profileButton);
        const logoutButton = screen.getByTestId("dropdown-logout");
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
        expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("displays login and register links when no user is logged in", () => {
        mockAuthState(null, null);
        renderNavBar();
        expect(screen.getByTestId("login-link")).toBeInTheDocument();
        expect(screen.getByTestId("register-link")).toBeInTheDocument();
    });
});