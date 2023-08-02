import React from "react";
import "../Css/NavBar.css";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import ThreePIcon from "@mui/icons-material/ThreeP";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBars, setShowbars] = useState(true);
  const navigate = useNavigate();

  const HandleOpen = () => {
    setShowSidebar(true);
    setShowbars(false);
  };
  const HandleClose = () => {
    setShowSidebar(false);
    setShowbars(true);
  };

  return (
    <>
      <AppBar position="sticky">
        <div className="nav-bar">
          <div className="nav-logo">
            <div>Career</div>
            <div>Guidance Technology</div>
          </div>
          <div className="nav-btn">
            <ul className="btn-list">
              <li>
                <Button
                  variant="text"
                 
                  className="navbtn-icon"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                 
                  className="navbtn-icon"
                  onClick={() => {
                    navigate("/referralpage");
                  }}
                >
                  Referral
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                 
                  className="navbtn-icon"
                  onClick={() => {
                    navigate("/studentpage");
                  }}
                >
                  Student
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                 
                  className="navbtn-icon"
                  onClick={() => {
                    navigate("/trainerpage");
                  }}
                >
                  Trainer
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<LogoutIcon />}
                  className="navbtn-icon"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </li>
            </ul>
            {/* <div className="burger">
              <input type="checkbox" id="check" hidden></input>
              <label
                htmlFor="check"
                className="burger-icon"
                onClick={HandleOpen}
                style={{ display: showBars ? "block" : "none" }}
              >
                <FaBars />
              </label>
            </div> */}
          </div>
        </div>
        {/* {showSidebar && (
          <div className="dropdwn" id="drop">
            <div className="cls-btn">
              <input type="checkbox" id="close" hidden></input>
              <label
                htmlFor="close"
                className="close-icon"
                onClick={HandleClose}
              >
                <FaTimes />
              </label>
            </div>
            <div className="nav-btn">
            <ul className="btn-list-dropdown">
              <li>
                <Button
                  variant="text"
                  endIcon={<HomeIcon />}
                  className="navbtn-icon"
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<ContactsIcon />}
                  className="navbtn-icon"
                >
                  Referral
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<ThreePIcon />}
                  className="navbtn-icon"
                >
                  Student
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<PhotoCameraFrontIcon />}
                  className="navbtn-icon"
                >
                  Trainer
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<LogoutIcon />}
                  className="navbtn-icon"
                >
                  Logout
                </Button>
              </li>
            </ul>
            <div className="burger">
              <input type="checkbox" id="check" hidden></input>
              <label
                htmlFor="check"
                className="burger-icon"
                onClick={HandleOpen}
                style={{ display: showBars ? "block" : "none" }}
              >
                <FaBars />
              </label>
            </div>
          </div>
          </div>
        )} */}
      </AppBar>
    </>
  );
}
