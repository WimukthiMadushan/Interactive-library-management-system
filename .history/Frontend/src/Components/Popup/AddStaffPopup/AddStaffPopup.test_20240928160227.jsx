import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddStaffPopup from "./AddStaffPopup";
import axios from "axios";
import { describe, it, expect, vi } from 'vitest';

vi.mock("axios");

describe("AddStaffPopup", () => {
    const mockToggleAddPopup = vi.fn();
    
    const renderComponent = () => {
        render(<AddStaffPopup toggleAddPopup={mockToggleAddPopup} />);
    };

    it("renders the popup correctly", () => {
        renderComponent();
        expect(screen.getByTestId("add-staff-popup")).toBeInTheDocument();
        expect(screen.getByTestId("close-button")).toBeInTheDocument();
        expect(screen.getByTestId("staff-form")).toBeInTheDocument();
        expect(screen.getByTestId("user-id-input")).toBeInTheDocument();
        expect(screen.getByTestId("find-user-button")).toBeInTheDocument();
        expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
        expect(screen.getByTestId("last-name-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("role-select")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    it("closes the popup when the close button is clicked", () => {
        renderComponent();
        const closeButton = screen.getByTestId("close-button");
        fireEvent.click(closeButton);
        expect(mockToggleAddPopup).toHaveBeenCalled();
    });

    it("calls fetchUser when 'Find user' button is clicked", async () => {
        const mockData = { data: { message: "User retrieved successfully", First_Name: "John", Last_Name: "Doe", Email: "john@example.com" } };
        axios.get.mockResolvedValueOnce(mockData);

        renderComponent();

        const userIdInput = screen.getByTestId("user-id-input");
        fireEvent.change(userIdInput, { target: { value: "123" } });

        const findUserButton = screen.getByTestId("find-user-button");
        fireEvent.click(findUserButton);

        await waitFor(() => expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/user/123"));
        expect(screen.getByTestId("first-name-input").value).toBe("John");
        expect(screen.getByTestId("last-name-input").value).toBe("Doe");
        expect(screen.getByTestId("email-input").value).toBe("john@example.com");
    });

    it('displays success notification after successful form submission', async () => {
        // Mock the axios post request
        axios.post.mockResolvedValueOnce({ status: 201 });
    
        renderComponent();
    
        // Fill out the form inputs
        fireEvent.change(screen.getByTestId("user-id-input"), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByTestId("role-select"), {
            target: { value: "Administrator" },
        });
    
        // Simulate clicking the "Find user" button and mock axios GET request for user data
        const mockUserResponse = {
          data: {
            message: "User retrieved successfully",
            First_Name: "John",
            Last_Name: "Doe",
            Email: "john@example.com",
          },
        };
        axios.get.mockResolvedValueOnce(mockUserResponse);
    
        fireEvent.click(screen.getByTestId("find-user-button"));
    
        await waitFor(() => {
          expect(screen.getByTestId("first-name-input").value).toBe("John");
          expect(screen.getByTestId("last-name-input").value).toBe("Doe");
          expect(screen.getByTestId("email-input").value).toBe("john@example.com");
        });
    
        // Submit the form
        fireEvent.click(screen.getByTestId("submit-button"));
    
        // Wait for the axios post request and modal display
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:5000/api/user/addstaff",
            {
              User_ID: "123",
              Role: "Administrator",
            }
          );
          expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
          expect(screen.getByText("Staff Added Successfully.")).toBeInTheDocument();
        });
    });

    it("displays error notification on failed form submission", async () => {
        axios.post.mockRejectedValueOnce(new Error("Failed to add staff"));

        // Mock console.error to suppress error logging
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        renderComponent();

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
            expect(screen.getByText(/Failed to Add Staff./)).toBeInTheDocument();
        });

        // Restore console.error to its original implementation
        consoleErrorSpy.mockRestore();
    });
});
