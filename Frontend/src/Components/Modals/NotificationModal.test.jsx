import { render, screen, fireEvent } from '@testing-library/react';
import NotificationModal from './NotificationModal';
import { vi } from 'vitest';

describe('NotificationModal Component', () => {
  it('renders with correct title and message when show is true', () => {
    render(
      <NotificationModal
        show={true}
        handleClose={() => {}}
        title="Success"
        message="Author added successfully!"
        isSuccess={true}
      />
    );

    // Ensure title and message are rendered
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Author added successfully!')).toBeInTheDocument();

    // Ensure button text is "OK" for success
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders with "Close" button for failure', () => {
    render(
      <NotificationModal
        show={true}
        handleClose={() => {}}
        title="Error"
        message="Failed to add author!"
        isSuccess={false}
      />
    );

    // Ensure title and message are rendered
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to add author!')).toBeInTheDocument();

    // Ensure button text is "Close" for failure
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(
      <NotificationModal
        show={false}
        handleClose={() => {}}
        title="Success"
        message="Author added successfully!"
        isSuccess={true}
      />
    );

    // Modal should not be visible when show is false
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.queryByText('Author added successfully!')).not.toBeInTheDocument();
  });

  it('calls handleClose when the button is clicked', () => {
    const handleCloseMock = vi.fn();

    render(
      <NotificationModal
        show={true}
        handleClose={handleCloseMock}
        title="Success"
        message="Author added successfully!"
        isSuccess={true}
      />
    );

    const button = screen.getByText('OK');
    fireEvent.click(button);

    // Ensure handleClose is called
    expect(handleCloseMock).toHaveBeenCalled();
  });

  it('renders with correct button variant based on isSuccess prop', () => {
    // Success case
    const { rerender } = render(
      <NotificationModal
        show={true}
        handleClose={() => {}}
        title="Success"
        message="Author added successfully!"
        isSuccess={true}
      />
    );
    
    let button = screen.getByText('OK');
    expect(button).toHaveClass('btn-success'); // Check if it's a success button

    // Failure case
    rerender(
      <NotificationModal
        show={true}
        handleClose={() => {}}
        title="Error"
        message="Failed to add author!"
        isSuccess={false}
      />
    );

    button = screen.getByText('Close');
    expect(button).toHaveClass('btn-danger'); // Check if it's a danger button
  });
});
