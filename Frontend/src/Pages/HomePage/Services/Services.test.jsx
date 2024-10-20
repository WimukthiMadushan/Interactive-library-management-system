import { render, screen } from "@testing-library/react";
import Services from "./Services";
import { describe, it, expect } from "vitest";

describe("Services Component", () => {
    it("renders the 'Our Services' section", () => {
        render( < Services / > );
        const servicesSection = screen.getByTestId("services-section");
        expect(servicesSection).toBeInTheDocument();
    });

    it("renders the services header with title and description", () => {
        render( < Services / > );

        const servicesHeader = screen.getByTestId("services-header");
        expect(servicesHeader).toBeInTheDocument();

        const servicesTitle = screen.getByTestId("services-title");
        expect(servicesTitle).toHaveTextContent("Our Services");

        const servicesDescription = screen.getByTestId("services-description");
        expect(servicesDescription).toHaveTextContent(
            "Discover our comprehensive library services, designed to help you effortlessly find, borrow, and manage the books you love. From our extensive collection to convenient reservation and update features, we're here to enhance your reading experience."
        );
    });

    it("renders the service cards with correct icons, titles, and descriptions", () => {
        render(<Services />);
    
        const serviceCards = screen.getAllByTestId("service-card");
        
        // Test for Search Books card
        expect(serviceCards[0]).toBeInTheDocument();
        expect(screen.getByTestId("icon-search")).toBeInTheDocument();
        expect(serviceCards[0]).toHaveTextContent("Search Books");
        expect(serviceCards[0]).toHaveTextContent("Easily navigate our extensive collection to find the perfect books for your reading pleasure.");
    
        // Test for Borrow Books card
        expect(serviceCards[1]).toBeInTheDocument();
        expect(screen.getByTestId("icon-borrow")).toBeInTheDocument();
        expect(serviceCards[1]).toHaveTextContent("Borrow Books");
        expect(serviceCards[1]).toHaveTextContent("Enjoy the convenience of borrowing books from our library and reading them at your own pace.");
    
        // Test for Reserve Books card
        expect(serviceCards[2]).toBeInTheDocument();
        expect(screen.getByTestId("icon-reserve")).toBeInTheDocument();
        expect(serviceCards[2]).toHaveTextContent("Reserve Books");
        expect(serviceCards[2]).toHaveTextContent("Secure your access to the books you need by reserving them in advance, ensuring they're available when you're ready to read.");
    
        // Test for Update Books Available card
        expect(serviceCards[3]).toBeInTheDocument();
        expect(screen.getByTestId("icon-update")).toBeInTheDocument();
        expect(serviceCards[3]).toHaveTextContent("Update Books Available");
        expect(serviceCards[3]).toHaveTextContent("Stay informed about the latest additions to our library's collection, so you can discover new and exciting reads.");
    });
});
