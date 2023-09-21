import React from "react";
import NavBarTwo from "./NavBarTwo";
import TrainerProfModal from "./TrainerProfModal";

export default function TrainerProfile() {
  return (
    <>
      <div className="trainer-profile">
        <div id="navs">
          <NavBarTwo />
        </div>
        <div className="trainer-modal">
          <TrainerProfModal />
        </div>
      </div>
    </>
  );
}
