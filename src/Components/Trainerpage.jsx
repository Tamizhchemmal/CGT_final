import React, { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import "../Css/Referralstyle.css";
import TrainerPopUp from "./TrainerPopUp";
import TrainerProfModal from "./TrainerProfModal";
import CrmService from "../API/CrmService";

import {
  Container,
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

//Table
const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  {
    id: "mobile",
    label: "Mobile Number",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "course",
    label: "Course",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "companyname",
    label: "Company Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paymentmode",
    label: "Payment Mode",
    minWidth: 180,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paymentmthoda",
    label: "Payment Method",
    minWidth: 180,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "edit/delete",
    label: "Edit/Delete",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
//table

export default function Trainerpage() {
  const [show, setShow] = useState(false);
  const [tableshow, setTableshow] = useState(false);
  const [search, setSearch] = useState("");
  const [showTrain, setShowtrain] = useState([]);
  const [showTrainModal, setShowTrainModal] = useState(false);

  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [paymentmode, setPaymentmode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [paymentdetails, setPaymentdetails] = useState("");
  const [reEnterDetails, setreEnterDetails] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [role, setRole] = useState("trainer");

  // console.log(search);
  const [courseList, setCourseList] = useState([]);

  const [paymentmodelist, setPaymentList] = useState([]);

  const callapiPayment = async (e) => {
    CrmService.userLoggedIn();
    await CrmService.getPaymentmode()
      .then((response) => {
        // console.log(response.data);
        setPaymentList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    await CrmService.getCourse().then((response) => {
      setCourseList(response.data);
    });
  };
  const getcoursename = (id) => {
    const course = courseList.find((course) => course.courseName == id);
    return course ? course.COURSE_NAME : "unknown";
  };

  const handleTrainClose = () => {
    setShow(false);
  };
  const handleTrainShow = () => {
    setShow(true);
  };

  // Trainer Table Content

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [alertt, setAlertt] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const [apiTrainerData, setApiTrainerData] = useState([]);
  const [apitestTrainerData, settestApiTrainerData] = useState([]);

  // const callTrainerApiData = async () => {
  //   const trainerData = await axios.get(
  //     "https://64b638a2df0839c97e1528f4.mockapi.io/trainers"
  //   );

  //   setApiTrainerData(trainerData.data);
  // };
  // Test api
  const callTestApiData = async (e) => {
    CrmService.userLoggedIn();
    await CrmService.getTrainerList()
      .then((response) => {
        console.log(response.data);
        settestApiTrainerData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
        setErrors(err.message);
      });
    // .catch((err) => console.log(r));
  };

  useEffect(() => {
    // callTrainerApiData();
    callTestApiData();
    callapiPayment();
  }, []);

  const [testShow, setTestShow] = useState(false);

  const [editTrainShow, setEditTrainShow] = useState(false);

  const edithandleClose = () => {
    setEditTrainShow(false);
    setErrors("");
  };

  const testhandleClose = () => {
    setTestShow(false);
    setErrors("");
  };

  // const [editedTrainData, setEditedTrainData] = useState({
  //   email: "",
  //   firstname: "",
  //   lastname: "",
  //   usertype: 1, //userType Id
  //   createdby: 1234, // Logged in User unique ID
  //   userid: "",
  //   company: "",
  //   primaryphone: "",
  //   course: "", //course id
  //   role: role,
  // });

  // name: "",
  //   email: "",
  //   password: "",
  //   confirmpassword: "",
  //   course: "",
  //   paymentdetails: "",
  //   paymentmode: "",
  //   ifscCode: "",
  //   reEnterDetails: "",
  //   companyname: "",
  //   mobilenumber: "",

  const handletrainedit = (rowTrainData) => {
    setEditTrainShow(true);
    setselectedtraindata(rowTrainData);
    setupdatedtraindata({ ...rowTrainData });

    console.log(rowTrainData);
  };

  // var editTestData = {
  //   email: "",
  // };

  const [selectedtraindata, setselectedtraindata] = useState({});
  const [updatedtraindata, setupdatedtraindata] = useState({});
  // testdata
  const handletraintestedit = (rowTrainData) => {
    setTestShow(true);
    setselectedtraindata(rowTrainData);
    setupdatedtraindata({ ...rowTrainData });
  };

  const testhandlechange = (e) => {
    const { name, value } = e.target;
    setupdatedtraindata({
      ...updatedtraindata,
      [name]: value,
    });
  };

  const submitTraintestEdit = async (e) => {
    e.preventDefault();
    // const amnntt = updatedtraindata.paymentmode;
    // const amount = (amnntt) => {
    //   if (typeof updatedtraindata.paymentmode == "string") {
    //     return selectedtraindata.paymentmode;
    //   } else {
    //     return updatedtraindata.paymentmode;
    //   }
    // };
    let editBody = {
      email: updatedtraindata.email,
      firstname: updatedtraindata.name,
      lastname: "",
      usertype: 1, //userType Id
      createdby: 123, // Logged in User unique ID
      userid: selectedtraindata.id,
      company: updatedtraindata.companyname,
      primaryphone: updatedtraindata.mobilenumber,
      course: updatedtraindata.course, //course id
      // payment mode ID
      paymentmode: updatedtraindata.paymentmode,
      paymentdetails: updatedtraindata.paymentdetails, // Account no. or Gpay no.
      ifsccode: ifscCode, // ifsc code if bank selected or else give empty
      password: updatedtraindata.password,
    };
    await CrmService.editTrainer(editBody)
      .then((response) => {
        console.log(response);
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    setTestShow(false);
  };

  // delete trainer
  const [deleteKey, setdeleteKey] = useState(null);
  const [deletePopUp, setdeletePopUp] = useState(false);

  const deleteTrainerData = (data) => {
    setdeletePopUp(true);
    setdeleteKey(data.uuid);
  };

  const confirmDelete = async () => {
    let body = {
      userid: deleteKey, // user UUID
      modifiedby: "123", // Logged in User unique ID
    };
    await CrmService.deleteReferral(body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    callTestApiData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  const opneTraintable = (apiTrainerData) => {
    setShowtrain(apiTrainerData);
    setShowTrainModal(true);
  };
  const handleTrainCloseModal = (e) => {
    setShowTrainModal(false);
  };

  // Table content End

  // date Change

  const [errors, setErrors] = useState("");

  const submitTrainer = async (e) => {
    e.preventDefault();

    let body = {
      email: email,
      firstname: name,
      lastname: "",
      usertype: 1, //userType Id
      createdby: 123, // Logged in User unique ID
      userid: 0,
      company: companyname,
      primaryphone: mobilenumber,
      course: course, //course id
      paymentmode: paymentmode, // payment mode ID
      paymentdetails: paymentdetails, // Account no. or Gpay no.
      ifsccode: ifscCode, // ifsc code if bank selected or else give empty
      password: password,
    };
    console.log(body);
    if (password !== confirmpassword) {
      setErrors("Password Should Be Same");
    } else {
      await CrmService.createReferralOrTrainer(body)
        .then((response) => {
          console.log(response.data);

          if (response.data.errmessage) {
            setErrors(response.data.errmessage);
          } else {
            setErrors("");
            alert("Trainer Created");
            e.target.reset();
            setShow(false);
          }
        })
        .catch((err) => {
          console.log(err.data.errmessages);

          // setErrors(response.message);
        });
    }

    // callTestApiData();
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="crd-bg">
          <div className="card-refdetails">
            <Container>
              <div className="head-ref">
                <div id="heading-ref">Trainer List</div>

                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-around",
                  }}
                >
                  <div className="search-full">
                    <input
                      type="search"
                      placeholder="Search Trainer..."
                      id="searchbar-ref"
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <FcSearch id="search-icon" />
                  </div>{" "}
                  <button className="create ref" onClick={handleTrainShow}>
                    Create Trainer
                  </button>
                </div>
              </div>
              {/* /modal popup for Trainer Creation */}
              <Modal
                show={show}
                className="mods"
                onHide={handleTrainClose}
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
                    Create Trainer Details
                  </Modal.Title>

                  <CloseButton variant="white" onClick={handleTrainClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    CREATE AN ACCOUNT FOR TRAINER
                  </ModalTitle>
                  <form onSubmit={submitTrainer}>
                    <div className="inputref-box">
                      <div className="student-grid">
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="name"
                            placeholder="Fullname"
                            autoComplete="new-password"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="tel"
                            id="input-tele"
                            name="mobilenumber"
                            placeholder="Mobile Number"
                            pattern="[6789][0-9]{9}"
                            autoComplete="new-password"
                            value={mobilenumber}
                            onChange={(e) => setMobilenumber(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="email"
                            id="input-email"
                            name="email"
                            placeholder="Email Address"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </div>

                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-companyname"
                            name="companyname"
                            placeholder="Company Name"
                            autoComplete="new-password"
                            value={companyname}
                            onChange={(e) => setCompanyname(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div>
                          <select
                            id="paymentmode"
                            name="paymentmode"
                            className="referaldropdown"
                            required
                            value={paymentmode}
                            onChange={(event) =>
                              setPaymentmode(event.target.value)
                            }
                          >
                            <option value="" disabled selected>
                              Select Payment Mode
                            </option>
                            {paymentmodelist.map((paymentmode) => (
                              <option
                                key={paymentmode.PAYM_ID}
                                value={paymentmode.PAYM_ID}
                              >
                                {paymentmode.PAYM_NAME}
                              </option>
                            ))}
                          </select>
                        </div>

                        {paymentmode === "3" && (
                          <div className="inputstudent">
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
                        <div className="inputstudent">
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
                        <div className="inputstudent">
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

                        <div>
                          <select
                            id="courseName"
                            name="course"
                            className="referaldropdown"
                            required
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                          >
                            <option value="none">Course</option>
                            {courseList.map((courseData, index1) => (
                              <option
                                key={courseData.COURSE_ID}
                                value={courseData.COURSE_ID}
                              >
                                {courseData.COURSE_NAME}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="inputtrainer">
                          <input
                            type="Password"
                            id="input-pwd"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          ></input>
                        </div>
                        <div className="inputtrainer">
                          <input
                            type="Password"
                            id="input-conpwd"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
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
                        onClick={handleTrainClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
              {/* Edit */}
              <Modal
                show={editTrainShow}
                onHide={edithandleClose}
                className="mods"
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
                    Update Trainer
                  </Modal.Title>

                  <CloseButton variant="white" onClick={edithandleClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    Update AN TRAINER
                  </ModalTitle>
                  <form onSubmit={submitTraintestEdit}>
                    <div className="inputref-box">
                      <div className="student-grid">
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="name"
                            placeholder="Fullname"
                            autoComplete="new-password"
                            value={updatedtraindata.name}
                            onChange={testhandlechange}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="tel"
                            id="input-tele"
                            name="mobilenumber"
                            placeholder="Mobile Number"
                            pattern="[6789][0-9]{9}"
                            autoComplete="new-password"
                            value={updatedtraindata.mobilenumber}
                            onChange={testhandlechange}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="email"
                            id="input-email"
                            name="email"
                            placeholder="Email Address"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            required
                            value={updatedtraindata.email}
                            onChange={testhandlechange}
                          ></input>
                        </div>

                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-companyname"
                            name="companyname"
                            placeholder="Company Name"
                            autoComplete="new-password"
                            value={updatedtraindata.companyname}
                            onChange={testhandlechange}
                            required
                          ></input>
                        </div>

                        <div>
                          <select
                            id="paymentmode"
                            name="paymentmode"
                            className="referaldropdown"
                            required
                            value={updatedtraindata.paymentmode}
                            onChange={testhandlechange}
                          >
                            <option selected>Payment Mode</option>
                            {paymentmodelist.map((paymentmode, index1) => (
                              <option
                                key={paymentmode.PAYM_ID}
                                value={paymentmode.PAYM_ID}
                              >
                                {paymentmode.PAYM_NAME}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            name="paymentdetails"
                            placeholder="Payment Details (Ac.no/Upi id)"
                            autoComplete="off"
                            value={updatedtraindata.paymentdetails}
                            onChange={testhandlechange}
                            required
                          ></input>
                        </div>

                        <div>
                          <select
                            id="courseName"
                            name="course"
                            className="referaldropdown"
                            required
                            value={updatedtraindata.course}
                            onChange={testhandlechange}
                          >
                            <option value="none">Course</option>
                            {courseList.map((courseData, index1) => (
                              <option key={index1} value={courseData.name}>
                                {courseData.course}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* <div className="inputtrainer">
                          <input
                            type="Password"
                            id="input-pwd"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={updatedtraindata.password}
                            onChange={(e) =>
                              setEditedTrainData({
                                ...editedTrainData,
                                password: e.target.value,
                              })
                            }
                            required
                          ></input>
                        </div> */}
                        {/* <div className="inputtrainer">
                          <input
                            type="Password"
                            id="input-conpwd"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            value={editedTrainData.confirmpassword}
                            onChange={(e) =>
                              setEditedTrainData({
                                ...editedTrainData,
                                confirmpassword: e.target.value,
                              })
                            }
                            required
                          ></input>
                        </div> */}
                      </div>
                    </div>
                    <Modal.Footer>
                      <button type="submit" id="btn-createrefmodal">
                        Update
                      </button>
                      <Button
                        variant="secondary"
                        id="btn-createrefmodal"
                        onClick={edithandleClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
              {/* Test Edit */}
              {/* 
              <Modal
                // data={apiTrainerData}
                show={testShow}
                onHide={testhandleClose}
                className="mods"
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
                    Update Trainer
                  </Modal.Title>

                  <CloseButton variant="white" onClick={testhandleClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    Update AN TRAINER
                  </ModalTitle>
                  <form onSubmit={submitTraintestEdit}>
                    <div className="inputref-box">
                      <div className="student-grid">
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="name"
                            placeholder="Fullname"
                            autoComplete="new-password"
                            value={updatedtraindata.name}
                            onChange={testhandlechange}
                            required
                          ></input>

                          <input
                            type="tel"
                            id="input-tele"
                            name="mobilenumber"
                            placeholder="Mobile Number"
                            pattern="[6789][0-9]{9}"
                            autoComplete="new-password"
                            value={updatedtraindata.mobilenumber}
                            onChange={testhandlechange}
                            required
                          ></input>
                          <input
                            type="email"
                            id="input-email"
                            name="email"
                            placeholder="Email Address"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            required
                            value={updatedtraindata.email}
                            onChange={testhandlechange}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <Modal.Footer>
                      <button type="submit" id="btn-createrefmodal">
                        Update
                      </button>
                      <Button
                        variant="secondary"
                        id="btn-createrefmodal"
                        onClick={testhandleClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal> */}
              {/* Table for Trainer */}
              <div id="reftable">
                <div className="tableData">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 540 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "lightblue" }}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: " #002333",
                                  color: "#ffffff",
                                  fontSize: "18px",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {apitestTrainerData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            // .filter((apiTrainerData) => {
                            //   return search.toLowerCase() === ""
                            //     ? apiTrainerData
                            //     : apiTrainerData.name
                            //         .toLowerCase()
                            //         .includes(search) ||
                            //         apiTrainerData.name.includes(search) ||
                            //         apiTrainerData.course
                            //           .toLowerCase()
                            //           .includes(search) ||
                            //         apiTrainerData.course.includes(search);
                            // })
                            .map((apiTrainerData) => {
                              return (
                                <TableRow
                                  key={apiTrainerData.id}
                                  hover
                                  role="checkbox"
                                >
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.name}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.mobilenumber}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.email}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {getcoursename(
                                      apiTrainerData.STUDENT_COURSE_ID
                                    )}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.companyname}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.paymentmode}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apiTrainerData)
                                    }
                                  >
                                    {apiTrainerData.paymentdetails}
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                  >
                                    <BiSolidMessageSquareEdit
                                      id="edit-icon"
                                      onClick={() =>
                                        handletrainedit(apiTrainerData)
                                      }
                                    />
                                    <MdDelete
                                      id="dlt-icon"
                                      onClick={() =>
                                        deleteTrainerData(apiTrainerData)
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={apitestTrainerData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  {/* model profile */}
                  <Modal
                    show={tableshow}
                    onHide={handleTrainClose}
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
                        Trainer Profile
                      </Modal.Title>

                      <CloseButton variant="white" onClick={handleTrainClose} />
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <TrainerProfModal />
                      </div>
                      <hr></hr>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleTrainClose}>
                          Close
                        </Button>
                        <button type="submit" id="btn-createrefmodal">
                          Create
                        </button>
                      </Modal.Footer>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <hr></hr>
              {/* Test api table
               */}
              {/* <div id="reftable">
                <div className="tableData">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 540 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "lightblue" }}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: " #002333",
                                  color: "#ffffff",
                                  fontSize: "18px",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {apitestTrainerData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            // .filter((apiTrainerData) => {
                            //   return search.toLowerCase() === ""
                            //     ? apiTrainerData
                            //     : apiTrainerData.name
                            //         .toLowerCase()
                            //         .includes(search) ||
                            //         apiTrainerData.name.includes(search) ||
                            //         apiTrainerData.course
                            //           .toLowerCase()
                            //           .includes(search) ||
                            //         apiTrainerData.course.includes(search);
                            // })
                            .map((apitestTrainerData) => {
                              return (
                                <TableRow
                                  key={apitestTrainerData.id}
                                  hover
                                  role="checkbox"
                                >
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apitestTrainerData)
                                    }
                                  >
                                    {apitestTrainerData.email}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      opneTraintable(apitestTrainerData)
                                    }
                                  ></TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                  >
                                    <BiSolidMessageSquareEdit
                                      id="edit-icon"
                                      onClick={() =>
                                        handletraintestedit(apitestTrainerData)
                                      }
                                    />
                                    <MdDelete
                                      id="dlt-icon"
                                      onClick={() =>
                                        deleteTrainerData(apitestTrainerData.id)
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={apitestTrainerData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  {/* model profile */}
              {/* <Modal
                    show={tableshow}
                    onHide={handleTrainClose}
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
                        Trainer Profile
                      </Modal.Title>

                      <CloseButton variant="white" onClick={handleTrainClose} />
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <TrainerProfModal />
                      </div>
                      <hr></hr>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleTrainClose}>
                          Close
                        </Button>
                        <button type="submit" id="btn-createrefmodal">
                          Create
                        </button>
                      </Modal.Footer>
                    </Modal.Body>
                  </Modal> */}
              {/* </div>
              </div> */}{" "}
            </Container>
          </div>
        </div>
      </div>
      {showTrain && (
        <TrainerPopUp
          id={apitestTrainerData.id}
          user={showTrain}
          showmodal={showTrainModal}
          onClosemodal={handleTrainCloseModal}
        />
      )}
      {/* Modal for want to delete */}
      <Modal
        show={deletePopUp}
        backdrop="static"
        keyboard={false}
        className="mods"
      >
        <Modal.Header>
          <Modal.Title>
            <h4 style={{ color: "green" }}>Delete</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are You sure want to delete ? </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmDelete}>
            Okay
          </Button>
          <Button
            variant="secondary"
            id="btn-createrefmodal"
            onClick={() => setdeletePopUp(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
