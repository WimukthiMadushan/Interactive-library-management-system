import { describe,it } from "vitest";
import { render,screen, fireEvent  } from "@testing-library/react";
import PaginationButtons from "./PaginationButtons";

describe("PaginationButtons", () => {

    // Test the rendering of the buttons
    describe("Buttons renders correctly", () => {
        it('renders 5 buttons in middle pages', () => {
            render(<PaginationButtons currentPage={3} totalPages={5} onPageChange={() => {}} />);
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(5);

            // check prev and next buttons are not disabled
            const prevButton = screen.getByTestId('prev-button');
            const nextButton = screen.getByTestId('next-button');
            expect(prevButton).not.toBeDisabled(); 
            expect(nextButton).not.toBeDisabled();
        }); 

        it('No prev button on first 2 pages', () => {
            render(<PaginationButtons currentPage={2} totalPages={5} onPageChange={() => {}} />);
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(4); 
        });

        it('No next button on last 2 pages', () => {
            render(<PaginationButtons currentPage={4} totalPages={5} onPageChange={() => {}} />);
            const buttons = screen.getAllByRole('button');

            buttons.forEach((button, index) => {
                console.log(`Button ${index + 1}:`, {
                  textContent: button.textContent,
                  dataset: button.dataset,
                  testId: button.getAttribute('data-testid')
                });
            });
            expect(buttons).toHaveLength(4); 
        });
    });
    
    // Test the previous and next buttons
    describe('Previous and Next Button Behaviors', () => {     
        it('calls onPageChange with the correct value when "Prev" button is clicked', () => {
            const onPageChangeMock = vi.fn();
            render(<PaginationButtons currentPage={3} totalPages={8} onPageChange={onPageChangeMock} />);
            const prevButton = screen.getByTestId('prev-button');
            fireEvent.click(prevButton);
            expect(onPageChangeMock).toHaveBeenCalledWith(2);
        });

        it('calls onPageChange with the correct value when "Next" button is clicked', () => {
            const onPageChangeMock = vi.fn();
            render(<PaginationButtons currentPage={3} totalPages={8} onPageChange={onPageChangeMock} />);
            const nextButton = screen.getByTestId('next-button');
            fireEvent.click(nextButton);
            expect(onPageChangeMock).toHaveBeenCalledWith(4);
        });
    });

    // Test the page number buttons
    describe('Page Number Buttons', () => {
        it('renders correct page numbers', () => {
            render(<PaginationButtons currentPage={4} totalPages={8} onPageChange={() => {}} />);
            
            const pageButton1 = screen.getByTestId('page-button-3');
            const pageButton2 = screen.getByTestId('page-button-4');
            const pageButton3 = screen.getByTestId('page-button-5');
            
            expect(pageButton1).toBeInTheDocument();
            expect(pageButton2).toBeInTheDocument();
            expect(pageButton3).toBeInTheDocument();
        });
      
        it('adds active class to the current page button', () => {
            render(<PaginationButtons currentPage={3} totalPages={5} onPageChange={() => {}} />);
            const currentPageButton = screen.getByTestId('page-button-3');
            expect(currentPageButton).toHaveClass('active');
        });
      
        it('calls onPageChange with the correct page number when a page button is clicked', () => {
            const onPageChangeMock = vi.fn();
            render(<PaginationButtons currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
            
            const pageButton3 = screen.getByTestId('page-button-3');
            fireEvent.click(pageButton3);
            expect(onPageChangeMock).toHaveBeenCalledWith(3);
        });
    });

    // Test edge cases
    describe('Edge Cases', () => {
        it('renders no extra buttons when there are fewer pages than maxButtonsToShow', () => {
            render(<PaginationButtons currentPage={2} totalPages={2} onPageChange={() => {}} />);
            const buttons = screen.getAllByRole('button');
            
            expect(buttons).toHaveLength(2); // 1 page button + Next button (no Prev button)
        });
      
        it('does not show "Prev" or "Next" buttons when totalPages less than 4', () => {
          render(<PaginationButtons currentPage={2} totalPages={3} onPageChange={() => {}} />);
          expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
          expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
        });
    });

    // Test state changes
    describe('State Changes', () => {
        it('updates buttons correctly when props change', () => {
            const { rerender } = render(<PaginationButtons currentPage={1} totalPages={8} onPageChange={() => {}} />);
          
            // Initially, buttons for pages 1, 2, 3 should be rendered
            expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
            expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
            expect(screen.getByTestId('page-button-3')).toBeInTheDocument();

            // Change the currentPage to 4 and check the updated buttons
            rerender(<PaginationButtons currentPage={4} totalPages={8} onPageChange={() => {}} />);
            expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
            expect(screen.getByTestId('page-button-4')).toBeInTheDocument();
            expect(screen.getByTestId('page-button-5')).toBeInTheDocument();
           
        });
      });
});