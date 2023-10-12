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

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "../Css/HomePage.css";
import NavBar from "./NavBar";
import BatchTable from "./BatchTable";
import { FcSearch } from "react-icons/fc";

import { rolecontext } from "../App";

import CrmService from "../API/CrmService";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [batchcode, setBatchcode] = useState(" ");
  const [batchCourse, setBatchCourse] = useState("");
  const [batchMonth, setBatchMonth] = useState("");
  const [batchNumber, setBatchNumber] = useState("");

  const [trainername, settrainername] = useState("");

  const [show, setShow] = useState(false);

  const [batchCourseList, setBatchCourseList] = useState([
    {
      id: 1,
      course: "DEVP",
    },
    {
      id: 2,
      course: "TESTING",
    },
    {
      id: 3,
      course: "AWS",
    },
    {
      id: 4,
      course: "UI & UI",
    },
    {
      id: 5,
      course: "PYTHON",
    },
    {
      id: 6,
      course: "FULLSTACK",
    },
  ]);

  const [batchMonthList, setBatchMonthList] = useState([
    {
      id: 1,
      month: "Jan",
    },
    {
      id: 2,
      month: "Feb",
    },
    {
      id: 3,
      month: "Mar",
    },
    {
      id: 4,
      month: "Apr",
    },
    {
      id: 5,
      month: "May",
    },
    {
      id: 6,
      month: "Jun",
    },
    {
      id: 7,
      month: "Jul",
    },
    {
      id: 8,
      month: "Aug",
    },
    {
      id: 9,
      month: "Sep",
    },
    {
      id: 10,
      month: "Oct",
    },
    {
      id: 11,
      month: "Nov",
    },
    {
      id: 12,
      month: "Dec",
    },
  ]);

  const [batchNumberList, setBatchNumberList] = useState([
    {
      id: 1,
      number: "1",
    },
    {
      id: 2,
      number: "2",
    },
    {
      id: 3,
      number: "3",
    },
    {
      id: 4,
      number: "4",
    },
    {
      id: 5,
      number: "5",
    },
    {
      id: 6,
      number: "6",
    },
  ]);

  const handleClose = (e) => {
    setShow(false);
    setErrors("");
  };
  const handleShow = () => {
    setShow(true);
  };

  // trainer dropdown

  // Test api
  const [testtrainerData, setTesttrainerData] = useState([]);

  const callTestTrainerApiData = async (e) => {
    await CrmService.getTrainerList()
      .then((response) => {
        setTesttrainerData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    callTestTrainerApiData();
  }, []);

  const [errors, setErrors] = useState({});

  const submitBatch = async (e) => {
    let uuid = localStorage.getItem("uuid");
    const batchcode = `${batchCourse}-${batchMonth}-${batchNumber}`;
    setTimeout(() => {
      setBatchcode(batchcode);
    }, 1000);

    e.preventDefault();

    let body = {
      batchId: 0,
      batchCode: batchcode,
      trainerId: trainername,

      batchSelectedTime: selectedBatchTime,
      startDate: startBatchDate,
      endDate: endBatchDate,
      createdby: uuid,
    };
    await CrmService.createBatch(body)
      .then((response) => {})
      .catch((error) => {
        console.log(error.message);
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

                      justifyContent: "space-around",
                    }}
                  >
                    <div className="search-full">
                      <input
                        type="search"
                        placeholder="Search Batch"
                        id="searchbar-ref"
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                      <FcSearch id="search-icon" title="Search" />
                    </div>
                    <button
                      className="create ref"
                      id="batchcreate"
                      onClick={handleShow}
                    >
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
                        <div className="combine-dropdwn">
                          <div className="inputbatch">
                            <select
                              id="batchcode1"
                              // name="batchcode"
                              className="batchdropdown"
                              required
                              onChange={(e) => setBatchCourse(e.target.value)}
                            >
                              <option value="" selected disabled>
                                Batch Code
                              </option>
                              {batchCourseList.map((data) => (
                                <option key={data.id} value={data.course}>
                                  {data.course}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="inputbatch">
                            <select
                              id="batchcode2"
                              // name="batchcode"
                              className="batchdropdown"
                              required
                              onChange={(e) => setBatchMonth(e.target.value)}
                            >
                              <option value="" selected disabled>
                                Batch Month
                              </option>
                              {batchMonthList.map((data1) => (
                                <option key={data1.id} value={data1.month}>
                                  {data1.month}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="inputbatch">
                            <select
                              id="batchcode3"
                              // name="batchcode"
                              className="batchdropdown"
                              required
                              onChange={(e) => setBatchNumber(e.target.value)}
                            >
                              <option value=" " selected disabled>
                                Batch Number
                              </option>
                              {batchNumberList.map((data2) => (
                                <option key={data2.id} value={data2.number}>
                                  {data2.number}
                                </option>
                              ))}
                            </select>
                          </div>
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
                        {/* <div className="inputbatch">
                          <input
                            type="number"
                            name="numofstudent"
                            id="numofstudent"
                            placeholder="No of Student"
                            value={numofstudent}
                            onChange={(e) => setnumofstudent(e.target.value)}
                          />
                        </div> */}
                        <div className="inputbatch">
                          <select
                            id="trainername"
                            name="trainername"
                            className="trainerdropdown"
                            required
                            value={trainername}
                            onChange={(e) => settrainername(e.target.value)}
                          >
                            <option value="" selected disabled>
                              Trainers Name
                            </option>
                            {testtrainerData.map((data, index) => (
                              <option key={index} value={data.id}>
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
                      </div>
                      {errors.confirmpassword && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {errors.confirmpassword}
                        </p>
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
                  <BatchTable search={search} />
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
