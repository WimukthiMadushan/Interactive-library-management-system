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
    <section className="team-section">
      <div className="container">
        <div className="team-header">
          <h2 className="team-title">Our Team</h2>
          <p className="team-description">
            Our team of passionate librarians and friendly receptionists work
            tirelessly to provide exceptional service and ensure our library is
            a welcoming and enriching space for all. From curating our diverse
            collection to assisting patrons with their research and lending
            needs, each member of our team plays a vital role in the success of
            our library.
          </p>
        </div>
        <div className="team-grid">
          {/* Librarians */}
          <div className="team-member">
            <img src={Librarian_01} alt="Olivia Martin" className="avatar" />
            <div className="member-info">
              <h3 className="name">Olivia Martin</h3>
              <p className="role">Librarian</p>
            </div>
          </div>
          <div className="team-member">
            <img src={Librarian_02} alt="Isabella Nguyen" className="avatar" />
            <div className="member-info">
              <h3 className="name">Isabella Nguyen</h3>
              <p className="role">Librarian</p>
            </div>
          </div>
        </div>
        <div className="team-grid">
          {/* Receptionists */}
          <div className="team-member">
            <img src={Reception_01} alt="Sofia Davis" className="avatar" />
            <div className="member-info">
              <h3 className="name">Sofia Davis</h3>
              <p className="role">Receptionist</p>
            </div>
          </div>
          <div className="team-member">
            <img src={Reception_02} alt="Ethan Flores" className="avatar" />
            <div className="member-info">
              <h3 className="name">Ethan Flores</h3>
              <p className="role">Receptionist</p>
            </div>
          </div>
          <div className="team-member">
            <img src={Reception_03} alt="Ava Hernandez" className="avatar" />
            <div className="member-info">
              <h3 className="name">Ava Hernandez</h3>
              <p className="role">Receptionist</p>
            </div>
          </div>
          <div className="team-member">
            <img src={Reception_04} alt="Liam Ramirez" className="avatar" />
            <div className="member-info">
              <h3 className="name">Liam Ramirez</h3>
              <p className="role">Receptionist</p>
            </div>
          </div>
          <div className="team-member">
            <img src={Reception_05} alt="Emma Sanchez" className="avatar" />
            <div className="member-info">
              <h3 className="name">Emma Sanchez</h3>
              <p className="role">Receptionist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
