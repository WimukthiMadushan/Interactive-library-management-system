import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from 'vitest';

// Mock data
const mockData = Array.from({ length: 10 }, (_, i) => ({
    Book_ID: i + 1,
    Title: `Book ${i + 1}`,
    Author_First_Name: "Author",
    Author_Last_Name: `${i + 1}`,
    Category_Name: "Fiction",
    Image_Path: null,
}));

describe("Pagination Component", () => {
    const renderPagination = (itemsPerPage = 3) => {
        render(
        <MemoryRouter>
            <Pagination Data={mockData} itemsPerPage={itemsPerPage} />
        </MemoryRouter>
        );
    };

    it("renders the correct number of items per page", () => {
        renderPagination(3);
        const items = screen.getAllByTestId("item");
        expect(items.length).toBe(3); 
    });

    it("renders pagination buttons correctly", () => {
        renderPagination(4);
        expect(screen.getByTestId("prev-button")).toHaveTextContent("Previous");
        expect(screen.getByTestId("next-button")).toHaveTextContent("Next");

        const page1Button = screen.getByTestId("page-1");
        const page2Button = screen.getByTestId("page-2");
        const page3Button = screen.getByTestId("page-3");
        expect(page1Button).toBeInTheDocument();
        expect(page2Button).toBeInTheDocument();
        expect(page3Button).toBeInTheDocument();
    });

    it("handles pagination and updates page correctly", () => {
        renderPagination(3);

        // Ensure initial state (page 1)
        expect(screen.getByTestId("page-1")).toHaveClass("active");

        // Click on page 2
        fireEvent.click(screen.getByTestId("page-2"));
        expect(screen.getByTestId("page-2")).toHaveClass("active");

        // Check items for page 2
        const items = screen.getAllByTestId("item");
        expect(items.length).toBe(3); // Still 3 items, but different content
    });

    it("disables the Previous button on the first page", () => {
        renderPagination(3);
        const prevButton = screen.getByTestId("prev-button");
        expect(prevButton).toHaveClass("disabled");
    });

    it("disables the Next button on the last page", () => {
        renderPagination(3);

        // Click on the last page button
        fireEvent.click(screen.getByTestId("page-3")); // To visible the page 4 button
        fireEvent.click(screen.getByTestId("page-4")); // Assuming 10 items with 3 per page means 4 pages
        const nextButton = screen.getByTestId("next-button");
        expect(nextButton).toHaveClass("disabled");
        screen.debug();
    });

    it("displays 'No image' for items without images", () => {
        renderPagination(3);
        const noImageElements = screen.getAllByTestId("no-image");
        screen.debug();
        expect(noImageElements.length).toBeGreaterThan(0); // maximum 3 items per page
        
    });
});
