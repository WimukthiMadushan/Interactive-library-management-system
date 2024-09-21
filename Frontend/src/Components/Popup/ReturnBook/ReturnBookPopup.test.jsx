import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ReturnBookPopup from './ReturnBookPopup';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');

describe('ReturnBookPopup', () => {
    const mockOnClose = vi.fn();
    const mockFetchBorrows = vi.fn();
    const borrowId = '123';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the ReturnBookPopup component', () => {
        render(<ReturnBookPopup onClose={mockOnClose} borrowId={borrowId} fetchBorrows={mockFetchBorrows} />);
        expect(screen.getByTestId('return-book-popup')).toBeInTheDocument();
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
        expect(screen.getByTestId('confirm-return-button')).toBeInTheDocument();
    });

    it('closes the modal when the close button is clicked', () => {
        render(<ReturnBookPopup onClose={mockOnClose} borrowId={borrowId} fetchBorrows={mockFetchBorrows} />);
        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('displays the loading state while the return is processing', async () => {
        axios.put.mockResolvedValueOnce({ data: { success: true } });
        render(<ReturnBookPopup onClose={mockOnClose} borrowId={borrowId} fetchBorrows={mockFetchBorrows} />);
        
        const confirmButton = screen.getByTestId('confirm-return-button');
        fireEvent.click(confirmButton);

        expect(confirmButton).toHaveTextContent('Returning...');
        
        await waitFor(() => expect(confirmButton).toHaveTextContent('Confirm Return'));
    });

    it('displays an error message if the return fails', async () => {
        axios.put.mockRejectedValueOnce(new Error('Failed to return book'));

        render(<ReturnBookPopup onClose={mockOnClose} borrowId={borrowId} fetchBorrows={mockFetchBorrows} />);
        
        const confirmButton = screen.getByTestId('confirm-return-button');
        fireEvent.click(confirmButton);

        await waitFor(() => expect(screen.getByTestId('error-message')).toHaveTextContent('Error returning the book'));
    });

    it('calls fetchBorrows and closes the modal on successful return', async () => {
        axios.put.mockResolvedValueOnce({ data: { success: true } });

        render(<ReturnBookPopup onClose={mockOnClose} borrowId={borrowId} fetchBorrows={mockFetchBorrows} />);
        
        const confirmButton = screen.getByTestId('confirm-return-button');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(`http://localhost:5000/api/borrow/return/${borrowId}`);
            expect(mockFetchBorrows).toHaveBeenCalled();
            expect(mockOnClose).toHaveBeenCalled();
            expect(confirmButton).toHaveTextContent('Confirm Return');
        });
    });
});
