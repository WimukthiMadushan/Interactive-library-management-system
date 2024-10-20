import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteModal from "./DeleteModal";
import { describe, it, expect, vi } from 'vitest';
import axios from "axios";

vi.mock("axios");

describe("DeleteModal component", () => {
    const mockHandleClose = vi.fn();
    const mockHandleConfirm = vi.fn();
    const mockFetchAuthors = vi.fn();
    const mockSetShowModal = vi.fn();
    const authorId = 1;
    const value = "author";

    const renderModal = () =>
        render(
            <DeleteModal
                show={true}
                handleClose={mockHandleClose}
                handleConfirm={mockHandleConfirm}
                value={value}
                fetchAuthors={mockFetchAuthors}
                authorId={authorId}
                setShowModal={mockSetShowModal}
            />
        );

    it("renders the delete modal correctly", () => {
        renderModal();
        expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
        expect(screen.getByTestId("delete-modal-title")).toHaveTextContent(
            "Confirm Deletion"
        );
        expect(screen.getByTestId("delete-modal-body")).toHaveTextContent(
            `Are you sure you want to delete this ${value}?`
        );
        expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
        expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    it("calls the handleConfirm function when cancel is clicked", () => {
        renderModal();
        const cancelButton = screen.getByTestId("cancel-button");
        fireEvent.click(cancelButton);
        expect(mockHandleConfirm).toHaveBeenCalled();
    });

    it("calls the delete API and fetches authors when delete is clicked", async () => {
        axios.delete.mockResolvedValue({ data: {} });
        renderModal();
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(
                `http://localhost:5001/api/author/${authorId}`
                );
            expect(mockFetchAuthors).toHaveBeenCalled();
            expect(mockSetShowModal).toHaveBeenCalledWith(false);
        });
    });
});
