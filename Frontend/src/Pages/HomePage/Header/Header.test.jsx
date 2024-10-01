import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header Component", () => {
  it("renders the header container", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const headerContainer = screen.getByTestId("header-container");
    expect(headerContainer).toBeInTheDocument();
  });

  it("renders the left section with heading and description", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const headerLeft = screen.getByTestId("header-left");
    expect(headerLeft).toBeInTheDocument();

    const heading = screen.getByTestId("header-h1");
    expect(heading).toHaveTextContent("You Deserve The Best Books");

    const description = screen.getByTestId("header-h5");
    expect(description).toHaveTextContent(
      "Being involved in education dedicatedly is a good meditation for years."
    );
  });

  it("renders the 'Search Books' button and link", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const searchBooksLink = screen.getByTestId("searchbooks-link");
    expect(searchBooksLink).toBeInTheDocument();
    expect(searchBooksLink).toHaveAttribute("href", "/searchbooks");

    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("Search Books");
  });

  it("renders the right section with book covers", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const headerRight = screen.getByTestId("header-right");
    expect(headerRight).toBeInTheDocument();

    const booksContainer = screen.getByTestId("books-container");
    expect(booksContainer).toBeInTheDocument();

    const bookImages = screen.getAllByRole("img");
    expect(bookImages.length).toBe(8); // Ensure there are 8 book covers

    bookImages.forEach((img, index) => {
      expect(img).toHaveAttribute("src", expect.stringContaining("Img_"));
      expect(img).toHaveAttribute("alt", `Book ${index + 1}`);
    });
  });
});
