import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AuthorManagment from './AuthorManagment';
import '@testing-library/jest-dom';

vi.mock('axios');

describe('AuthorManagment Component', () => {
    beforeEach(() => {
        // Mock data to simulate API responses
        axios.get.mockResolvedValue({
            data: [{
                Author_ID: 1,
                First_Name: 'John',
                Last_Name: 'Doe',
                Email: 'johndoe@example.com',
                Address: '123 Main St',
                Mobile: '555-5555',
                NIC: '123456789V'
            },
            {
                Author_ID: 2,
                First_Name: 'Jane',
                Last_Name: 'Smith',
                Email: 'jane.smith@example.com',
                Address: '456 Elm St, Townsville',
                Mobile: '555-5678',
                NIC: '876543219V',
            }]  
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component with title, search input, and table', async () => {
        render( <AuthorManagment /> );

        expect(screen.getByTestId('author-management-container')).toBeInTheDocument();
        expect(screen.getByTestId('author-management-title')).toHaveTextContent('Author Management');
        expect(screen.getByTestId('add-author-button')).toBeInTheDocument();
        expect(screen.getByTestId('authors-table')).toBeInTheDocument();
        expect(screen.getByTestId('search-author-input')).toBeInTheDocument();
        

        await waitFor(() => {
            expect(screen.getByTestId('author-row-1')).toBeInTheDocument();
            expect(screen.getByTestId('update-author-button-1')).toBeInTheDocument();
            expect(screen.getByTestId('delete-author-button-1')).toBeInTheDocument();
            expect(screen.getByTestId('author-row-2')).toBeInTheDocument();
            expect(screen.getByTestId('update-author-button-2')).toBeInTheDocument();
            expect(screen.getByTestId('delete-author-button-2')).toBeInTheDocument();
        });

        expect(screen.getByTestId('pagination')).toBeInTheDocument();
        expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    });

    it('search input filters authors', async () => {
        render( <AuthorManagment /> );

        // Wait for authors to be fetched
        await waitFor(() => {
            screen.getByTestId('author-row-1');
            screen.getByTestId('author-row-2');
        });

        const searchInput = screen.getByTestId('search-author-input');

        // Simulate typing a search query
        fireEvent.change(searchInput, {
            target: {
                value: 'John'
            }
        });

        // Wait for the filtered authors to be rendered
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
        });
    });

    it('opens AddAuthorPopup when Add Author button is clicked', async () => {
        render( <AuthorManagment /> );

        const addButton = screen.getByTestId('add-author-button');

        // Click the add author button
        fireEvent.click(addButton);

        // Check if the AddAuthorPopup appear
        await waitFor(() => {
            expect(screen.getByTestId('add-author-popup')).toBeInTheDocument();
        });
    });

    it('opens UpdateAuthorPopup when Update button is clicked', async () => {
        render( <AuthorManagment /> );

        // Wait for authors to be fetched
        await waitFor(() => screen.getByTestId('author-row-1'));

        const updateButton = screen.getByTestId('update-author-button-1');

        // Click the update author button
        fireEvent.click(updateButton);

        // Check if the UpdateAuthorPopup appears
        await waitFor(() => {
            expect(screen.getByTestId('update-author-popup')).toBeInTheDocument();
        });
    });

    it("displays success notification modal after author is deleted", async () => {
        // Mock the API response for the initial fetch of authors
        axios.get.mockResolvedValueOnce({
          data: [
            { Author_ID: 1, First_Name: "John", Last_Name: "Doe", Email: "john@example.com", Address: "123 Street", Mobile: "123456789", NIC: "123456789V" },
            { Author_ID: 2, First_Name: "Jane", Last_Name: "Smith", Email: "jane@example.com", Address: "456 Avenue", Mobile: "987654321", NIC: "987654321X" },
          ],
        });
    
        render(<AuthorManagment />);
    
        await waitFor(() => screen.getByTestId("author-row-1"));
    
        // Check that the first author row is in the document
        expect(screen.getByTestId("author-row-1")).toBeInTheDocument();
    
        // Get the delete button for the first author
        const deleteButton = screen.getByTestId("delete-author-button-1");

        fireEvent.click(deleteButton);

        expect(axios.delete).toHaveBeenCalledWith("http://localhost:5001/api/author/1");
    
        await waitFor(() => {
          expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
          expect(screen.getByText("Author Deleted Successfully.")).toBeInTheDocument();
        });
    });

    it('displays error notification modal on deletion failure', async () => {
        axios.delete.mockRejectedValue(new Error('Failed to delete'));
        
        render( <AuthorManagment /> );

        // Wait for authors to be fetched
        await waitFor(() => screen.getByTestId('author-row-1'));

        const deleteButton = screen.getByTestId('delete-author-button-1');

        // Click the delete button
        fireEvent.click(deleteButton);

        // Wait for the error modal to appear
        await waitFor(() => {
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText('Error Deleting Author.')).toBeInTheDocument();
        });
    });
});
