import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AuthorManagment from "../Pages/AuthorManagment/AuthorManagment.jsx";
import '@testing-library/jest-dom'
import {act} from 'react-dom/test-utils';


jest.mock("axios");
jest.mock("../Components/Pagination/PaginationButtons/PaginationButtons.jsx", () => () => <div>PaginationButtons</div>);
jest.mock("../Components/Popup/AddAuthorPopup/AddAuthorPopup.jsx", () => () => <div>AddAuthorPopup</div>);
jest.mock("../Components/Popup/UpdataAuthorPopup/UpdateAuthorPopup.jsx", () => () => <div>UpdateAuthorPopup</div>);
jest.mock("../Components/Modals/NotificationModal.jsx", () => ({ show, handleClose, title, message }) =>
  show ? <div>{title}: {message}</div> : null
);

// Test to check if the Author Management component renders correctly
test("renders Author Management component", () => {
  render(<AuthorManagment />);

  // Verify that the main elements are present in the document
  expect(screen.getByText("Author Management")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search authors...")).toBeInTheDocument();
  expect(screen.getByText("Add Author")).toBeInTheDocument();
});


test("fetches authors on component load", async () => {
  // Mock the axios GET request to return a list of authors
  axios.get.mockResolvedValueOnce({
    data: [
      {
        Author_ID: 1,
        First_Name: "John",
        Last_Name: "Doe",
        Email: "john@example.com",
        Address: "123 Main St",
        Mobile: "+1 (555) 555-5555",
        NIC: "123456789",
      },
    ],
  });

  // Render the component
  await act(async () => {
    render(<AuthorManagment />);
  });

  // Wait for the axios GET request to be called
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  }, { timeout: 10000 }); // Increased timeout to 10 seconds

  // Check if author data is displayed
  expect(screen.getByText("John")).toBeInTheDocument();
}, 10000); // Increase the test timeout to 10 seconds




// Test to check if the search functionality filters authors correctly
test("handles search query", async () => {
  // Mock the axios GET request to return a list of authors
  axios.get.mockResolvedValueOnce({
    data: [
      { Author_ID: 1, First_Name: "John", Last_Name: "Doe", Email: "john@example.com" },
      { Author_ID: 2, First_Name: "Jane", Last_Name: "Smith", Email: "jane@example.com" },
    ],
  });

  render(<AuthorManagment />);

  // Simulate a search query input
  fireEvent.change(screen.getByPlaceholderText("Search authors..."), {
    target: { value: "Jane" },
  });

  // Wait for the filter to take effect and check if the correct author is displayed
  await waitFor(() => expect(screen.getByText("Jane")).toBeInTheDocument());
  
  // Verify that the other author is not displayed
  expect(screen.queryByText("John")).toBeNull();
});

// Test to check if an author can be deleted and the success message is displayed
test("handles delete author", async () => {
  // Mock the axios GET request to return a list of authors
  axios.get.mockResolvedValueOnce({
    data: [{ Author_ID: 1, First_Name: "John", Last_Name: "Doe", Email: "john@example.com" }],
  });

  // Mock the axios DELETE request to simulate successful deletion
  axios.delete.mockResolvedValueOnce({});

  render(<AuthorManagment />);

  // Simulate clicking the delete button
  fireEvent.click(screen.getByText("Delete"));

  // Wait for the DELETE request to be called and check if the success message is displayed
  await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));

  // Verify that the success message is displayed
  expect(screen.getByText("sucess: Author Deleted Successfully.")).toBeInTheDocument();
});

// Test to check if the Add Author popup is toggled when the button is clicked
test("handles add author popup toggle", () => {
  render(<AuthorManagment />);

  // Simulate clicking the "Add Author" button
  fireEvent.click(screen.getByText("Add Author"));

  // Verify that the AddAuthorPopup component is displayed
  expect(screen.getByText("AddAuthorPopup")).toBeInTheDocument();
});

// Test to check if the Update Author popup is toggled when the update button is clicked
test("handles update author popup toggle", async () => {
  // Mock the axios GET request to return a list of authors
  axios.get.mockResolvedValueOnce({
    data: [{ Author_ID: 1, First_Name: "John", Last_Name: "Doe", Email: "john@example.com" }],
  });

  render(<AuthorManagment />);

  // Wait for the component to render and display the update button
  await waitFor(() => expect(screen.getByText("Update")).toBeInTheDocument());

  // Simulate clicking the "Update" button
  fireEvent.click(screen.getByText("Update"));

  // Verify that the UpdateAuthorPopup component is displayed
  expect(screen.getByText("UpdateAuthorPopup")).toBeInTheDocument();
});