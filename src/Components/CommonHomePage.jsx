import React from "react";
import NavBarTwo from "./NavBarTwo";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "../Css/HomePage.css";

export default function CommonHomePage() {
  return (
    <div className="home-page">
      <NavBarTwo />
      <div className="commonhome-card">
        <div className="commonhome-crd1">
          <div className="commonhome-count1">
            <h2>500</h2>
            <p>Total No. of Students</p>
          </div>
          <div className="commonhome-icon1">
            <SupervisorAccountIcon className="commonicon1" />
          </div>
        </div>
        <div className="commonhome-crd2">
          <div className="commonhome-count2">
            <h2>200</h2>
            <p>Total No. of Referrals</p>
          </div>
          <div className="commonhome-icon2">
            <BrowserUpdatedIcon className="commonicon2" />
          </div>
        </div>
        <div className="commonhome-crd3">
          <div className="commonhome-count3">
            <h2>400</h2>
            <p>No. of Students Placed</p>
          </div>
          <div className="commonhome-icon3">
            <WorkspacePremiumIcon className="commonicon3" />
          </div>
        </div>
      </div>
    </div>
  );
}
