import React, { useContext } from "react";
import "../Css/Refprofile.css";
import NavBar from "./NavBar";
import RefProfModal from "./RefProfModal";
import { rolecontext } from "../App";
import NavBarTwo from "./NavBarTwo";

export default function RefProfile() {
  const role = useContext(rolecontext);
  return (
    <>
      <div className="ref-profile">
        <div id="navs">{role == "admin" ? <NavBar /> : <NavBarTwo />}</div>
        <div className="ref-modal">
          <RefProfModal />
        </div>
      </div>
    </>
  );
}
