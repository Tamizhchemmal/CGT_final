import React, { useEffect } from "react";
import "../Css/Trainerhome.css";
import NavBarTwo from "./NavBarTwo";
import "../Css/Referralstyle.css";
import { Container } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";

function HomeTrainer() {
  return (
    <>
      <NavBarTwo />

      <div className="crd-bg">
        <div className="card-refdetails">
          <Container>
            <div className="head-ref">
              <div id="heading-ref">Trainer Name:</div>
            </div>
            <hr></hr>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HomeTrainer;
