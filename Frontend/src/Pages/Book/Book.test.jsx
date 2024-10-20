import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Book from "./Book";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";
import axios from "axios";

// Mock axios and AuthContext
vi.mock("axios");
vi.mock("../../Hooks/AuthContext");

// Utility function to render the Book component wrapped in a router
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: MemoryRouter });
};

describe("Book Component", () => {
  const mockBookData = {
    Title: "Test Book",
    Description: "This is a test book",
    ISBN_Number: "1234567890",
    Author_Name: "Test Author",
    Category_Name: "Test Category",
    Published_Date: "2023-01-01",
    Image_Path: "/test-image.jpg",
  };

  const mockBookCopyData = [
    {
      Copy_ID: 1,
      Language: "English",
      Floor: "2nd",
      Section: "Fiction",
      Shelf_Number: 5,
      RowNum: 3,
      isReserved: false,
      isBorrowed: false,
    },
    {
      Copy_ID: 2,
      Language: "Spanish",
      Floor: "3rd",
      Section: "Non-Fiction",
      Shelf_Number: 4,
      RowNum: 1,
      isReserved: true,
      isBorrowed: false,
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockBookData }).mockResolvedValueOnce({ data: mockBookCopyData });
    useAuth.mockReturnValue({
      authState: { userId: null },
    });
  });

  it("renders the book details correctly", async () => {
    renderWithRouter(<Book />, { route: "/book/1" });

    // Wait for the book data to load
    await waitFor(() => screen.getByTestId("book-title"));

    expect(screen.getByTestId("book-title")).toHaveTextContent("Test Book");
    expect(screen.getByTestId("book-description")).toHaveTextContent("This is a test book");
    expect(screen.getByTestId("book-isbn")).toHaveTextContent("1234567890");
    expect(screen.getByTestId("book-author")).toHaveTextContent("Test Author");
    expect(screen.getByTestId("book-category")).toHaveTextContent("Test Category");
    expect(screen.getByTestId("book-published-date")).toHaveTextContent("2023-01-01");
  });

  it("renders available book copies and shows reserve button", async () => {
    renderWithRouter(<Book />, { route: "/book/1" });

    await waitFor(() => screen.getByTestId("book-copy-details"));

    expect(screen.getByTestId("copy-language-1")).toHaveTextContent("English");
    expect(screen.getByTestId("copy-status-1")).toHaveTextContent("Available for borrowing or reservation");
    expect(screen.getByTestId("reserve-button-1")).not.toBeDisabled();

    expect(screen.getByTestId("copy-status-2")).toHaveTextContent("Reserved");
    expect(screen.getByTestId("reserve-button-2")).toBeDisabled();
  });

  it("shows the login popup when trying to reserve a book without being logged in", async () => {
    renderWithRouter(<Book />, { route: "/book/1" });

    await waitFor(() => screen.getByTestId("book-copy-details"));

    fireEvent.click(screen.getByTestId("reserve-button-1"));

    // Check if the login popup appears
    expect(screen.getByTestId("login-popup")).toBeInTheDocument();
  });

  it("shows the reservation popup when the user is logged in and clicks reserve", async () => {
    // Mock logged-in user
    useAuth.mockReturnValue({
      authState: { userId: 1 },
    });

    renderWithRouter(<Book />, { route: "/book/1" });

    await waitFor(() => screen.getByTestId("book-copy-details"));
    fireEvent.click(screen.getByTestId("reserve-button-1"));

    // Check if the reservation popup appears
    expect(screen.getByTestId("reservation-popup")).toBeInTheDocument();
  });

  it("allows the user to cancel the reservation popup", async () => {
    // Mock logged-in user
    useAuth.mockReturnValue({
      authState: { userId: 1 },
    });

    renderWithRouter(<Book />, { route: "/book/1" });

    await waitFor(() => screen.getByTestId("book-copy-details"));
    fireEvent.click(screen.getByTestId("reserve-button-1"));
    expect(screen.getByTestId("reservation-popup")).toBeInTheDocument();

    // Cancel the reservation
    fireEvent.click(screen.getByTestId("cancel-reservation-button"));

    // Check that the reservation popup disappears
    await waitFor(() => expect(screen.queryByTestId("reservation-popup")).not.toBeInTheDocument());
  });
});
