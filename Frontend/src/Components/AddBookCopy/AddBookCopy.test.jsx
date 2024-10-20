import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import AddBookCopy from './AddBookCopy';
import { StoreContext } from './../../Hooks/StoreContext';

// Mock axios and togglePopup function
vi.mock('axios');
const mockTogglePopup = vi.fn();

// Mock context value
const mockContextValue = {
    languageOptions: [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
    ],
    bookOptions: [
        { value: 'book1', label: 'Book 1' },
        { value: 'book2', label: 'Book 2' },
    ],
};

describe('AddBookCopy Component', () => {
    beforeEach(() => {
        render(
        <StoreContext.Provider value={mockContextValue}>
            <AddBookCopy showPopup={true} togglePopup={mockTogglePopup} />
        </StoreContext.Provider>
        );
    });

    // Render the form correctly
    it('renders AddBookCopy form correctly', () => {
        expect(screen.getByTestId('book-copy-modal')).toBeInTheDocument();
        expect(screen.getByTestId('book-copy-table')).toBeInTheDocument();
        expect(screen.getByTestId('add-row-button')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.getByTestId('delete-button-0')).toBeInTheDocument();
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });


    // Add row test case
    it('can add a new row', () => {
        fireEvent.click(screen.getByTestId('add-row-button'));
        expect(screen.getAllByTestId(/^row-/)).toHaveLength(2); // 2 rows now
    });

    // Delete row test case
    it('can delete a row', () => {
        fireEvent.click(screen.getByTestId('delete-button-0'));
        expect(screen.queryByTestId('row-0')).not.toBeInTheDocument();
    });

    // Fill out the form and submit
    it('can fill out the form and submit', async () => {
        // Simulate selecting a book from the  dropdown
        const bookSelectInput = screen.getByText('Select Book'); 
        userEvent.click(bookSelectInput); // Open the dropdown
        const bookOption = await screen.findByText('Book 1'); 
        userEvent.click(bookOption); // Select 'Book 1'

        // Simulate selecting a language from the  dropdown
        const languageSelectInput = screen.getByText('Select Languages'); 
        userEvent.click(languageSelectInput); // Open the dropdown
        const languageOption = await screen.findByText('English'); 
        userEvent.click(languageOption); // Select 'English'
    
        // Fill out the copies input
        const copiesInput = await screen.findByTestId('copies-input-en-0'); 
        fireEvent.change(copiesInput, {
            target: { value: '5' },
        });
    
        // Mock the API call response
        axios.post.mockResolvedValue({ data: { success: true } });
    
        // Submit the form
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Define the expected payload that should be sent
        const expectedPayload = [
            {
                bookID:  {
                    "label": "Book 1",
                    "value": "book1",
                }, 
                languages: {
                    en: 5, // 'en' corresponds to English with 5 copies
                },
            },
        ];

        // Wait for the submission and check assertions
        await waitFor(() => {
            // Verify that the API call was made with the correct data
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5001/api/bookcopy',
                expectedPayload
            );
            // Verify that the togglePopup function was called
            expect(mockTogglePopup).toHaveBeenCalled();
        });
    });


    // it('shows error when API call fails', async () => {
    //     axios.post.mockRejectedValue(new Error('Network Error'));

    //     fireEvent.click(screen.getByTestId('submit-button'));

    //     await waitFor(() => {
            
    //         expect(screen.getByText('Error sending data')).toBeInTheDocument(); // Check if error message is displayed
    //     });
    // });
});
