import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddAuthorPopup from './AddAuthorPopup'; 
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';

// Mock the `fetchAuthors` and `toggleAddAuthorPopup` functions
const mockFetchAuthors = vi.fn();
const mockToggleAddAuthorPopup = vi.fn();

// Mock axios
vi.mock('axios');

describe('AddAuthorPopup Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
    });

    // Test if the component renders without crashing
    it('renders the form and modal correctly', () => {
        render(
        <AddAuthorPopup
            toggleAddAuthorPopup={mockToggleAddAuthorPopup}
            fetchAuthors={mockFetchAuthors}
        />
        );

        // Ensure the form fields are rendered
        expect(screen.getByTestId('input-first-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-last-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-email')).toBeInTheDocument();
        expect(screen.getByTestId('input-street')).toBeInTheDocument();
        expect(screen.getByTestId('input-city')).toBeInTheDocument();
        expect(screen.getByTestId('input-country')).toBeInTheDocument();
        expect(screen.getByTestId('input-nic')).toBeInTheDocument();
        expect(screen.getByTestId('input-mobile')).toBeInTheDocument();

        // Check buttons
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    });


    // Test if the form fields are empty by default
    it('allows input into form fields', () => {
        render(
        <AddAuthorPopup
            toggleAddAuthorPopup={mockToggleAddAuthorPopup}
            fetchAuthors={mockFetchAuthors}
        />
        );

        // Simulate user typing in inputs
        fireEvent.change(screen.getByTestId('input-first-name'), {
            target: { value: 'foo' },
        });
        fireEvent.change(screen.getByTestId('input-last-name'), {
        target: { value: 'foo foo' },
        });
        fireEvent.change(screen.getByTestId('input-email'), {
        target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByTestId('input-street'), {
        target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByTestId('input-city'), {
            target: { value: 'New York' },
        });
        fireEvent.change(screen.getByTestId('input-country'), {
            target: { value: 'United States' },
        });
        fireEvent.change(screen.getByTestId('input-nic'), {
            target: { value: '123456789' },
        });
        fireEvent.change(screen.getByTestId('input-mobile'), {
            target: { value: '+1 555-555-5555' },
        });

        // Check if the input values were updated
        expect(screen.getByTestId('input-first-name')).toHaveValue('foo');
        expect(screen.getByTestId('input-last-name')).toHaveValue('foo foo');
        expect(screen.getByTestId('input-email')).toHaveValue('john@example.com');
        expect(screen.getByTestId('input-street')).toHaveValue('123 Main St');
        expect(screen.getByTestId('input-city')).toHaveValue('New York');
        expect(screen.getByTestId('input-country')).toHaveValue('United States');
        expect(screen.getByTestId('input-nic')).toHaveValue('123456789');
        expect(screen.getByTestId('input-mobile')).toHaveValue('+1 555-555-5555');
    });

    // Test a successful form submission
    it('displays success modal after successful form submission', async () => {
        axios.post.mockResolvedValue({ status: 201 });
    
        render(
            <AddAuthorPopup
                toggleAddAuthorPopup={mockToggleAddAuthorPopup}
                fetchAuthors={mockFetchAuthors}
            />
        );
    
        // Fill out the form
        fireEvent.change(screen.getByTestId('input-first-name'), {
            target: { value: 'foo' },
        });
        fireEvent.change(screen.getByTestId('input-last-name'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByTestId('input-street'), {
            target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByTestId('input-city'), {
            target: { value: 'New York' },
        });
        fireEvent.change(screen.getByTestId('input-country'), {
            target: { value: 'United States' },
        });
        fireEvent.change(screen.getByTestId('input-nic'), {
            target: { value: '123456789' },
        });
        fireEvent.change(screen.getByTestId('input-mobile'), {
            target: { value: '+1 555-555-5555' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Wait for the axios request to resolve and modal to display
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/api/author/', {
                First_Name: 'foo',
                Last_Name: 'Doe',
                Email: 'john@example.com',
                Street: '123 Main St',
                City : 'New York',
                Country: 'United States',
                NIC: '123456789',
                Mobile: '+1 555-555-5555',
            });
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText('Author added successfully!')).toBeInTheDocument();
        });
    });

    // Test a failed form submission
    it('displays error modal when form submission fails', async () => {
        axios.post.mockRejectedValue(new Error('Failed to add author'));
    
        render(
            <AddAuthorPopup
                toggleAddAuthorPopup={mockToggleAddAuthorPopup}
                fetchAuthors={mockFetchAuthors}
            />
        );
    
        // Fill out the form
        fireEvent.change(screen.getByTestId('input-first-name'), {
            target: { value: 'jhon' },
        });
        fireEvent.change(screen.getByTestId('input-last-name'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'john@example.com' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Wait for the axios request to fail and modal to display
        await waitFor(() => {
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText('Failed to add author: Failed to add author')).toBeInTheDocument();
        });
    });

    // Test if the modal closes after success
    it('closes modal and toggles popup on success', async () => {
        axios.post.mockResolvedValue({ status: 201 });
    
        render(
            <AddAuthorPopup
                toggleAddAuthorPopup={mockToggleAddAuthorPopup}
                fetchAuthors={mockFetchAuthors}
            />
        ); 
    
        // Fill out the form and submit
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Wait for success modal and close it
        await waitFor(() => {
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
        });
    
        fireEvent.click(screen.getByTestId('close-button')); // Close button in notification modal
    
        // Ensure the popup closes after success
        expect(mockFetchAuthors).toHaveBeenCalled();
        expect(mockToggleAddAuthorPopup).toHaveBeenCalled();  
      });
});