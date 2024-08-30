import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./../Pages/Register/Register";

// Mock axios
jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Register Component", () => {
  it("renders the register form", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Check if form fields are rendered
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("NIC Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile")).toBeInTheDocument();

    // Check if the register button is rendered
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    const axios = require("axios");
    axios.post.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("NIC Number"), {
      target: { value: "123456789V" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mobile"), {
      target: { value: "0712345678" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Register"));

    // Check if axios.post was called
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/register",
      {
        First_Name: "John",
        Last_Name: "Doe",
        Username: "johndoe",
        Password: "password123",
        Email: "johndoe@example.com",
        Address: "123 Main St",
        NIC: "123456789V",
        Mobile: "0712345678",
      }
    );
  });

  it("shows an error message on registration failure", async () => {
    const axios = require("axios");
    axios.post.mockRejectedValue(new Error("Registration failed"));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form with invalid data or mock a failure
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("NIC Number"), {
      target: { value: "123456789V" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mobile"), {
      target: { value: "0712345678" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Register"));

    // Check if error modal is shown
    const errorModal = await screen.findByText("Registration Failed");
    expect(errorModal).toBeInTheDocument();
  });
});
