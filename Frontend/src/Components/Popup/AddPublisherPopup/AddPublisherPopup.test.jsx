import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddPublisherPopup from './AddPublisherPopup';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';

// Mock the `fetchPublishers` and `toggleAddPopup` functions
const mockFetchPublishers = vi.fn();
const mockToggleAddPopup = vi.fn();

// Mock axios
vi.mock('axios');

describe('AddPublisherPopup Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
    });

    // Test if the component renders without crashing
    it('renders the form and modal correctly', () => {
        render(
        <AddPublisherPopup
            toggleAddPopup={mockToggleAddPopup}
            fetchPublishers={mockFetchPublishers}
        />
        );

        // Ensure the form fields are rendered
        expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
        expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('address-input')).toBeInTheDocument();
        expect(screen.getByTestId('mobile-input')).toBeInTheDocument();

        // Check buttons
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.getByTestId('popup-close-button')).toBeInTheDocument();
    });

    // Test adding inputs into form fields
    it('allows input into form fields', () => {
        render(
        <AddPublisherPopup
            toggleAddPopup={mockToggleAddPopup}
            fetchPublishers={mockFetchPublishers}
        />
        );

        // Simulate user typing in inputs
        fireEvent.change(screen.getByTestId('first-name-input'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByTestId('last-name-input'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByTestId('address-input'), {
            target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByTestId('mobile-input'), {
            target: { value: '+1 555-555-5555' },
        }); 

        // Check if the input values were updated
        expect(screen.getByTestId('first-name-input')).toHaveValue('John');
        expect(screen.getByTestId('last-name-input')).toHaveValue('Doe');
        expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
        expect(screen.getByTestId('address-input')).toHaveValue('123 Main St');
        expect(screen.getByTestId('mobile-input')).toHaveValue('+1 555-555-5555');
    });

    // check a successful form submission
    it('displays success modal after successful form submission', async () => {
        axios.post.mockResolvedValue({ status: 201 });

        render(
            <AddPublisherPopup
                toggleAddPopup={mockToggleAddPopup}
                fetchPublishers={mockFetchPublishers}
            />
        );

        // Fill out the form
        fireEvent.change(screen.getByTestId('first-name-input'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByTestId('last-name-input'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByTestId('address-input'), {
            target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByTestId('mobile-input'), {
            target: { value: '+1 555-555-5555' },
        });

        // Submit the form
        fireEvent.click(screen.getByTestId('submit-button'));

        // Wait for the axios request to resolve and modal to display
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/api/publisher', {
                Publisher_First_Name: 'John',
                Publisher_Last_Name: 'Doe',
                Email: 'john@example.com',
                Address: '123 Main St',
                Mobile: '+1 555-555-5555',
            });
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
            expect(screen.getByText('Publisher Added Successfully!')).toBeInTheDocument();
        });
    });

    // ---------------------------------------------------------------------------------------------------------------------------------------
    // // Testing a failed form submission
    // it('displays error modal when form submission fails', async () => {
    //     axios.post.mockRejectedValue(new Error('Failed to add publisher'));

    //     render(
    //         <AddPublisherPopup
    //             toggleAddPopup={mockToggleAddPopup}
    //             fetchPublishers={mockFetchPublishers}
    //         />
    //     );

    //     // Fill out the form
    //     fireEvent.change(screen.getByTestId('first-name-input'), {
    //         target: { value: 'John' },
    //     });
    //     fireEvent.change(screen.getByTestId('last-name-input'), {
    //         target: { value: 'Doe' },
    //     });
    //     fireEvent.change(screen.getByTestId('email-input'), {
    //         target: { value: 'john@example.com' },
    //     });

    //     // Submit the form
    //     fireEvent.click(screen.getByTestId('submit-button'));

    //     await waitFor(() => {
    //         // Wait for the axios request to fail and modal to display
    //         expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
    //         expect(screen.getByText('Failed to Add Publisher : Failed to Add Publisher.')).toBeInTheDocument();
    //     });
        
    // }); 
    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    it('calls axios.post when the form is submitted', async () => {
        // Mock the POST request to succeed
        axios.post.mockResolvedValue({ status: 201 });
    
        render(
            <AddPublisherPopup
                toggleAddPopup={mockToggleAddPopup}
                fetchPublishers={mockFetchPublishers}
            />
        );
    
        // Fill out the form fields
        fireEvent.change(screen.getByTestId('first-name-input'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByTestId('last-name-input'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByTestId('address-input'), {
            target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByTestId('mobile-input'), {
            target: { value: '+1 555-555-5555' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Ensure axios.post was called exactly once
        expect(axios.post).toHaveBeenCalledTimes(1);
    
        // Check that axios.post was called with correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/api/publisher', {
                Publisher_First_Name: 'John',
                Publisher_Last_Name: 'Doe',
                Email: 'john@example.com',
                Address: '123 Main St',
                Mobile: '+1 555-555-5555',
            });
        });
    });


    // Test if the modal closes after success
    it('closes modal and toggles popup on success', async () => {
        axios.post.mockResolvedValue({ status: 201 });
    
        render(
            <AddPublisherPopup
                toggleAddPopup={mockToggleAddPopup}
                fetchPublishers={mockFetchPublishers}
            />
        ); 

        // Fill out the form fields
        fireEvent.change(screen.getByTestId('first-name-input'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByTestId('last-name-input'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByTestId('address-input'), {
            target: { value: '123 Street' },
        });
        fireEvent.change(screen.getByTestId('mobile-input'), {
            target: { value: '1234567890' },
        });
        
        // Fill out the form and submit
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Wait for success modal and close it
        await waitFor(() => {
            expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
        });
    
        fireEvent.click(screen.getByTestId('close-button')); // Close button in notification modal
    
        // Ensure the popup closes after success
        expect(mockFetchPublishers).toHaveBeenCalled();
        expect(mockToggleAddPopup).toHaveBeenCalled();  
    });
});
