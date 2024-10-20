import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Register from "./Register";
import { describe, it, expect, vi } from "vitest";

// Mock axios
vi.mock("axios");

describe("Register Component", () => {
  it("renders the register page and form elements", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const pageTitle = screen.getByTestId("register-title");
    expect(pageTitle).toHaveTextContent("Sign Up");

    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const usernameInput = screen.getByTestId("username-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const nicInput = screen.getByTestId("nic-input");
    const addressInput = screen.getByTestId("address-input");
    const mobileInput = screen.getByTestId("mobile-input");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nicInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();
  });

  it("submits the form and shows success modal", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Registration Successful" } });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("nic-input"), {
      target: { value: "123456789V" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByTestId("mobile-input"), {
      target: { value: "0771234567" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
      expect(screen.getByText("Registration Succesfull.")).toBeInTheDocument();
    });
  });

  it("shows error modal on failed registration", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration Failed"));

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("nic-input"), {
      target: { value: "123456789V" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByTestId("mobile-input"), {
      target: { value: "0771234567" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
        expect(screen.getByText("Registration Failed")).toBeInTheDocument();
    });
  });
});
