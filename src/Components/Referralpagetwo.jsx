import React from "react";
import { useState } from "react";
import "../Css/Referralstyle.css";
import {
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import RefTable from "./RefTable";
import { FcSearch } from "react-icons/fc";
import NavBar from "./NavBar";
import CrmService from "../API/CrmService";

function Referralpagetwo() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShow(false);
    setErrors("");
    setPaymentmode("");
  };
  const handleShow = () => {
    setShow(true);
  };

  //creation

  const [paymentdetails, setPaymentdetails] = useState("");
  const [reEnterDetails, setreEnterDetails] = useState("");
  const [paymentmode, setPaymentmode] = useState("");
  const [ifscCode, setifscCode] = useState("");

  const [paymentmodelist, setPaymentList] = useState([
    {
      id: 1,
      name: "GPAY NUMBER",
    },
    {
      id: 2,
      name: "UPI",
    },
    {
      id: 3,
      name: "BANK ACCOUNT",
    },
  ]);

  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  const [email, setEmail] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [role, setRole] = useState("referral");

  const [errors, setErrors] = useState("");

  // Payment

  const submitReferral = async (e) => {
    e.preventDefault();

    let body = {
      email: email,
      firstname: name,
      lastname: "",
      usertype: 2, //userType Id
      createdby: 123, // Logged in User unique ID
      userid: 0,
      company: companyname,
      primaryphone: mobilenumber,
      course: "", //course id
      paymentmode: "2", // payment mode ID
      paymentdetails: paymentdetails, // Account no. or Gpay no.
      ifsccode: ifscCode, // ifsc code if bank selected or else give empty
      password: password, // raw password now, will encryt later
    };
    await CrmService.createReferralOrTrainer(body)
      .then((response) => {
        console.log(response.data);

        if (response.data.errmessage) {
          setErrors(response.data.errmessage);
        } else {
          setErrors("");
          alert("Referral Created");
          e.target.reset();
          setShow(false);
        }
      })
      .catch((err) => {
        console.log(err.data.errmessages);

        // setErrors(response.message);
      });

    // if (password !== confirmpassword) {
    //   setErrors("Password Should Be Same");
    // } else if (paymentdetails !== reEnterDetails) {
    //   setErrors("Account details Should be same");
    // } else {
    //   await axios.post("https://64a587de00c3559aa9bfdbd4.mockapi.io/refData", {
    //     name,
    //     email,
    //     password,
    //     confirmpassword,
    //     role,
    //     companyname,
    //     mobilenumber,
    //     paymentdetails,
    //     paymentmode,
    //     reEnterDetails,
    //     ifscCode,
    //   });

    // }
  };
  return (
    <>
      <div>
        <NavBar />
        <div className="crd-bg">
          <div className="card-refdetails">
            <Container>
              <div className="head-ref">
                <div id="heading-ref">Referral List</div>

                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-around",
                  }}
                >
                  <div className="search-full">
                    <input
                      type="search"
                      placeholder="Search Referral"
                      id="searchbar-ref"
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <FcSearch id="search-icon" title="Search" />
                  </div>
                  <button className="create ref" onClick={handleShow}>
                    Create Referral
                  </button>
                </div>
              </div>

              <hr></hr>

              {/* /modal */}
              <Modal
                show={show}
                className="mods"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header
                  style={{ backgroundColor: " #002333 ", color: "white" }}
                >
                  <Modal.Title style={{ color: "white" }}>
                    Create Referral
                  </Modal.Title>

                  <CloseButton variant="white" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    CREATE AN ACCOUNT FOR REFERRAL
                  </ModalTitle>
                  <form onSubmit={submitReferral}>
                    <div className="inputref-box">
                      <div className="student-grid">
                        <div className="inputref">
                          <input
                            type="text"
                            id="input-name"
                            name="name"
                            placeholder="Fullname"
                            autoComplete="new-password"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="tel"
                            id="input-tele"
                            name="mobilenumber"
                            placeholder="Mobile Number"
                            pattern="[6789][0-9]{9}"
                            autoComplete="new-password"
                            onChange={(e) => setMobilenumber(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="email"
                            id="input-email"
                            name="email"
                            placeholder="Email Address"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            required
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="text"
                            id="input-comp"
                            name="companyname"
                            placeholder="Company Name"
                            autoComplete="off"
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}
                            required
                          ></input>
                        </div>

                        <div className="inputref">
                          <select
                            id="payment-mode"
                            name="paymentmode"
                            className="referaldropdown"
                            required
                            onChange={(event) =>
                              setPaymentmode(event.target.value)
                            }
                          >
                            <option value="" disabled selected>
                              Select Payment Mode
                            </option>
                            {paymentmodelist.map((paymentmode, index1) => (
                              <option key={index1} value={paymentmode.name}>
                                {paymentmode.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {paymentmode === "BANK ACCOUNT" && (
                          <div className="inputref">
                            <input
                              type="text"
                              name="paymentdetails"
                              placeholder="Enter IFSC Code"
                              autoComplete="off"
                              value={ifscCode}
                              onChange={(e) => setifscCode(e.target.value)}
                              required
                            ></input>
                          </div>
                        )}
                        <div className="inputref">
                          <input
                            type="text"
                            name="paymentdetails"
                            placeholder="Payment Details (Ac.no/Upi id)"
                            autoComplete="off"
                            value={paymentdetails}
                            onChange={(e) => setPaymentdetails(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="text"
                            name="paymentdetails"
                            placeholder="ReEnter Payment Details"
                            autoComplete="off"
                            value={reEnterDetails}
                            onChange={(e) => setreEnterDetails(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="Password"
                            id="input-pwd"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputref">
                          <input
                            type="Password"
                            id="input-conpwd"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            onChange={(e) => {
                              setConfirmpassword(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    {errors ? (
                      <p style={{ color: "red", textAlign: "center" }}>
                        {errors}
                      </p>
                    ) : (
                      ""
                    )}
                    <Modal.Footer>
                      <button type="submit" id="btn-createrefmodal">
                        Create
                      </button>
                      <Button
                        variant="secondary"
                        id="btn-createrefmodal"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
              {/* Model profile */}

              <div id="reftable">
                <RefTable search={search} />
              </div>
            </Container>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Referralpagetwo;
