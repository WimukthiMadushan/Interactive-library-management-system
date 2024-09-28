import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddBorrows from "./AddBorrows";
import { describe, it, expect, vi } from 'vitest';

vi.mock("axios");

describe("AddBorrows", () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        render(<AddBorrows onClose={mockOnClose} />);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    // check if the form is rendered correctly
    it("renders the form inputs and submit button", () => {
        expect(screen.getByTestId("borrow-form")).toBeInTheDocument();
        expect(screen.getByTestId("user-id-input")).toBeInTheDocument();
        expect(screen.getByTestId("book-id-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
        expect(screen.getByTestId("close-button")).toBeInTheDocument();
    });

    // check if the form is submitted successfully
    it("submits the form successfully", async () => {
        axios.post.mockResolvedValue({ data: { message: "Borrow successful!" } });

        fireEvent.change(screen.getByTestId("user-id-input"), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByTestId("book-id-input"), {
            target: { value: "456" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:5001/api/borrow",
                {
                UserID: "123",
                Copy_ID: "456",
                }
            );
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText("Borrow successful!")).toBeInTheDocument();
        });
    });

    // checkin a failed form submission
    it("shows error message when API call fails", async () => {
        axios.post.mockRejectedValue({
            response: { data: { message: "Borrow failed!" } },
        });

        fireEvent.change(screen.getByTestId("user-id-input"), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByTestId("book-id-input"), {
            target: { value: "456" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText("Borrow failed!")).toBeInTheDocument();
        });
    });

    it("disables the submit button when loading", async () => {
        axios.post.mockResolvedValue({ data: { message: "Borrow successful!" } });

        fireEvent.change(screen.getByTestId("user-id-input"), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByTestId("book-id-input"), {
            target: { value: "456" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(screen.getByTestId("submit-button")).toBeDisabled();
        });
    });

    // check if the close button works
    it("calls the onClose function when close button is clicked", () => {
        fireEvent.click(screen.getByTestId("close-button"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
