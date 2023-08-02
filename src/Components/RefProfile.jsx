import React from 'react'
import "../Css/Refprofile.css";
import NavBar from './NavBar';
import RefProfModal from './RefProfModal';

export default function RefProfile() {

  return(
    <>
        <div className="ref-profile">
            <div id="navs">
                <NavBar  />
            </div>
            <div className="ref-modal">
                <RefProfModal />
            </div>
        </div>
    </>
  );
}
