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
import { BiSolidMessageSquareEdit, BiDollar } from "react-icons/bi";
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
    id: "paymentdetails",
    label: "Payment Details",
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

// paymentdetails
const payment = [
  { id: "paymentmode", label: "Payment Mode", minWidth: 170, align: "center" },
  { id: "paymentdate", label: "Payment Date", minWidth: 170, align: "center" },
  { id: "amount", label: "Amount", minWidth: 170, align: "center" },
  {
    id: "transitionId",
    label: "Transition ID",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Delete",
    minWidth: 170,
    align: "center",
  },
];

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
  const [ifsccode, setifsccode] = useState("");
  const [role, setRole] = useState("trainer");

  //payment Trasaction
  const [payShow, setpayShow] = useState(false);
  const [paymentDate, setPaymentDate] = useState([]);
  const [useramount, setuseramount] = useState("");
  const [transitionID, settransitionID] = useState("");
  const [receiptpaymentmode, setReceiptpaymentmode] = useState("");
  const [reciptdata, setreciptdata] = useState([]);
  const [paymetuserdata, setPaymentuserdata] = useState([]);

  // console.log(search);
  const [courseList, setCourseList] = useState([]);

  const [paymentmodelist, setPaymentList] = useState([]);

  const callapiPayment = async (e) => {
    await CrmService.getPaymentmode()
      .then((response) => {
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

  // Pay
  const handlepay = (apiData) => {
    setPaymentuserdata(apiData);
    setpayShow(true);
    setreciptdata(apiData.userpayments);
    console.log(apiData);
  };

  const payhandleClose = () => {
    setpayShow(false);
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

  const [apitestTrainerData, settestApiTrainerData] = useState([]);

  // Test api
  const callTestApiData = async (e) => {
    await CrmService.getTrainerList()
      .then((response) => {
        settestApiTrainerData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
        setErrors(err.message);
      });
  };

  useEffect(() => {
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

  const handletrainedit = (rowTrainData) => {
    setEditTrainShow(true);
    setselectedtraindata(rowTrainData);
    setupdatedtraindata({ ...rowTrainData });
  };

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
    let uuid = localStorage.getItem("uuid");
    let editBody = {
      email: updatedtraindata.email,
      firstname: updatedtraindata.name,
      lastname: "",
      usertype: 1, //userType Id
      createdby: uuid, // Logged in User unique ID
      userid: selectedtraindata.id,
      company: updatedtraindata.companyname,
      primaryphone: updatedtraindata.mobilenumber,
      course: updatedtraindata.courseId, //course id
      // payment mode ID
      paymentmode: updatedtraindata.paymentmode,
      paymentdetails: updatedtraindata.paymentdetails, // Account no. or Gpay no.
      ifsccode: updatedtraindata.ifsccode, // ifsc code if bank selected or else give empty
      password: updatedtraindata.password,
    };
    await CrmService.editTrainer(editBody)
      .then((response) => {
        alert("Updated");
        setEditTrainShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
    callTestApiData();
  };

  // delete trainer
  const [deleteKey, setdeleteKey] = useState(null);
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [deletepaymentpopup, setdeletepaymentpopup] = useState();

  const deleteTrainerData = (data) => {
    setdeletePopUp(true);
    setdeleteKey(data.uuid);
  };

  const confirmDelete = async () => {
    let uuid = localStorage.getItem("uuid");
    let body = {
      userid: deleteKey, // user UUID
      modifiedby: uuid, // Logged in User unique ID
    };
    await CrmService.deleteReferral(body)
      .then((response) => {
        alert("Deleted Successfully");
        setdeletePopUp(false);
      })
      .catch((error) => {
        console.log(error);
      });
    callTestApiData();
    setdeleteKey(null);
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
    let uuid = localStorage.getItem("uuid");
    let body = {
      email: email,
      firstname: name,
      lastname: "",
      usertype: 1, //userType Id
      createdby: uuid, // Logged in User unique ID
      userid: 0,
      company: companyname,
      primaryphone: mobilenumber,
      course: course, //course id
      paymentmode: paymentmode, // payment mode ID
      paymentdetails: paymentdetails, // Account no. or Gpay no.
      ifsccode: ifsccode, // ifsc code if bank selected or else give empty
      password: password,
    };
    console.log(body);
    if (password !== confirmpassword) {
      setErrors("Password Should Be Same");
    } else {
      await CrmService.createReferralOrTrainer(body)
        .then((response) => {
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
        });
    }

    callTestApiData();
  };

  // trainer payment

  const submitTrainerPay = async (e) => {
    let uuid = localStorage.getItem("uuid");
    e.preventDefault();
    let body = {
      id: 0, // for create give ID as 0 for edit give ID as Receipt ID(SRP_ID)
      userid: paymetuserdata.uuid, // user unique UUID
      receivedAmount: useramount,
      paymentMode: receiptpaymentmode, // payment mode paym id
      refNumber: transitionID,
      paymentDate: paymentDate, // payment date
      createdBy: uuid,
    };

    await CrmService.createPymentDetails(body)
      .then((response) => {
        alert("Payment updated Successfully");
        setpayShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };

  // delete payment history

  const [deletepay, setDeletePay] = useState(null);
  const deleteHistory = async (data) => {
    setdeletepaymentpopup(true);
    setDeletePay(data.UPR_ID);
  };

  const deletePaymentHistroy = async () => {
    let uuid = localStorage.getItem("uuid");
    let body = {
      transactionId: deletepay,
      userid: paymetuserdata.uuid, // user unique UUID
      modifiedby: uuid, // logged in users unqiue uuID
    };
    await CrmService.deletePaymentDetails(body).then((response) => {
      setdeletepaymentpopup(false);

      setpayShow(false);
    });

    callTestApiData();
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
                              name="ifscCode"
                              placeholder="Enter IFSC Code"
                              autoComplete="off"
                              value={ifsccode}
                              onChange={(e) => setifsccode(e.target.value)}
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
                            <option value="" disabled selected>
                              Course
                            </option>
                            {courseList.map((courseData) => (
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
                        {updatedtraindata.paymentmode == "3" && (
                          <div className="inputstudent">
                            <input
                              type="text"
                              name="ifsccode"
                              placeholder="Enter IFSC Code"
                              autoComplete="off"
                              value={updatedtraindata.ifsccode}
                              onChange={testhandlechange}
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
                            value={updatedtraindata.courseId}
                            onChange={(e) => {
                              setupdatedtraindata({
                                ...updatedtraindata,
                                courseId: e.target.value,
                              });
                            }}
                          >
                            <option value="none">Course</option>
                            {courseList.map((courseData) => (
                              <option
                                key={courseData.COURSE_ID}
                                value={courseData.COURSE_ID}
                              >
                                {courseData.COURSE_NAME}
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
                            .filter((apiTrainerData) => {
                              return search.toLowerCase() == ""
                                ? apiTrainerData
                                : apiTrainerData.name
                                    .toLowerCase()
                                    .includes(search);
                              // ||
                              // apiTrainerData.name.includes(search) ||
                              // apiTrainerData.course
                              //   .toLowerCase()
                              //   .includes(search) ||
                              // apiTrainerData.course.includes(search);
                            })
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
                                    {apiTrainerData.courseName}
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
                                    {apiTrainerData.paymentmodename}
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
                                    <BiDollar
                                      id="pay-icon"
                                      onClick={() => handlepay(apiTrainerData)}
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

      {/* Modal for Payment */}
      <Modal
        data={apitestTrainerData}
        show={payShow}
        onHide={payhandleClose}
        className="mods"
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: " #002333 ", color: "white" }}>
          <Modal.Title style={{ color: "white" }}> Payment Details</Modal.Title>

          <CloseButton variant="white" onClick={payhandleClose} />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitTrainerPay}>
            <div className="input-field">
              <div className="row1">
                <div className="inputref">
                  <select
                    id="paymentmode"
                    name="paymentmode"
                    className="referaldropdown"
                    required
                    value={receiptpaymentmode}
                    onChange={(e) => setReceiptpaymentmode(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Payment Mode
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
                <div className="inputref">
                  <input
                    type="text"
                    id="input-amount"
                    name="amount"
                    placeholder="Amount to pay"
                    autoComplete="new-password"
                    value={useramount}
                    onChange={(e) => {
                      setuseramount(e.target.value);
                    }}
                    required
                  ></input>
                </div>
              </div>
              <div className="row2">
                <div className="paymentDate">
                  <label
                    id="strt"
                    htmlFor="startdate"
                    className="text-muted pymtdate"
                  >
                    PaymentDate
                  </label>
                  <input
                    type="date"
                    id="startdate"
                    name="paymentdate"
                    placeholder="Start date"
                    value={paymentDate}
                    onChange={(e) => {
                      setPaymentDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="inputref">
                  <input
                    type="text"
                    id="input-transitionid"
                    name="TransitionID"
                    placeholder="Transition ID"
                    autoComplete="new-password"
                    value={transitionID}
                    onChange={(e) => {
                      settransitionID(e.target.value);
                    }}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="butn">
              <button type="submit" id="btn-createrefmodal">
                Create
              </button>
              <button
                variant="secondary"
                id="btn-createrefmodal"
                onClick={payhandleClose}
              >
                Close
              </button>
            </div>
          </form>
          <div className="payment-table">
            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "3%" }}>
              <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "lightblue" }}>
                      {payment.map((payment) => (
                        <TableCell
                          key={payment.id}
                          align={payment.align}
                          style={{
                            backgroundColor: " #002333",
                            color: "#ffffff",
                            fontSize: "18px",
                          }}
                        >
                          {payment.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reciptdata
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      // .filter((apiData) => {
                      //   return search.toLowerCase() === ""
                      //     ? apiData
                      //     : apiData.name.toLowerCase().includes(search) ||
                      //         apiData.name.includes(search);
                      // })
                      .map((apiData) => {
                        return (
                          <TableRow key={apiData.UPR_ID} hover role="checkbox">
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                              // onClick={() => opnetable(apiData)}
                            >
                              {apiData.paymentmethod.PAYM_NAME}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                              // onClick={() => opnetable(apiData)}
                            >
                              {apiData.UPR_CREATED_DATE}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                              // onClick={() => opnetable(apiData)}
                            >
                              {apiData.UPR_AMOUNT}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                              // onClick={() => opnetable(apiData)}
                            >
                              {apiData.UPR_PAYMENT_REF_NUMBER}
                            </TableCell>

                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              <MdDelete
                                id="dlt-icon"
                                onClick={() => deleteHistory(apiData)}
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
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal for want to delete Payhistory */}
      <Modal
        show={deletepaymentpopup}
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
          <h5>Are You sure want to delete receipt ? </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deletePaymentHistroy}>
            Okay
          </Button>
          <Button
            variant="secondary"
            id="btn-createrefmodal"
            onClick={() => setdeletepaymentpopup(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
