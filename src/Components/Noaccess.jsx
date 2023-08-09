import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Css/HomePage.css";
import access from "../Assets/Images/Accessdenied.png";
import Image from "react-bootstrap/Image";
import { hover } from "@testing-library/user-event/dist/hover";

function Noaccess() {
  const navigate = useNavigate();
  const handleback = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <img src={access}></img> */}
        <Image src={access} width={1000} fluid></Image>
      </div>
      <Stack
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <Button
          className="button-access"
          size="large"
          sx={{ color: "white", backgroundColor: "black" }}
          variant="contained"
          onClick={handleback}
        >
          Back To Login Page
        </Button>
      </Stack>
    </>
  );
}

export default Noaccess;
