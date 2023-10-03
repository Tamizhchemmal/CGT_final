import React, { createContext, useContext, useEffect, useState } from "react";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button } from "@mui/material";
import { RollerShadesClosedRounded } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { encrypt, decrypt } from "n-krypta";
import CrmService from "../API/CrmService.js";

function Adminlogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/home");
    }
  }, []);

  const submitAdminLogin = (e) => {
    e.preventDefault();
    const key = "key";
    const userid = uuidv4();
    if (role === "admin") {
      let body = {
        email: email,
        password: password,

        rememberMe: 0,
      };
      CrmService.login(body)
        .then((response) => {
          console.log(response);
          console.log(response.data.apitoken);

          localStorage.setItem("apitoken", response.data.apitoken);
          setSuccess(true);
          localStorage.setItem("isUserLoggedIn", true);
          localStorage.setItem("access", true);
          localStorage.setItem("role", role);
          localStorage.setItem("id", userid);
          setError("");
          CrmService.userLoggedIn();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.errmessage);
          setError(error.response.data.errmessage);
        });

      //   if (email === "admin" && password === "12345") {
      //     setSuccess(true);
      //     localStorage.setItem("access", true);
      //     localStorage.setItem("role", role);
      //     localStorage.setItem("id", userid);
      //     setError("");
      //   } else if (email !== "admin") {
      //     setError("Incorrect Email");
      //     return error;
      //   } else {
      //     setError("incorrect password");
      //     setEmail("");
      //     setPassword("");

      //     return error;
      //   }
      // } else if (role === "trainer") {
      //   if (email === "abc@gmail.com" && password === "12345") {
      //     setSuccess(true);
      //     setError("");
      //     setSuccess(true);
      //     localStorage.setItem("access", true);
      //     localStorage.setItem("role", role);
      //   } else if (email !== "abc@gmail.com") {
      //     setError("Incorrect Email");
      //     return error;
      //   } else {
      //     setError("incorrect password");
      //     setEmail("");
      //     setPassword("");

      //     return error;
      //   }
      // } else if (role === "referral") {
      //   if (email === "abc@gmail.com" && password === "12345") {
      //     setSuccess(true);
      //     setError("");
      //     localStorage.setItem("access", true);
      //     localStorage.setItem("role", role);
      //   } else if (email !== "abc@gmail.com") {
      //     setError("Incorrect Email");
      //     return error;
      //   } else {
      //     setError("incorrect password");
      //     setEmail("");
      //     setPassword("");

      //     return error;
      //   }
    }
  };

  const handleaccess = (e) => {
    if (role === "admin") {
      navigate("/home");
    } else if (role === "trainer") {
      navigate("/commonhome");
    } else if (role === "referral") {
      navigate("/commonhome");
    }
  };

  return (
    <>
      <div className="main-page">
        <div className="login-card">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={boss} id="logo-admin" alt="admin Logo"></img>
          </div>
          <div className="style-heading">
            <h4>Career Guidance Technologies</h4>
          </div>

          {/* <h2>Login</h2> */}

          <div>
            <form onSubmit={submitAdminLogin}>
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
                    className="radio-btn"
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ m: 2 }}
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    required
                    aria-required
                  >
                    <FormControlLabel
                      value="admin"
                      control={
                        <Radio
                          required
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
                          required
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
                          required
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

                {error && <div style={{ color: "red" }}>{error}</div>}

                <Button
                  type="submit"
                  sx={{ width: "80%" }}
                  // onClick={submitAdminLogin}

                  size="large"
                  variant="outlined"
                  className="btn-admin"
                  color="secondary"
                >
                  Login
                </Button>
              </div>
            </form>
            {/* <Button onClick={(e)=>{setSuccess(true)}}>Click</Button> */}
            <Modal show={success} backdrop="static" keyboard={false}>
              <Modal.Header>
                <Modal.Title>
                  <h4 style={{ color: "green" }}>Login Successful</h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>You are Login as a {role}.....</h5>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleaccess}>
                  Okay
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
