import React, { useContext } from "react";
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

export default function NavBarTwo(props) {
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
                    navigate("/trainerhome");
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
                    navigate("/refprofile");
                  }}
                >
                  Profile
                </Button>
              </li>

              <li>
                <Button
                  variant="text"
                  endIcon={<LogoutIcon />}
                  className="navbtn-icon"
                  onClick={() => {
                    localStorage.removeItem("role");
                    localStorage.removeItem("access");
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </AppBar>
    </>
  );
}
