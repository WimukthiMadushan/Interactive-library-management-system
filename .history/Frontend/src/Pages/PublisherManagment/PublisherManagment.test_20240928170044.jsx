import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PublisherManagment from './PublisherManagment';
import axios from 'axios';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

// Mock axios for API calls
vi.mock('axios');

describe('PublisherManagment Component', () => {
    const mockPublishers = [
        { Publisher_ID: 1, Publisher_First_Name: 'John', Publisher_Last_Name: 'Doe', Email: 'john@example.com', Address: '123 Main St', Mobile: '555-5555' },
        { Publisher_ID: 2, Publisher_First_Name: 'Jane', Publisher_Last_Name: 'Smith', Email: 'jane@example.com', Address: '456 Elm St', Mobile: '555-1234' },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockPublishers });
        axios.delete.mockResolvedValue({});
    });

    it('renders the PublisherManagment component', async () => {
        render(<PublisherManagment />);

        // Check if the component is rendered
        expect(screen.getByTestId('publisher-management-container')).toBeInTheDocument();
        expect(screen.getByTestId('publisher-management-title')).toHaveTextContent('Publisher Management');
        expect(screen.getByTestId('add-publisher-button')).toBeInTheDocument();
        expect(screen.getByTestId('publishers-table')).toBeInTheDocument();
        expect(screen.getByTestId('search-input')).toBeInTheDocument();

        // Wait for publishers to load and display in the table
        await waitFor(() => {
            expect(screen.getByTestId('publisher-row-1')).toBeInTheDocument();
            expect(screen.getByTestId('update-button-1')).toBeInTheDocument();
            expect(screen.getByTestId('delete-button-1')).toBeInTheDocument();
            expect(screen.getByTestId('publisher-row-2')).toBeInTheDocument();
            expect(screen.getByTestId('update-button-2')).toBeInTheDocument();
            expect(screen.getByTestId('delete-button-2')).toBeInTheDocument();
        });
    });

    it('handles search input correctly', async () => {
        render(<PublisherManagment />);

        // Enter search query
        fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'John' } });

        // Verify that search input works
        await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
        });
    });

    it('opens AddPublisherPopup when Add Publisher button is clicked', async () => {
        render( <PublisherManagment /> );

        const addButton = screen.getByTestId('add-publisher-button');

        // Click the add publisher button
        fireEvent.click(addButton);

        // Check if the AddPublisherPopup appear
        await waitFor(() => {
            expect(screen.getByTestId('add-publisher-popup')).toBeInTheDocument();
        });
    });

    it('opens UpdatePublisherPopup when Update button is clicked', async () => {
        render( <PublisherManagment /> );

        // Wait for publishers to be fetched
        await waitFor(() => screen.getByTestId('publisher-row-1'));

        const updateButton = screen.getByTestId('update-button-1');

        // Click the update publisher button
        fireEvent.click(updateButton);

        // Check if the UpdatePublisherPopup appears
        await waitFor(() => {
            expect(screen.getByTestId('popup-overlay')).toBeInTheDocument();
        });
    });

    it("displays success notification modal after publisher is deleted", async () => {
        // Mock the API response for the initial fetch of publishers
        axios.get.mockResolvedValueOnce({
          data: [
            { Publisher_ID: 1, Publisher_First_Name: 'John', Publisher_Last_Name: 'Doe', Email: 'john@example.com', Address: '123 Main St', Mobile: '555-5555' },
            { Publisher_ID: 2, Publisher_First_Name: 'Jane', Publisher_Last_Name: 'Smith', Email: 'jane@example.com', Address: '456 Elm St', Mobile: '555-1234' },
          ],
        });
    
        render(<PublisherManagment />);
    
        await waitFor(() => screen.getByTestId("publisher-row-1"));
    
        // Check that the first publisher row is in the document
        expect(screen.getByTestId("publisher-row-1")).toBeInTheDocument();
    
        // Get the delete button for the first publisher
        const deleteButton = screen.getByTestId("delete-button-1");

        fireEvent.click(deleteButton);

        expect(axios.delete).toHaveBeenCalledWith("http://localhost:5001/api/publisher/1");
    
        await waitFor(() => {
          expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
          expect(screen.getByText("Publisher Deleted Successfully.")).toBeInTheDocument();
        });
    });

    it('displays error notification modal on deletion failure', async () => {
        axios.delete.mockRejectedValue(new Error('Failed to delete'));
        
        render( <PublisherManagment /> );

        // Wait for publishers to be fetched
        await waitFor(() => screen.getByTestId('publisher-row-1'));

        const deleteButton = screen.getByTestId('delete-button-1');

        // Click the delete button
        fireEvent.click(deleteButton);

        // Wait for the error modal to appear
        await waitFor(() => {
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText('Failed to Delete Publisher.')).toBeInTheDocument();
        });
    });
});