import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import axios from "axios";
import UpdateAuthorPopup from "./UpdateAuthorPopup";
import { describe, it, expect, vi } from 'vitest';

// Mocking axios and external functions
vi.mock("axios");


const mockToggleUpdateAuthorPopup = vi.fn();
const mockFetchAuthors = vi.fn();

describe("UpdateAuthorPopup", () => {
    const authorId = 1;

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                First_Name: "John",
                Last_Name: "Doe",
                Email: "john@example.com",
                Street: "123 Main St",
                City: "New York",
                Country: "USA",
                NIC: "123-45-6789",
                Mobile: "+1 (555) 555-5555",
                Address : "123 Main St, New York, USA"
            },
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the popup with correct data", async () => {
        render(
        <UpdateAuthorPopup
            toggleUpdateAuthorPopup={mockToggleUpdateAuthorPopup}
            fetchAuthors={mockFetchAuthors}
            authorId={authorId}
        />
        );
        // Wait for the author data to load
        await waitFor(() => {
            expect(screen.getByTestId("update-author-popup")).toBeInTheDocument();
            expect(screen.getByTestId("close-button")).toBeInTheDocument();
            expect(screen.getByTestId("update-author-form")).toBeInTheDocument();
            expect(screen.getByTestId("first-name-input").value).toBe("John");
            expect(screen.getByTestId("last-name-input").value).toBe("Doe");
            expect(screen.getByTestId("email-input").value).toBe("john@example.com");
            expect(screen.getByTestId("street-input").value).toBe("123 Main St");
            expect(screen.getByTestId("city-input").value).toBe("New York");
            expect(screen.getByTestId("country-input").value).toBe("USA");
            expect(screen.getByTestId("nic-input").value).toBe("123-45-6789");
            expect(screen.getByTestId("mobile-input").value).toBe("+1 (555) 555-5555");
            expect(screen.getByTestId("submit-button")).toBeInTheDocument();
            expect(screen.getByTestId("cancel-button")).toBeInTheDocument();

        });
    });


    it("submits the form and shows success modal on successful API call", async () => {
        // Mock the successful API response
        axios.put.mockResolvedValueOnce({ status: 200 });
      
        render(
          <UpdateAuthorPopup
            toggleUpdateAuthorPopup={mockToggleUpdateAuthorPopup}
            fetchAuthors={mockFetchAuthors}
            authorId={authorId}
          />
        );
      
        // Fill the form fields with the data
        fireEvent.change(screen.getByTestId("first-name-input"), {
          target: { value: "John" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
          target: { value: "Doe" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
          target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByTestId("street-input"), {
          target: { value: "123 Main St" },
        });
        fireEvent.change(screen.getByTestId("city-input"), {
          target: { value: "New York" },
        });
        fireEvent.change(screen.getByTestId("country-input"), {
          target: { value: "USA" },
        });
        fireEvent.change(screen.getByTestId("nic-input"), {
          target: { value: "123-45-6789" },
        });
        fireEvent.change(screen.getByTestId("mobile-input"), {
          target: { value: "+1 (555) 555-5555" },
        });
      
        // Simulate form submission
        fireEvent.click(screen.getByTestId("submit-button"));
      
        await waitFor(() => {
          // Check if the API call is made with the correct data
          expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:5001/api/author/${authorId}`,
            {
              First_Name: "John",
              Last_Name: "Doe",
              Email: "john@example.com",
              Street: "123 Main St",
              City: "New York",
              Country: "USA",
              NIC: "123-45-6789",
              Mobile: "+1 (555) 555-5555",
              Address: "123 Main St, New York, USA",
            }
          );
          expect(mockFetchAuthors).toHaveBeenCalled();
        });

        // Check for success modal
        await waitFor(() => {
            
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
            expect(screen.getByText("Author updated successfully!")).toBeInTheDocument();
        });
    });
      

    it('submits the form and shows error modal on failed API call', async () => {
        // Mock the failed API response
        axios.put.mockRejectedValueOnce(new Error('Failed to update author'));
    
        render(
          <UpdateAuthorPopup
            toggleUpdateAuthorPopup={mockToggleUpdateAuthorPopup}
            fetchAuthors={mockFetchAuthors}
            authorId={authorId}
          />
        );
    
        // Fill the form fields with the data
        fireEvent.change(screen.getByTestId("first-name-input"), {
          target: { value: "John" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
          target: { value: "Doe" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
          target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByTestId("street-input"), {
          target: { value: "123 Main St" },
        });
        fireEvent.change(screen.getByTestId("city-input"), {
          target: { value: "New York" },
        });
        fireEvent.change(screen.getByTestId("country-input"), {
          target: { value: "USA" },
        });
        fireEvent.change(screen.getByTestId("nic-input"), {
          target: { value: "123-45-6789" },
        });
        fireEvent.change(screen.getByTestId("mobile-input"), {
          target: { value: "+1 (555) 555-5555" },
        });
    
        // Simulate form submission
        fireEvent.click(screen.getByTestId('submit-button'));
    
        // Wait for the API call
        await waitFor(() => {
          // Check if the API call is made with the correct data
          expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:5001/api/author/${authorId}`,
            {
              First_Name: "John",
              Last_Name: "Doe",
              Email: "john@example.com",
              Street: "123 Main St",
              City: "New York",
              Country: "USA",
              NIC: "123-45-6789",
              Mobile: "+1 (555) 555-5555",
              Address: "123 Main St, New York, USA",
            }
          );
        });
    
        // Check for error modal
        await waitFor(() => {
          expect(screen.getByTestId('notification-modal')).toBeInTheDocument();
          expect(screen.getByText('Failed to update author')).toBeInTheDocument();
        });
      });

    it("closes the modal on cancel", async () => {
        render(
        <UpdateAuthorPopup
            toggleUpdateAuthorPopup={mockToggleUpdateAuthorPopup}
            fetchAuthors={mockFetchAuthors}
            authorId={authorId}
        />
        );

        // Wrap the event in act to handle the state update
        act(() => {
            fireEvent.click(screen.getByTestId('cancel-button'));
        });

        await waitFor(() => {
            expect(mockToggleUpdateAuthorPopup).toHaveBeenCalled();
        });
        
    });
});
