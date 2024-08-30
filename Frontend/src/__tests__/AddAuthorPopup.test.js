import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddAuthorPopup from '../Components/Popup/AddAuthorPopup/AddAuthorPopup';
import '@testing-library/jest-dom'

// Mock the axios library
jest.mock('axios');

describe('AddAuthorPopup Component', () => {
  const mockToggleAddAuthorPopup = jest.fn();
  const mockFetchAuthors = jest.fn();

  beforeEach(() => {
    render(<AddAuthorPopup toggleAddAuthorPopup={mockToggleAddAuthorPopup} fetchAuthors={mockFetchAuthors} />);
  });

  test('renders the component correctly', () => {
    // Check if the header is present
    expect(screen.getByText('Add New Author')).toBeInTheDocument();
    // Check if the form fields are present
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(firstNameInput.value).toBe('John');
  });

  

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Street'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'United States' } });
    fireEvent.change(screen.getByLabelText('NIC Number'), { target: { value: '123-45-6789' } });
    fireEvent.change(screen.getByLabelText('Mobile Number'), { target: { value: '+1 (555) 555-5555' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockFetchAuthors).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Author added successfully!')).toBeInTheDocument();
  });



  test('checks if axios.post is called on form submission', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));
  
    fireEvent.click(screen.getByText('Save'));
  
    expect(axios.post).toHaveBeenCalled();
  });
  


  test('closes the popup on cancel', () => {
    fireEvent.click(screen.getByText('Cancel'));

    expect(mockToggleAddAuthorPopup).toHaveBeenCalledTimes(1);
  });
});
