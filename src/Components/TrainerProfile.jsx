import React from "react";
import NavBar from "./NavBar";
import TrainerProfModal from "./TrainerProfModal";

export default function TrainerProfile() {
  return (
    <>
      <div className="trainer-profile">
        <div id="navs">
          <NavBar />
        </div>
        <div className="trainer-modal">
          <TrainerProfModal />
        </div>
      </div>
    </>
  );
}
