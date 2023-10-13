import React, { useEffect } from "react";
import "../Css/NavBar.css";

import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";

import { useNavigate, NavLink } from "react-router-dom";
import CrmService from "../API/CrmService";

export default function NavBar() {
  const navigate = useNavigate();

  const logOut = () => {
    CrmService.logoutapi()
      .then((response) => {
        localStorage.removeItem("role");
        localStorage.removeItem("access");
        localStorage.removeItem("uuid");
        localStorage.removeItem("apitoken");
        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("userType");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
                  onClick={logOut}
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
