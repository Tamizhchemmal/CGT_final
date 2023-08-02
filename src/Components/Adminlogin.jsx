import React, { useState } from "react";

import "../Css/login.css";
import boss from "../Assets/Images/boss.png";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { teal } from "@mui/material/colors";
import Modal from "react-bootstrap/Modal";

import { TextField, Button } from "@mui/material";
import { ModalBody, ModalFooter } from "react-bootstrap";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const submitAdminLogin = (e) => {
    e.preventDefault();
    if (email === "abc@gmail.com" && password === "12345") {
      setSuccess(true);
      // alert(`${role} success`);
      setError("");

      console.log(role);
    } else if (email !== "abc@gmail.com") {
      setError("Incorrect Email");
      return error;
    } else {
      setError("incorrect password");
      setEmail("");
      setPassword("");

      return error;
    }
  };
  const handleaccess = (e) => {
    if (role == "admin") {
      navigate("home");
    } else if (role == "trainer") {
      navigate("trainerpage");
    } else if (role == "referral") {
      navigate("referralpage");
    }
  };
  return (
    <>
      <div className="main-page">
        <div className="login-card">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={boss} id="logo-admin"></img>
          </div>
          <div className="style-heading">
            <span>Career Guidance Technologies</span>
          </div>

          {/* <h2>Login</h2> */}

          <div>
            <form>
              <div className="inputs-admin">
                <TextField
                  id="standard-basic"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  sx={{ width: "80%", margin: "10px 0 10px 0" }}
                  label="Username"
                  variant="standard"
                  required
                />
                <TextField
                  id="standard-basic"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  sx={{ width: "80%", margin: "10px  0 10px 0" }}
                  label="Password"
                  variant="standard"
                  required
                />
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ m: 2 }}
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="admin"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: teal[500],
                            "&.Mui-checked": {
                              color: teal[600],
                            },
                          }}
                        />
                      }
                      label="Admin"
                    />
                    <FormControlLabel
                      value="trainer"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: teal[500],
                            "&.Mui-checked": {
                              color: teal[600],
                            },
                          }}
                        />
                      }
                      label="Trainer"
                    />
                    <FormControlLabel
                      value="referral"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: teal[500],
                            "&.Mui-checked": {
                              color: teal[600],
                            },
                          }}
                        />
                      }
                      label="Referral"
                    />
                  </RadioGroup>
                </FormControl>

                {error && <div>{error}</div>}

                <Button
                  type="submit"
                  sx={{ width: "80%" }}
                  onClick={submitAdminLogin}
                  size="large"
                  variant="outlined"
                  className="btn-admin"
                  color="secondary"
                >
                  Login
                </Button>
                {/* <Button onClick={(e)=>{setSuccess(true)}}>Click</Button> */}
                <Modal
                  show={success}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header >
                    <Modal.Title ><h4 style={{color:"green"}}>Login Successful</h4></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>You are Login as a {role}.....</h5>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleaccess}>Okay</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
