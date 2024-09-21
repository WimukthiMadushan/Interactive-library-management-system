import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs";
import { describe, it, expect } from "vitest";

describe("AboutUs Component", () => {
  it("renders the main container", () => {
    render(<AboutUs />);
    const aboutUsContainer = screen.getByTestId("about-us-container");
    expect(aboutUsContainer).toBeInTheDocument();
  });

  it("renders the heading text correctly", () => {
    render(<AboutUs />);
    const heading = screen.getByTestId("about-us-heading");
    expect(heading).toHaveTextContent(
      "Improve the management system of your library"
    );
  });

  it("renders the first description text", () => {
    render(<AboutUs />);
    const description = screen.getByTestId("about-us-description");
    expect(description).toHaveTextContent(
      "Libreva stores every information electronically and in an organized and systematic way which leads to effective results."
    );
  });

  it("renders the Digital Book Inventory section", () => {
    render(<AboutUs />);
    const inventoryHeading = screen.getByTestId("about-us-inventory-heading");
    const inventoryDescription = screen.getByTestId(
      "about-us-inventory-description"
    );
    const inventoryImage = screen.getByTestId("about-us-image-1");

    expect(inventoryHeading).toHaveTextContent("Digital Book Inventory");
    expect(inventoryDescription).toHaveTextContent(
      "An inventory is the one method that libraries and archives use to determine whether some items in their collection are in need of preservation or conservation activities."
    );
    expect(inventoryImage).toBeInTheDocument();
  });

  it("renders the Search Books section", () => {
    render(<AboutUs />);
    const searchHeading = screen.getByTestId("about-us-search-heading");
    const searchDescription = screen.getByTestId("about-us-search-description");
    const searchImage = screen.getByTestId("about-us-image-2");

    expect(searchHeading).toHaveTextContent("Search Books");
    expect(searchDescription).toHaveTextContent(
      "Search the world's most comprehensive index of full-text books. It is a selective website featuring some of the best books published in the past 15 years."
    );
    expect(searchImage).toBeInTheDocument();
  });

  it("renders the Defaulters List section", () => {
    render(<AboutUs />);
    const defaultersHeading = screen.getByTestId(
      "about-us-defaulters-heading"
    );
    const defaultersDescription = screen.getByTestId(
      "about-us-defaulters-description"
    );
    const defaultersImage = screen.getByTestId("about-us-image-3");

    expect(defaultersHeading).toHaveTextContent("Defaulters List");
    expect(defaultersDescription).toHaveTextContent(
      "In this segment you can search the list of all the issuers whether they are students or staff members who have not returned their book even after the due date."
    );
    expect(defaultersImage).toBeInTheDocument();
  });
});
