import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "../Css/Referralstyle.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "../Css/HomePage.css";
import NavBar from "./NavBar";
import BatchTable from "./BatchTable";
import { FcSearch } from "react-icons/fc";
import "../Css/HomePage.css";
import { rolecontext } from "../App";
import NavBarTwo from "./NavBarTwo";

export default function HomePage() {
  const role = useContext(rolecontext);

  const [batchcode, setbatchcode] = useState("");

  const [numofstudent, setnumofstudent] = useState("");
  const [trainername, settrainername] = useState("");

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  const [batchList, setBatchList] = useState([
    {
      id: 1,
      course: "D",
    },
    {
      id: 2,
      course: "T",
    },
    {
      id: 3,
      course: "A",
    },
    {
      id: 4,
      course: "UI",
    },
    {
      id: 5,
      course: "P",
    },
    {
      id: 6,
      course: "FD",
    },
  ]);

  const [trainerList, setTrainerList] = useState([
    {
      id: 1,
      name: "Tamzih",
    },
    {
      id: 2,
      name: "Vignesh",
    },
    {
      id: 3,
      name: "Patrick",
    },
    {
      id: 4,
      name: "Swarna",
    },
    {
      id: 5,
      name: "Karthik Raja",
    },
    {
      id: 6,
      name: "Priya Saravanan",
    },
  ]);

  const handleClose = () => {
    setShow(false);
    setErrors("");
  };
  const handleShow = () => {
    setShow(true);
  };

  const [errors, setErrors] = useState({});

  const submitBatch = async (e) => {
    e.preventDefault();
    await axios.post("https://64b638a2df0839c97e1528f4.mockapi.io/batch", {
      batchcode,
      selectedBatchTime,
      numofstudent,
      trainername,
      startBatchDate,
      endBatchDate,
    });
    e.target.reset();
    setShow(false);
  };

  //Date change Automatic
  const [startBatchDate, setStartBatchDate] = useState([]);
  const [endBatchDate, setEndBatchDate] = useState([]);

  //Date change
  const handleStartDateChange = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const selectedEndDate = new Date(selectedStartDate);
    selectedEndDate.setMonth(selectedStartDate.getMonth() + 3);
    const sDate = e.target.value;
    setStartBatchDate(sDate);
    const eDate = selectedEndDate.toISOString().substr(0, 10);
    setEndBatchDate(eDate);

    //Search function
  };

  const [selectedBatchTime, setSelectedBatchTime] = useState("");

  const handleTimeChange = (e) => {
    const btchTiming = e.target.value;
    setSelectedBatchTime(btchTiming);
  };

  return (
    <>
      <div className="home-page">
        <NavBar />

        <div className="home-card">
          <div className="home-crd1">
            <div className="home-count1">
              <h2>500</h2>
              <p>Total No. of Students</p>
            </div>
            <div className="home-icon1">
              <SupervisorAccountIcon className="icon1" />
            </div>
          </div>
          <div className="home-crd2">
            <div className="home-count2">
              <h2>200</h2>
              <p>Total No. of Referrals</p>
            </div>
            <div className="home-icon2">
              <BrowserUpdatedIcon className="icon2" />
            </div>
          </div>
          <div className="home-crd3">
            <div className="home-count3">
              <h2>400</h2>
              <p>No. of Students Placed</p>
            </div>
            <div className="home-icon3">
              <WorkspacePremiumIcon className="icon3" />
            </div>
          </div>
        </div>

        <div className="batch-table">
          <div className="crd-bg">
            <div className="card-refdetails">
              <Container>
                <div className="head-ref">
                  <div id="heading-ref">Batch List</div>
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div className="search-full">
                      <input
                        type="search"
                        placeholder="Search Batch"
                        id="searchbar-ref"
                      ></input>
                      <FcSearch id="search-icon" title="Search" />
                    </div>
                    <button className="create ref" onClick={handleShow}>
                      Create Batch
                    </button>
                  </div>
                </div>

                <hr></hr>

                {/* /modal */}
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="mods"
                >
                  <Modal.Header
                    style={{ backgroundColor: " #002333 ", color: "white" }}
                  >
                    <Modal.Title style={{ color: "white" }}>
                      Create Batch
                    </Modal.Title>

                    <CloseButton variant="white" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                    <ModalTitle style={{ textAlign: "center" }}>
                      CREATE AN BATCH
                    </ModalTitle>
                    <form onSubmit={submitBatch}>
                      <div className="inputbatch-box">
                        <div className="inputbatch">
                          <select
                            id="batchcode"
                            name="batchcode"
                            className="batchdropdown"
                            required
                            onChange={(e) => setbatchcode(e.target.value)}
                          >
                            <option value="null">Batch Code</option>
                            {batchList.map((data, index) => (
                              <option key={index} value={index.course}>
                                {data.course}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="inputbatch">
                          <input
                            type="time"
                            name="batchtiming"
                            id="batchtiming"
                            value={selectedBatchTime}
                            onChange={handleTimeChange}
                          />
                        </div>
                        <div className="inputbatch">
                          <input
                            type="number"
                            name="numofstudent"
                            id="numofstudent"
                            placeholder="No of Student"
                            value={numofstudent}
                            onChange={(e) => setnumofstudent(e.target.value)}
                          />
                        </div>
                        <div className="inputbatch">
                          <select
                            id="trainername"
                            name="trainername"
                            className="trainerdropdown"
                            required
                            onChange={(e) => settrainername(e.target.value)}
                          >
                            <option value="null">Trainers Name</option>
                            {trainerList.map((data, index) => (
                              <option key={index} value={index.name}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="inputbatch">
                          <div className="batchDate">
                            <div className="btchDate">
                              <label
                                id="batchstrt"
                                htmlFor="startdate"
                                className="text-muted date"
                              >
                                Start date
                              </label>
                              <input
                                name="batchstartdate"
                                type="date"
                                id="batchstartdate"
                                placeholder="Start date"
                                value={startBatchDate}
                                onChange={handleStartDateChange}
                                required
                              />
                            </div>
                            <div className="btchDate">
                              <label id="batchend" className="text-muted date">
                                End date
                              </label>
                              <input
                                type="date"
                                id="batchenddate"
                                name="batchenddate"
                                placeholder="End date"
                                value={endBatchDate}
                                readOnly
                                disabled
                                onChange={(e) =>
                                  setEndBatchDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="inputbatch"></div>
                      </div>
                      {errors.confirmpassword && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {errors.confirmpassword}
                        </p>
                      )}
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <button type="submit" id="btn-createrefmodal">
                          Create
                        </button>
                      </Modal.Footer>
                    </form>
                  </Modal.Body>
                </Modal>

                {/* Model profile */}

                <div id="reftable">
                  <BatchTable />
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
