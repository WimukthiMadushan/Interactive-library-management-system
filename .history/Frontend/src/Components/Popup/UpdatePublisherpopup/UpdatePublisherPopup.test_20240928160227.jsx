import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UpdatePublisherPopup from "./UpdatePublisherPopup";

vi.mock("axios");

const mockToggleUpdatePopup = vi.fn();
const mockFetchPublishers = vi.fn();

describe("UpdatePublisherPopup", () => {
    const publisherId = 1;

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                Publisher_First_Name: "John",
                Publisher_Last_Name: "Doe",
                Email: "john@example.com",
                Address: "123 Main St",
                Mobile: "+1 (555) 555-5555",
            },
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the popup with correct data", async () => {
        
        render(
            <UpdatePublisherPopup
                toggleUpdatePopup={mockToggleUpdatePopup}
                fetchPublishers={mockFetchPublishers}
                publisherId={publisherId}
            />
        );

        await waitFor(() => {
            expect(screen.getByTestId("popup-overlay")).toBeInTheDocument();
            expect(screen.getByTestId("close-button")).toBeInTheDocument();
            expect(screen.getByTestId("update-form")).toBeInTheDocument();
            expect(screen.getByTestId("first-name-input").value).toBe("John");
            expect(screen.getByTestId("last-name-input").value).toBe("Doe");
            expect(screen.getByTestId("email-input").value).toBe("john@example.com");
            expect(screen.getByTestId("address-input").value).toBe("123 Main St");
            expect(screen.getByTestId("mobile-input").value).toBe("+1 (555) 555-5555");
            expect(screen.getByTestId("submit-button")).toBeInTheDocument();
        });
    });


    it("fetches and populates publisher details when publisherId is provided", async () => {
        const mockPublisherData = {
            Publisher_ID: 1,
            Publisher_First_Name: "Alice",
            Publisher_Last_Name: "Smith",
            Email: "alice@example.com",
            Address: "456 Elm St",
            Mobile: "+1 (555) 123-4567",
        };
      
        axios.get.mockResolvedValueOnce({ data: mockPublisherData });
      
        render(
            <UpdatePublisherPopup
                toggleUpdatePopup={mockToggleUpdatePopup}
                fetchPublishers={mockFetchPublishers}
                publisherId={mockPublisherData.Publisher_ID}
            />
        );
      
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                `http://localhost:5000/api/publisher/${mockPublisherData.Publisher_ID}`
            );
        });
      
        expect(screen.getByTestId("first-name-input")).toHaveValue("Alice");
        expect(screen.getByTestId("last-name-input")).toHaveValue("Smith");
        expect(screen.getByTestId("email-input")).toHaveValue("alice@example.com");
        expect(screen.getByTestId("address-input")).toHaveValue("456 Elm St");
        expect(screen.getByTestId("mobile-input")).toHaveValue("+1 (555) 123-4567");
      });
      


    it("submits the form and shows success modal on successful API call", async () => {
        axios.put.mockResolvedValueOnce({ status: 200 });

        render(
        <UpdatePublisherPopup
            toggleUpdatePopup={mockToggleUpdatePopup}
            fetchPublishers={mockFetchPublishers}
            publisherId={publisherId}
        />
        );

        fireEvent.change(screen.getByTestId("first-name-input"), {
            target: { value: "Ryder" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
            target: { value: "Black" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "ryder@example.com" },
        });
        fireEvent.change(screen.getByTestId("address-input"), {
            target: { value: "456 Main St" },
        });
        fireEvent.change(screen.getByTestId("mobile-input"), {
            target: { value: "+1 (333) 333-3333" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                `http://localhost:5000/api/publisher/`,
                expect.objectContaining({
                Publisher_First_Name: "Ryder",
                Publisher_Last_Name: "Black",
                Email: "ryder@example.com",
                Address: "456 Main St",
                Mobile: "+1 (333) 333-3333",
                })
            );
            expect(mockFetchPublishers).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
            expect(screen.getByText("Publisher Updated Successfully.")).toBeInTheDocument();
        });
    });

    it("shows error modal on API call failure", async () => {
        axios.put.mockRejectedValueOnce(new Error("Failed to update"));

        // Mock console.error to suppress error logging
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
        <UpdatePublisherPopup
            toggleUpdatePopup={mockToggleUpdatePopup}
            fetchPublishers={mockFetchPublishers}
            publisherId={publisherId}
        />
        );

        fireEvent.change(screen.getByTestId("first-name-input"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByTestId("address-input"), {
            target: { value: "123 Main St" },
        });
        fireEvent.change(screen.getByTestId("mobile-input"), {
            target: { value: "+1 (555) 555-5555" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
            expect(screen.getByText("Failed to Update Publisher.")).toBeInTheDocument();
        });

        // Restore console.error to its original implementation
        consoleErrorSpy.mockRestore();
    });

    it("closes the popup on cancel",async () => {
        render(
        <UpdatePublisherPopup
            toggleUpdatePopup={mockToggleUpdatePopup}
            fetchPublishers={mockFetchPublishers}
            publisherId={publisherId}
        />
        );

        fireEvent.click(screen.getByTestId("close-button"));

        await waitFor(() => {
            expect(mockToggleUpdatePopup).toHaveBeenCalled();
        });
    });

    it("does not submit the form if required fields are empty", async () => {
        render(
            <UpdatePublisherPopup
                toggleUpdatePopup={mockToggleUpdatePopup}
                fetchPublishers={mockFetchPublishers}
                publisherId={publisherId}
            />
        );
      
        // Clear the input fields
        fireEvent.change(screen.getByTestId("first-name-input"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "" },
        });
      
        fireEvent.click(screen.getByTestId("submit-button"));
      
        await waitFor(() => {
            expect(axios.put).not.toHaveBeenCalled(); // Ensure that the API call is not made
        });
      
        expect(screen.queryByTestId("success-modal")).not.toBeInTheDocument();
    });

    
    it("closes the success modal after successful submission", async () => {
        axios.put.mockResolvedValueOnce({ status: 200 });
      
        render(
            <UpdatePublisherPopup
                toggleUpdatePopup={mockToggleUpdatePopup}
                fetchPublishers={mockFetchPublishers}
                publisherId={publisherId}
            />
        );
      
        fireEvent.change(screen.getByTestId("first-name-input"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByTestId("last-name-input"), {
          target: { value: "Doe" },
        });
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByTestId("address-input"), {
            target: { value: "123 Main St" },
        });
        fireEvent.change(screen.getByTestId("mobile-input"), {
            target: { value: "+1 (555) 555-5555" },
        });
      
        fireEvent.click(screen.getByTestId("submit-button"));
      
        await waitFor(() => {
            expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
        });
      
        // Close the success modal
        fireEvent.click(screen.getByTestId("notification-modal").querySelector("button"));
      
        await waitFor(() => {
            expect(screen.queryByTestId("notification-modal")).not.toBeInTheDocument();
        });
    });
});