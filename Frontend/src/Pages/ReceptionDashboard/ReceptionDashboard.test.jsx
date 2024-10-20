import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReceptionDashboard from "./ReceptionDashboard";
import { describe, it, expect } from "vitest";

describe("ReceptionDashboard Component", () => {
    it("renders the dashboard container", () => {
        render(
        <Router>
            <ReceptionDashboard />
        </Router>
        );
        const dashboardContainer = screen.getByTestId("dashboard-container");
        expect(dashboardContainer).toBeInTheDocument();
    });

    it("renders the dashboard title", () => {
        render(
        <Router>
            <ReceptionDashboard />
        </Router>
        );
        const dashboardTitle = screen.getByTestId("dashboard-title");
        expect(dashboardTitle).toHaveTextContent("Reception Dashboard.");
    });

    it("renders the borrow card with correct text and link", () => {
        render(
        <Router>
            <ReceptionDashboard />
        </Router>
        );
        const borrowTitle = screen.getByTestId("borrow-title");
        const borrowDescription = screen.getByTestId("borrow-description");
        const borrowLink = screen.getByTestId("borrow-link");

        expect(borrowTitle).toHaveTextContent("Borrow Books");
        expect(borrowDescription).toHaveTextContent(
        "You Can Manage book borrowing and returns."
        );
        expect(borrowLink).toHaveAttribute("href", "/borrowbookmanagement");
    });

    it("renders the reservation card with correct text and link", () => {
        render(
        <Router>
            <ReceptionDashboard />
        </Router>
        );
        const reservationTitle = screen.getByTestId("reservation-title");
        const reservationDescription = screen.getByTestId("reservation-description");
        const reservationLink = screen.getByTestId("reservation-link");

        expect(reservationTitle).toHaveTextContent("Reservation Books");
        expect(reservationDescription).toHaveTextContent(
        "Manage book reservations and appointments."
        );
        expect(reservationLink).toHaveAttribute("href", "/reseravtionbookmanagment");
    });

    it("renders the borrow and reservation icons", () => {
        render(
        <Router>
            <ReceptionDashboard />
        </Router>
        );
        const borrowIcon = screen.getByTestId("borrow-icon");
        const reservationIcon = screen.getByTestId("reservation-icon");

        expect(borrowIcon).toBeInTheDocument();
        expect(reservationIcon).toBeInTheDocument();
    });
});
