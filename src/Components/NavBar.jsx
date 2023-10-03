import React, { useContext, useEffect } from "react";
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
import { useNavigate, NavLink } from "react-router-dom";

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBars, setShowbars] = useState(true);

  // const role = useContext(rolecontext);

  const navigate = useNavigate();

  const HandleOpen = () => {
    setShowSidebar(true);
    setShowbars(false);
  };
  const HandleClose = () => {
    setShowSidebar(false);
    setShowbars(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      navigate("/");
    }
  }, []);

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
                <NavLink
                  variant="text"
                  activeclassname="active"
                  className="navbtn-icon"
                  id="inactive-button"
                  to={"/home"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  variant="text"
                  activeclassname="active"
                  className="navbtn-icon"
                  id="inactive-button"
                  to={"/referralpage"}
                >
                  Referral
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeclassname="active"
                  className="navbtn-icon"
                  variant="text"
                  id="inactive-button"
                  to={"/studentpage"}
                >
                  Student
                </NavLink>
              </li>
              <li>
                <NavLink
                  variant="text"
                  activeclassname="active"
                  className="navbtn-icon"
                  id="inactive-button"
                  to={"/trainerpage"}
                >
                  Trainer
                </NavLink>
              </li>
              <li>
                <Button
                  variant="text"
                  endIcon={<LogoutIcon />}
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("role");
                    localStorage.removeItem("apitoken");
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
