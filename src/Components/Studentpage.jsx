import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import "../Css/Referralstyle.css";
import { Card } from "@mui/material";
import StudentPopUp from "./StudentPopUp";
import {
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
  ModalTitle,
  CloseButton,
  Navbar,
} from "react-bootstrap";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidMessageSquareEdit, BiDollar } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CrmService from "../API/CrmService.js";
import { log } from "util";

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
    id: "batch",
    label: "Batch Code",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paymentdate",
    label: "Payment Date",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "feespaid",
    label: "Fees Paid",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pendingfees",
    label: "Pending Fees",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalfees",
    label: "Total Fees",
    minWidth: 170,
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

// payement table
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
];

function Studentpage() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [tableshow, setTableshow] = useState(false);
  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [yearofpassedout, setYearofpassedout] = useState("");
  const [feespaid, setFeespaid] = useState("");
  const [pendingfees, setPendingfees] = useState("");
  const [totalfees, setTotalfees] = useState("");
  const [college, setcollege] = useState("");
  const [degree, setDegree] = useState("");
  const [referral, setReferral] = useState("");
  const [paymentmode, setPaymentMode] = useState("");

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStudent, setShowStudent] = useState([]);

  const [errors, setErrors] = useState("");

  const [refList, setRefList] = useState([
    {
      id: 1,
      name: "Tamizh",
    },
    {
      id: 2,
      name: "Karthik",
    },
    {
      id: 3,
      name: "Patrick",
    },
  ]);

  const [courseList, setCourseList] = useState([]);

  const [paymentmodelist, setPaymentList] = useState([]);

  const [batchCode, setBatchCode] = useState("");

  // const [paymentDate, setPaymentDate] = useState([]);

  // payment
  const [payShow, setpayShow] = useState(false);
  const [paymentDate, setPaymentDate] = useState([]);
  const [studentamount, setstudentamount] = useState("");
  const [transitionID, settransitionID] = useState("");

  const handleStudentClose = () => {
    setShow(false);
  };
  const handleStudentShow = () => {
    setShow(true);
  };

  // Student Table Content

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
  };

  // const callTestApiData = async (e) => {
  //   await CrmService.getStudent().then((response) => {
  //     console.log(response.data);
  //   });
  // };
  // useEffect(() => {
  //   // callTestApiData();
  // }, []);

  const [apiStudentData, setApiStudentData] = useState([]);
  const [batchData, setbatchData] = useState([]);

  const callApiStudentData = async (e) => {
    // const studentData = await axios.get(
    //   "https://64bea16d5ee688b6250cba32.mockapi.io/StudentData"
    // );
    // setApiStudentData(studentData.data);

    await CrmService.getStudentList().then((response) => {
      console.log(response.data);
      setApiStudentData(response.data);
    });
  };

  // batch data for dropdown
  const callapibatchdata = async (e) => {
    await CrmService.getbatch().then((response) => {
      setbatchData(response.data);
    });

    await CrmService.getCourse().then((response) => {
      setCourseList(response.data);
    });
  };

  const [referralData, setreferralData] = useState([]);
  // Referral data dropdown

  const callapireferraldata = async (e) => {
    await CrmService.getReferalList()
      .then((response) => {
        setreferralData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    callApiStudentData();
    callapibatchdata();
    callapireferraldata();
    callapiPayment();
  }, []);

  // const [editedStudentData, setEditedStudentData] = useState({
  //   name: "",
  //   email: "",
  //   course: "",
  //   mobilenumber: "",
  //   yearofpassedout: "",
  //   paymentDate: "",
  //   endDate: "",
  //   totalfees: "",
  //   feespaid: "",
  //   pendingfees: "",
  //   college: "",
  //   degree: "",
  //   referral: "",
  //   paymentmode: "",
  // });

  // delete student
  const [deleteKey, setdeleteKey] = useState(null);
  const [deletePopUp, setdeletePopUp] = useState(false);

  const deletestudentData = (data) => {
    setdeletePopUp(true);
    setdeleteKey(data.STUDENT_ID);
  };

  const confirmDelete = async () => {
    let body = {
      studentid: deleteKey,
      modifiedby: "123", // Logged in User unique ID
    };

    await CrmService.deleteStudent(body).then((response) => {
      console.log(response);
    });
    callApiStudentData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  // Pay
  const handlepay = (id) => {
    setpayShow(true);
  };

  const payhandleClose = () => {
    setpayShow(false);
  };

  const edithandleClose = (e) => {
    setEditStudentShow(false);
    setErrors("");
  };

  const openStudentTable = (apiStudentData) => {
    setShowStudent(apiStudentData);
    setShowStudentModal(true);
  };

  const handleCloseModal = (e) => {
    setShowStudentModal(false);
  };
  const [selectedstudentdata, setselectedstudentdata] = useState({});
  const [updatedstudentdata, setupdatedstudentdata] = useState({});

  const [editStudentShow, setEditStudentShow] = useState(false);

  const handlestudentedit = (rowStudentData) => {
    setEditStudentShow(true);
    setselectedstudentdata(rowStudentData);
    setupdatedstudentdata({ ...rowStudentData });
    console.log(rowStudentData);
  };
  const testhandlechange = (e) => {
    const { value } = e.target;
    setupdatedstudentdata({
      ...updatedstudentdata,
      [name]: value,
    });
    console.log(updatedstudentdata);
  };
  // get batch name in Table
  const getbatchname = (id) => {
    const batch = batchData.find((batch) => batch.BATCH_ID == id);
    return batch ? batch.BATCH_CODE : "unknown";
  };

  // get Course name in Table
  const getcoursename = (id) => {
    const course = courseList.find((course) => course.COURSE_ID == id);
    return course ? course.COURSE_NAME : "unknown";
  };
  const submitStudent = async (e) => {
    e.preventDefault();

    let body = {
      email: email,
      name: name,
      createdby: 224, // Logged in User unique ID
      company: "",
      primaryphone: mobilenumber,
      passedoutyear: yearofpassedout,
      startDate: paymentDate,
      endDate: paymentDate,
      totalFees: totalfees,
      paidFees: feespaid,
      college: college,
      degree: degree,
      paymentMode: paymentmode,
      referralId: referral, // call get referral list API and use the primary key of referral data

      batchId: batchCode, // call get batch list API and use the primary key of batch data

      trainerId: "", // call get trainer list API and use the primary key of trainer data

      courseId: course, // call get course list API and use the primary key of course data
    };
    await CrmService.createStudent(body).then((response) => {
      console.log(response);
    });

    // await axios.post(
    //   "https://64bea16d5ee688b6250cba32.mockapi.io/StudentData",
    //   {
    //     name,
    //     email,
    //     course,
    //     mobilenumber,
    //     yearofpassedout,
    //     totalfees,
    //     feespaid,
    //     pendingfees,
    //     college,
    //     degree,
    //     referral,
    //     paymentmode,
    //     batchCode,
    //     paymentDate,
    //   }
    // );

    alert("Student Created");
    e.target.reset();
    // callApiStudentData();
    setShow(false);
  };

  //Submit Edit

  const submitStudentEdit = async (e) => {
    e.preventDefault();
    let body = {
      studentid: selectedstudentdata.STUDENT_ID,
      email: updatedstudentdata.STUDENT_EMAIL,
      name: updatedstudentdata.STUDENT_NAME,
      modifiedby: 123, // Logged in User unique ID
      company: "",
      primaryphone: updatedstudentdata.STUDENT_PHONE,
      passedoutyear: updatedstudentdata.STUDENT_PASSED_YEAR,
      startDate: selectedstudentdata.STUDENT_STARTED_DATE,
      endDate: selectedstudentdata.STUDENT_END_DATE,
      totalFees: updatedstudentdata.STUDENT_TOTAL_FEES,
      paidFees: updatedstudentdata.STUDENT_FEES_PAID,
      college: updatedstudentdata.STUDENT_COLLEGE,
      degree: updatedstudentdata.STUDENT_DEGREE,
      paymentMode: updatedstudentdata.STUDENT_PAYMENT_MODE,
      referralId: updatedstudentdata.STUDENT_REFERRAL_ID,
      batchId: updatedstudentdata.STUDENT_BATCH_ID,
      trainerId: updatedstudentdata.STUDENT_TRAINER_ID,
      courseId: updatedstudentdata.STUDENT_COURSE_ID,
    };

    await CrmService.editstudent(body)
      .then((response) => {
        console.log(response);
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });

    setEditStudentShow(false);
    callApiStudentData();
  };

  // submit payment details
  const submitStudentPay = () => {};

  return (
    <>
      <div>
        <NavBar />
        <div className="crd-bg">
          <div className="card-refdetails">
            <Container>
              <div className="head-ref">
                <div id="heading-ref">Student List</div>

                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-around",
                  }}
                >
                  <div className="search-full">
                    <input
                      type="search"
                      placeholder="Search Student..."
                      id="searchbar-ref"
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <FcSearch id="search-icon" />
                  </div>{" "}
                  <button className="create ref" onClick={handleStudentShow}>
                    Create Student
                  </button>
                </div>
              </div>

              {/* /modal popup for student Creation */}
              <Modal
                show={show}
                className="mods"
                onHide={handleStudentClose}
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
                    Create Student Details
                  </Modal.Title>

                  <CloseButton variant="white" onClick={handleStudentClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    CREATE AN ACCOUNT FOR STUDENT
                  </ModalTitle>
                  <form onSubmit={submitStudent}>
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
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
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
                            onChange={(e) => {
                              setMobileNumber(e.target.value);
                            }}
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
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="yearofpassedout"
                            placeholder="Year Of PassedOut"
                            autoComplete="off"
                            value={yearofpassedout}
                            onChange={(e) => {
                              setYearofpassedout(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="college"
                            placeholder="College"
                            autoComplete="new-password"
                            value={college}
                            onChange={(e) => {
                              setcollege(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="degree"
                            placeholder="Degree"
                            autoComplete="new-password"
                            value={degree}
                            onChange={(e) => {
                              setDegree(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="totalfees"
                            placeholder="Total fees"
                            autoComplete="off"
                            value={totalfees}
                            onChange={(e) => {
                              setTotalfees(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="feespaid"
                            placeholder="Fees Paid"
                            autoComplete="off"
                            value={feespaid}
                            onChange={(e) => {
                              setFeespaid(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="pendingfees"
                            placeholder="Pending Fees"
                            autoComplete="off"
                            value={pendingfees}
                            onChange={(e) => {
                              setPendingfees(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <select
                            id="paymentmode"
                            name="paymentmode"
                            className="referaldropdown"
                            required
                            value={paymentmode}
                            onChange={(e) => setPaymentMode(e.target.value)}
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
                            name="startdate"
                            placeholder="Start date"
                            value={paymentDate}
                            onChange={(e) => {
                              setPaymentDate(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div>
                          <select
                            id="batchCode"
                            name="batchcode"
                            className="batchdropdown"
                            required
                            value={batchCode}
                            onChange={(e) => {
                              setBatchCode(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Batch Code
                            </option>
                            {batchData.map((data) => (
                              <option key={data.BATCH_ID} value={data.BATCH_ID}>
                                {data.BATCH_CODE}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            id="referralName"
                            name="referralname"
                            className="referaldropdown"
                            required
                            value={referral}
                            onChange={(e) => {
                              setReferral(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Referral name
                            </option>
                            {referralData.map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            id="courseName"
                            name="course"
                            className="referaldropdown"
                            required
                            value={course}
                            onChange={(e) => {
                              setCourse(e.target.value);
                            }}
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
                      </div>
                    </div>
                    <Modal.Footer className="modal-footer">
                      <button type="submit" id="btn-createrefmodal">
                        Create
                      </button>
                      <Button
                        variant="secondary"
                        id="btn-createrefmodal"
                        onClick={handleStudentClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>

              {/* Edit */}
              <Modal
                className="mods"
                show={editStudentShow}
                onHide={edithandleClose}
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
                    Update Student
                  </Modal.Title>

                  <CloseButton variant="white" onClick={edithandleClose} />
                </Modal.Header>
                <Modal.Body>
                  <ModalTitle style={{ textAlign: "center" }}>
                    Update AN STUDENT
                  </ModalTitle>
                  <form onSubmit={submitStudentEdit}>
                    <div className="inputref-box">
                      <div className="student-grid">
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="name"
                            placeholder="Fullname"
                            autoComplete="new-password"
                            value={updatedstudentdata.STUDENT_NAME}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_NAME: e.target.value,
                              });
                            }}
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
                            value={updatedstudentdata.STUDENT_PHONE}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PHONE: e.target.value,
                              });
                            }}
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
                            value={updatedstudentdata.STUDENT_EMAIL}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PHONE: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="yearofpassedout"
                            placeholder="Year Of PassedOut"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_PASSED_YEAR}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PASSED_YEAR: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="college"
                            placeholder="College"
                            autoComplete="new-password"
                            value={updatedstudentdata.STUDENT_COLLEGE}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PASSED_YEAR: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            id="input-name"
                            name="degree"
                            placeholder="Degree"
                            autoComplete="new-password"
                            value={updatedstudentdata.STUDENT_DEGREE}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_DEGREE: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="totalfees"
                            placeholder="Total fees"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_TOTAL_FEES}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_TOTAL_FEES: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="feespaid"
                            placeholder="Fees Paid"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_FEES_PAID}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_FEES_PAID: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="pendingfees"
                            placeholder="Pending Fees"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_PENDING_FEES}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PENDING_FEES: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="inputstudent">
                          <input
                            type="text"
                            name="paymentmode"
                            placeholder="Payment Mode"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_PAYMENT_MODE}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_PAYMENT_MODE: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        {/* <div style={{ marginLeft: "30px" }}>
                          <label
                            id="strt"
                            htmlFor="startdate"
                            className="text-muted"
                          >
                            Pay Date
                          </label>
                          <input
                            type="date"
                            id="startdate"
                            name="PaymentDate"
                            placeholder="Start date"
                            value={updatedstudentdata.paymentDate}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                paymentDate: e.target.value,
                              });
                            }}
                            required
                          />
                        </div> */}
                        <div>
                          <select
                            id="referralName"
                            name="referralname"
                            className="referaldropdown"
                            required
                            value={updatedstudentdata.STUDENT_REFERRAL_ID}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_REFERRAL_ID: e.target.value,
                              });
                            }}
                          >
                            <option value="none">Referral name</option>
                            {referralData.map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            id="courseName"
                            name="course"
                            className="referaldropdown"
                            required
                            value={updatedstudentdata.STUDENT_COURSE_ID}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_COURSE_ID: e.target.value,
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
                        <div>
                          <select
                            id="batchCode"
                            name="batchcode"
                            className="batchdropdown"
                            required
                            value={updatedstudentdata.STUDENT_BATCH_ID}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_BATCH_ID: e.target.value,
                              });
                            }}
                          >
                            <option value="" disabled selected>
                              Batch Code
                            </option>
                            {batchData.map((data) => (
                              <option key={data.BATCH_ID} value={data.BATCH_ID}>
                                {data.BATCH_CODE}
                              </option>
                            ))}
                          </select>
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
                        onClick={edithandleClose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>

              {/* Table for Student */}
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
                          {apiStudentData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            // .filter((apiStudentData) => {
                            //   return search.toLowerCase() === ""
                            //     ? apiStudentData
                            //     : apiStudentData.name
                            //         .toLowerCase()
                            //         .includes(search) ||
                            //         apiStudentData.name.includes(search) ||
                            //         apiStudentData.course
                            //           .toLowerCase()
                            //           .includes(search) ||
                            //         apiStudentData.course.includes(search);
                            // })
                            .map((apiStudentData) => {
                              return (
                                <TableRow
                                  key={apiStudentData.STUDENT_ID}
                                  hover
                                  role="checkbox"
                                >
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_NAME}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_PHONE}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_EMAIL}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {getcoursename(
                                      apiStudentData.STUDENT_COURSE_ID
                                    )}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {getbatchname(
                                      apiStudentData.STUDENT_BATCH_ID
                                    )}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_STARTED_DATE}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_FEES_PAID}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_PENDING_FEES}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                    onClick={() =>
                                      openStudentTable(apiStudentData)
                                    }
                                  >
                                    {apiStudentData.STUDENT_TOTAL_FEES}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="table-body"
                                    style={{ fontSize: 16 }}
                                  >
                                    <BiSolidMessageSquareEdit
                                      id="edit-icon"
                                      onClick={() =>
                                        handlestudentedit(apiStudentData)
                                      }
                                    />
                                    <MdDelete
                                      id="dlt-icon"
                                      onClick={() =>
                                        deletestudentData(apiStudentData)
                                      }
                                    />
                                    <BiDollar
                                      id="pay-icon"
                                      onClick={() => handlepay(apiStudentData)}
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
                      count={apiStudentData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  {/* model profile */}
                  <Modal
                    show={tableshow}
                    onHide={handleStudentClose}
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
                        Referral Profile
                      </Modal.Title>

                      <CloseButton
                        variant="white"
                        onClick={handleStudentClose}
                      />
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <Card
                          sx={{
                            display: "flex",
                            width: "100%",
                            height: "400px",
                            boxShadow: "rgba(66, 84, 102, 0.1) 0px 8px 25px ",
                          }}
                        >
                          <Card
                            sx={{
                              width: "50%",
                              height: "70%",
                              margin: "15px 15px",
                              boxShadow: "rgba(66, 84, 102, 0.3) 0px 8px 25px ",
                            }}
                          >
                            <div
                              style={{ margin: "10px 30px", fontSize: "18px" }}
                            >
                              Name : XXXX
                            </div>
                          </Card>
                        </Card>
                      </div>

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleStudentClose}
                        >
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
            </Container>
          </div>
        </div>
      </div>
      {showStudent && (
        <StudentPopUp
          id={apiStudentData.id}
          user={showStudent}
          showmodal={showStudentModal}
          onClosemodal={handleCloseModal}
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
        data={apiStudentData}
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
          <form onSubmit={submitStudentPay}>
            <div className="input-field">
              <div className="row1">
                <div className="inputref">
                  <select
                    id="paymentmode"
                    name="paymentmode"
                    className="referaldropdown"
                    required
                    value={paymentmode}
                    onChange={(e) => setPaymentMode(e.target.value)}
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
                    onChange={(e) => {
                      setstudentamount(e.target.value);
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
                    name="startdate"
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
                    {/* {apiData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((apiData) => {
                    return search.toLowerCase() === ""
                      ? apiData
                      : apiData.name.toLowerCase().includes(search) ||
                          apiData.name.includes(search);
                  })
                  .map((apiData) => {
                    return (
                      <TableRow key={apiData.id} hover role="checkbox">
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          {apiData.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          {apiData.mobilenumber}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          {apiData.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          12
                          {apiData.referralStudents.length}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          <Type count={15} />
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          <BiSolidMessageSquareEdit
                            id="edit-icon"
                            onClick={() => handlerefedit(apiData)}
                          />
                          <MdDelete
                            id="dlt-icon"
                            onClick={() => deleteref(apiData)}
                          />
                          <BiDollar
                            id="pay-icon"
                            onClick={() => handlepay(apiData)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={apiStudentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Studentpage;
