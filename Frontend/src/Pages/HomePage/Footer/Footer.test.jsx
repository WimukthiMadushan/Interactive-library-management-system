import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("renders the footer component", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders the InfoPulse Library section with the correct links", () => {
    render(<Footer />);
    const infoSection = screen.getByTestId("footer-section-info");
    expect(infoSection).toBeInTheDocument();

    const privacyLink = screen.getByTestId("footer-link-privacy");
    const termsLink = screen.getByTestId("footer-link-terms");
    const borrowingLink = screen.getByTestId("footer-link-borrowing");

    expect(privacyLink).toHaveTextContent("Privacy Policy");
    expect(termsLink).toHaveTextContent("Terms of Service");
    expect(borrowingLink).toHaveTextContent("Borrowing Policy");
  });

  it("renders the contact section with the correct text", () => {
    render(<Footer />);
    const contactSection = screen.getByTestId("footer-section-contact");
    expect(contactSection).toBeInTheDocument();

    const contactText = screen.getByTestId("footer-text-contact");
    expect(contactText).toHaveTextContent("123 Main St, Anytown USA");
    expect(contactText).toHaveTextContent("Phone: (555) 555-5555");
    expect(contactText).toHaveTextContent("Email: info@infopulselibrary.com");
  });

  it("renders the social media links", () => {
    render(<Footer />);

    const facebookLink = screen.getByTestId("footer-link-facebook");
    const twitterLink = screen.getByTestId("footer-link-twitter");
    const instagramLink = screen.getByTestId("footer-link-instagram");

    expect(facebookLink).toHaveTextContent("Facebook");
    expect(twitterLink).toHaveTextContent("Twitter");
    expect(instagramLink).toHaveTextContent("Instagram");
  });

  it("renders the about section with the correct text", () => {
    render(<Footer />);
    const aboutSection = screen.getByTestId("footer-section-about");
    expect(aboutSection).toBeInTheDocument();

    const aboutText = screen.getByTestId("footer-text-about");
    expect(aboutText).toHaveTextContent(
      "Our InfoPulse Library has been serving the community for over 50 years."
    );
    expect(aboutText).toHaveTextContent(
      "We are dedicated to providing access to knowledge and resources for all."
    );
  });

  it("renders the footer bottom text", () => {
    render(<Footer />);
    const footerBottom = screen.getByTestId("footer-bottom");
    expect(footerBottom).toBeInTheDocument();
    expect(footerBottom).toHaveTextContent("© 2024 InfoPulse Library. All rights reserved.");
  });
});
