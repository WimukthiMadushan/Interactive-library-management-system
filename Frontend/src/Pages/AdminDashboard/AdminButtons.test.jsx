import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AdminButtons from './AdminButtons';
import { describe, it, expect } from 'vitest';


describe('AdminButtons Component', () => {
    const renderComponent = () =>
        render(
        <BrowserRouter>
            <AdminButtons />
        </BrowserRouter>
        );

    it('should render the admin dashboard heading', () => {
        renderComponent();
        const dashboard = screen.getByTestId('admin-dashboard');
        expect(dashboard).toBeInTheDocument();
        expect(dashboard).toHaveTextContent('Admin Dashboard.');
    });

    it('should render all admin management cards', () => {
        renderComponent();

        expect(screen.getByTestId('author-card')).toBeInTheDocument();
        expect(screen.getByTestId('book-card')).toBeInTheDocument();
        expect(screen.getByTestId('user-card')).toBeInTheDocument();
        expect(screen.getByTestId('publisher-card')).toBeInTheDocument();
    });

    it('should have working links for all management sections', () => {
        renderComponent();

        expect(screen.getByTestId('author-link')).toHaveAttribute(
        'href',
        '/authormanagement'
        );
        expect(screen.getByTestId('book-link')).toHaveAttribute(
        'href',
        '/bookmanagement'
        );
        expect(screen.getByTestId('user-link')).toHaveAttribute(
        'href',
        '/usermanagement'
        );
        expect(screen.getByTestId('publisher-link')).toHaveAttribute(
        'href',
        '/publishermanagement'
        );
    });

    it('should render correct text for each management section', () => {
        renderComponent();
    
        expect(screen.getByText('Author Management')).toBeInTheDocument();
        expect(screen.getByText('Manage authors, their profiles, and published works.')).toBeInTheDocument();
    
        expect(screen.getByText('Book Management')).toBeInTheDocument();
        expect(screen.getByText('Manage books, their details, and publishing information.')).toBeInTheDocument();
    
        expect(screen.getByText('User Management')).toBeInTheDocument();
        expect(screen.getByText('Manage user accounts, roles, and permissions.')).toBeInTheDocument();
    
        expect(screen.getByText('Publisher Management')).toBeInTheDocument();
        expect(screen.getByText('Manage publishers, their details, and published books.')).toBeInTheDocument();
    });
    
});
