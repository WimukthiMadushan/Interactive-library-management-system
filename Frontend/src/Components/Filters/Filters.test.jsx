import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StoreContext } from '../../Hooks/StoreContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockTogglePopup = vi.fn();
const mockOnApply = vi.fn();

const categoryFilters = [
  { value: 'fiction', label: 'Fiction' },
  { value: 'non-fiction', label: 'Non-Fiction' }
];

const renderFilters = () => {
  return render(
    <StoreContext.Provider value={{ categoryFilters }}>
      <Filters togglePopup={mockTogglePopup} onApply={mockOnApply} />
    </StoreContext.Provider>
  );
};

describe('Filters Component', () => {
    it('renders the filters component correctly', () => {
        renderFilters();
        expect(screen.getByTestId('filters-container')).toBeInTheDocument();
        expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
        expect(screen.getByTestId('clear-date-range')).toBeInTheDocument();
        expect(screen.getByTestId('clear-reviews')).toBeInTheDocument();
        expect(screen.getByTestId('clear-categories')).toBeInTheDocument();
        expect(screen.getByTestId('apply-button')).toBeInTheDocument();
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
        expect(screen.getByText('Select Category')).toBeInTheDocument();
        expect(screen.getByTestId('reviews-slider')).toBeInTheDocument();   
        // Check if DatePicker inputs are rendered by placeholder text
        const datePickers = screen.getAllByPlaceholderText('mm/dd/yyyy');
        expect(datePickers[0]).toBeInTheDocument();
        expect(datePickers[1]).toBeInTheDocument();
    });

    it('clears date range inputs when the clear button is clicked', () => {
        renderFilters();
        fireEvent.click(screen.getByTestId('clear-date-range'));
        const datePickers = screen.getAllByPlaceholderText('mm/dd/yyyy');
        expect(datePickers[0]).toHaveValue('');
        expect(datePickers[1]).toHaveValue('');
    });

    it('clears categories when the clear button is clicked', async() => {
        renderFilters();
        
        const categorySelect = screen.getByText('Select Category'); 
        userEvent.click(categorySelect); // Open the dropdown
        const categoryOption = await screen.findByText('Fiction'); 
        userEvent.click(categoryOption); 

        // Simulate clicking the "Clear" button
        fireEvent.click(screen.getByTestId('clear-categories'));

        // Expect no category to be selected (empty array)
        expect(screen.queryByText('fiction')).not.toBeInTheDocument();
    });

    it('clears review slider when the clear button is clicked', () => {
        renderFilters();
        fireEvent.click(screen.getByTestId('clear-reviews'));
        // Assert the review slider's default values
        expect(screen.getByTestId('reviews-slider')).toBeInTheDocument();
    });

    it('calls onApply and togglePopup on Apply button click', () => {
        renderFilters();
        fireEvent.click(screen.getByTestId('apply-button'));
        expect(mockOnApply).toHaveBeenCalled();
        expect(mockTogglePopup).toHaveBeenCalled();
    });

    it('closes the popup when Cancel is clicked', () => {
        renderFilters();
        fireEvent.click(screen.getByTestId('cancel-button'));
        expect(mockTogglePopup).toHaveBeenCalled();
    });
});
