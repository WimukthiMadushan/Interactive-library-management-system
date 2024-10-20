import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from './Tabs';
import { describe, it, expect, vi } from 'vitest';

describe('Tabs Component', () => {
    it('should render both tabs', () => {
        render(<Tabs activeTab="users" setActiveTab={vi.fn()} />);

        const usersTab = screen.getByTestId('tab-users');
        const staffTab = screen.getByTestId('tab-staff');

        expect(usersTab).toBeInTheDocument();
        expect(staffTab).toBeInTheDocument();
    });

    it('should set active class on the correct tab', () => {
        const { rerender } = render(<Tabs activeTab="users" setActiveTab={vi.fn()} />);

        const usersTab = screen.getByTestId('tab-users');
        const staffTab = screen.getByTestId('tab-staff');

        expect(usersTab).toHaveClass('active');
        expect(staffTab).not.toHaveClass('active');

        rerender(<Tabs activeTab="staff" setActiveTab={vi.fn()} />);

        expect(usersTab).not.toHaveClass('active');
        expect(staffTab).toHaveClass('active');
    });

    it('should call setActiveTab when clicking on a tab', () => {
        const setActiveTab = vi.fn();
        render(<Tabs activeTab="users" setActiveTab={setActiveTab} />);

        const staffTab = screen.getByTestId('tab-staff');
        fireEvent.click(staffTab);

        expect(setActiveTab).toHaveBeenCalledWith('staff');
    });
});
