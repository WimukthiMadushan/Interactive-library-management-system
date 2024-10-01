import React from "react";
import "./OurTeam.css";
import Librarian_01 from "./../../../Images/Librarian_01.jpg";
import Librarian_02 from "./../../../Images/Librarian_02.jpg";
import Reception_01 from "./../../../Images/Reception_01.jpg";
import Reception_02 from "./../../../Images/Reception_02.jpg";
import Reception_03 from "./../../../Images/Reception_03.jpg";
import Reception_04 from "./../../../Images/Reception_04.jpg";
import Reception_05 from "./../../../Images/Reception_05.jpg";

function OurTeam() {
  return (
    <section className="team-section" data-testid="team-section">
      <div className="our-team-container" data-testid="our-team-container">
        <div className="team-header" data-testid="team-header">
          <h2 className="team-title" data-testid="team-title">Our Team</h2>
          <p className="team-description" data-testid="team-description">
            Our team of passionate librarians and friendly receptionists work
            tirelessly to provide exceptional service and ensure our library is
            a welcoming and enriching space for all. From curating our diverse
            collection to assisting patrons with their research and lending
            needs, each member of our team plays a vital role in the success of
            our library.
          </p>
        </div>
        <div className="team-grid" data-testid="team-grid-librarians">
          {/* Librarians */}
          <div className="team-member" data-testid="team-member-librarian-1">
            <img src={Librarian_01} alt="Olivia Martin" className="avatar" data-testid="avatar-librarian-1" />
            <div className="member-info">
              <h3 className="name" data-testid="name-librarian-1">Olivia Martin</h3>
              <p className="role" data-testid="role-librarian-1">Librarian</p>
            </div>
          </div>
          <div className="team-member" data-testid="team-member-librarian-2">
            <img src={Librarian_02} alt="Isabella Nguyen" className="avatar" data-testid="avatar-librarian-2" />
            <div className="member-info">
              <h3 className="name" data-testid="name-librarian-2">Isabella Nguyen</h3>
              <p className="role" data-testid="role-librarian-2">Librarian</p>
            </div>
          </div>
        </div>
        <div className="team-grid" data-testid="team-grid-receptionists">
          {/* Receptionists */}
          <div className="team-member" data-testid="team-member-receptionist-1">
            <img src={Reception_01} alt="Sofia Davis" className="avatar" data-testid="avatar-receptionist-1" />
            <div className="member-info">
              <h3 className="name" data-testid="name-receptionist-1">Sofia Davis</h3>
              <p className="role" data-testid="role-receptionist-1">Receptionist</p>
            </div>
          </div>
          <div className="team-member" data-testid="team-member-receptionist-2">
            <img src={Reception_02} alt="Ethan Flores" className="avatar" data-testid="avatar-receptionist-2" />
            <div className="member-info">
              <h3 className="name" data-testid="name-receptionist-2">Ethan Flores</h3>
              <p className="role" data-testid="role-receptionist-2">Receptionist</p>
            </div>
          </div>
          <div className="team-member" data-testid="team-member-receptionist-3">
            <img src={Reception_03} alt="Ava Hernandez" className="avatar" data-testid="avatar-receptionist-3" />
            <div className="member-info">
              <h3 className="name" data-testid="name-receptionist-3">Ava Hernandez</h3>
              <p className="role" data-testid="role-receptionist-3">Receptionist</p>
            </div>
          </div>
          <div className="team-member" data-testid="team-member-receptionist-4">
            <img src={Reception_04} alt="Liam Ramirez" className="avatar" data-testid="avatar-receptionist-4" />
            <div className="member-info">
              <h3 className="name" data-testid="name-receptionist-4">Liam Ramirez</h3>
              <p className="role" data-testid="role-receptionist-4">Receptionist</p>
            </div>
          </div>
          <div className="team-member" data-testid="team-member-receptionist-5">
            <img src={Reception_05} alt="Emma Sanchez" className="avatar" data-testid="avatar-receptionist-5" />
            <div className="member-info">
              <h3 className="name" data-testid="name-receptionist-5">Emma Sanchez</h3>
              <p className="role" data-testid="role-receptionist-5">Receptionist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
