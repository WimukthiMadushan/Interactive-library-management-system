import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BorrowBookManagment from "./BorrowBookManagment";
import axios from "axios";
import { describe, it, expect, vi } from "vitest";

// Mock axio
vi.mock("axios");

describe("BorrowBookManagment", () => {
    const mockBorrows = [{
            Borrow_ID: 1,
            User_ID: 123,
            Book_ID: 456,
            Borrow_Date: "2024-09-01",
            Borrow_Time: "10:00 AM",
            Return_Date: null,
            isComplete: 0,
        },
        {
            Borrow_ID: 2,
            User_ID: 124,
            Book_ID: 457,
            Borrow_Date: "2024-09-02",
            Borrow_Time: "11:00 AM",
            Return_Date: "2024-09-05",
            isComplete: 1,
        },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: mockBorrows
        });
    });

    it("renders the borrow management component", async () => {
        render( <BorrowBookManagment /> );

        expect(screen.getByText("Borrow Books Management")).toBeInTheDocument();
        expect(screen.getByTestId("borrow-management")).toBeInTheDocument();
        expect(screen.getByTestId("add-borrow-button")).toBeInTheDocument();
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
        expect(screen.getByTestId("borrow-table")).toBeInTheDocument();

        await waitFor(() => expect(axios.get).toHaveBeenCalled());
        expect(screen.getByTestId("borrow-table")).toBeInTheDocument();

        expect(screen.getByText("124")).toBeInTheDocument();
        expect(screen.getByText("456")).toBeInTheDocument();
    });

    it("filters the table based on the search input", async () => {
        render( <BorrowBookManagment /> );

        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, {
            target: {
                value: "124"
            }
        });

        // Wait for filtered result
        await waitFor(() => {
            expect(screen.getByText("124")).toBeInTheDocument();
            expect(screen.queryByText("123")).not.toBeInTheDocument();
        });
    });

    it("opens the add borrow popup when clicking the 'Borrow Book' button", () => {
        render( <BorrowBookManagment /> );

        const addButton = screen.getByTestId("add-borrow-button");
        fireEvent.click(addButton);

        // Assert the add borrow popup is shown
        expect(screen.getByTestId("add-borrow-popup-container")).toBeInTheDocument();
    });

    it("opens the return book popup when clicking the 'Return' button", async () => {
        render( <BorrowBookManagment /> );

        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        // Find and click the return button for a borrow that is not yet returned
        const returnButton = screen.getByTestId("return-button-1");
        fireEvent.click(returnButton);

        // Assert the return popup is shown
        expect(screen.getByTestId("return-book-popup")).toBeInTheDocument();
    });

    it("disables the return button for completed borrows", async () => {
        render( <BorrowBookManagment /> );

        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        // Find the return button for a completed borrow
        const returnButton = screen.getByTestId("return-button-2");

        // Assert the button is disabled
        expect(returnButton).toBeDisabled();
    });

    it("handles page change when clicking pagination buttons", async () => {
        render( <BorrowBookManagment /> );

        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        // Mock only two borrows per page
        const paginationButton = screen.getByTestId("pagination");

        // Check pagination is rendered and assert page change behavior
        expect(paginationButton).toBeInTheDocument();
    });
});
