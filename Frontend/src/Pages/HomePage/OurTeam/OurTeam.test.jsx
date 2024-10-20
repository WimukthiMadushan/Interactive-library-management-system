import { render, screen } from "@testing-library/react";
import OurTeam from "./OurTeam";
import { describe, it, expect } from "vitest";

describe("OurTeam Component", () => {
  it("renders the 'Our Team' section", () => {
    render(<OurTeam />);
    const teamSection = screen.getByTestId("team-section");
    expect(teamSection).toBeInTheDocument();
  });

  it("renders the header with title and description", () => {
    render(<OurTeam />);
    
    const teamHeader = screen.getByTestId("team-header");
    expect(teamHeader).toBeInTheDocument();
    
    const teamTitle = screen.getByTestId("team-title");
    expect(teamTitle).toHaveTextContent("Our Team");
    
    const teamDescription = screen.getByTestId("team-description");
    expect(teamDescription).toHaveTextContent(
      "Our team of passionate librarians and friendly receptionists work tirelessly to provide exceptional service and ensure our library is a welcoming and enriching space for all. From curating our diverse collection to assisting patrons with their research and lending needs, each member of our team plays a vital role in the success of our library."
    );
  });

  it("renders two librarians with correct information", () => {
    render(<OurTeam />);
    
    const librarian1 = screen.getByTestId("team-member-librarian-1");
    expect(librarian1).toBeInTheDocument();
    
    const librarian1Name = screen.getByTestId("name-librarian-1");
    expect(librarian1Name).toHaveTextContent("Olivia Martin");
    
    const librarian1Role = screen.getByTestId("role-librarian-1");
    expect(librarian1Role).toHaveTextContent("Librarian");
    
    const librarian2 = screen.getByTestId("team-member-librarian-2");
    expect(librarian2).toBeInTheDocument();
    
    const librarian2Name = screen.getByTestId("name-librarian-2");
    expect(librarian2Name).toHaveTextContent("Isabella Nguyen");
    
    const librarian2Role = screen.getByTestId("role-librarian-2");
    expect(librarian2Role).toHaveTextContent("Librarian");
  });

  it("renders five receptionists with correct information", () => {
    render(<OurTeam />);
    
    const receptionist1 = screen.getByTestId("team-member-receptionist-1");
    expect(receptionist1).toBeInTheDocument();
    expect(screen.getByTestId("name-receptionist-1")).toHaveTextContent("Sofia Davis");
    expect(screen.getByTestId("role-receptionist-1")).toHaveTextContent("Receptionist");
    
    const receptionist2 = screen.getByTestId("team-member-receptionist-2");
    expect(receptionist2).toBeInTheDocument();
    expect(screen.getByTestId("name-receptionist-2")).toHaveTextContent("Ethan Flores");
    expect(screen.getByTestId("role-receptionist-2")).toHaveTextContent("Receptionist");

    const receptionist3 = screen.getByTestId("team-member-receptionist-3");
    expect(receptionist3).toBeInTheDocument();
    expect(screen.getByTestId("name-receptionist-3")).toHaveTextContent("Ava Hernandez");
    expect(screen.getByTestId("role-receptionist-3")).toHaveTextContent("Receptionist");

    const receptionist4 = screen.getByTestId("team-member-receptionist-4");
    expect(receptionist4).toBeInTheDocument();
    expect(screen.getByTestId("name-receptionist-4")).toHaveTextContent("Liam Ramirez");
    expect(screen.getByTestId("role-receptionist-4")).toHaveTextContent("Receptionist");

    const receptionist5 = screen.getByTestId("team-member-receptionist-5");
    expect(receptionist5).toBeInTheDocument();
    expect(screen.getByTestId("name-receptionist-5")).toHaveTextContent("Emma Sanchez");
    expect(screen.getByTestId("role-receptionist-5")).toHaveTextContent("Receptionist");
  });
});
