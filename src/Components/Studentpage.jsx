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
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";

import { FcSearch } from "react-icons/fc";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

import { BiSolidMessageSquareEdit, BiDollar } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CrmService from "../API/CrmService.js";

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
  {
    id: "action",
    label: "Delete",
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

  const [courseList, setCourseList] = useState([]);

  const [paymentmodelist, setPaymentList] = useState([]);

  const [batchCode, setBatchCode] = useState("");
  const [paymentstudentdata, setpaymentstudentdata] = useState([]);

  const [paymentDate, setPaymentDate] = useState([]);

  // payment
  const [payShow, setpayShow] = useState(false);
  const [studentpaymentDate, setstudentPaymentDate] = useState([]);
  const [studentamount, setstudentamount] = useState("");
  const [transitionID, settransitionID] = useState("");
  const [receiptpaymentmode, setReceiptpaymentmode] = useState("");
  const [reciptdata, setreciptdata] = useState([]);

  // referral amounts state
  const [referralPaid, setreferralPaid] = useState("");

  const [referralAmount, setreferralAmount] = useState("");
  const [referralPaidList, setreferralPaidList] = useState([
    {
      id: 0,
      value: "Not Paid",
    },
    {
      id: 1,
      value: "Paid",
    },
  ]);

  const handleStudentClose = () => {
    setShow(false);
  };
  const handleStudentShow = () => {
    setShow(true);
  };

  // Student Table Content

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const callapiPayment = async (e) => {
    await CrmService.getPaymentmode()
      .then((response) => {
        setPaymentList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [apiStudentData, setApiStudentData] = useState([]);
  const [batchData, setbatchData] = useState([]);

  const callApiStudentData = async (e) => {
    await CrmService.getStudentList()
      .then((response) => {
        setApiStudentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // batch data for dropdown
  const callapibatchdata = async (e) => {
    await CrmService.getbatch()
      .then((response) => {
        setbatchData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    await CrmService.getCourse()
      .then((response) => {
        setCourseList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [referralData, setreferralData] = useState([]);

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

  // delete student
  const [deleteKey, setdeleteKey] = useState(null);
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [deletepaymentpopup, setdeletepaymentpopup] = useState(false);

  const deletestudentData = (data) => {
    setdeletePopUp(true);
    setdeleteKey(data);
  };

  const confirmstudentDelete = async () => {
    let uuid = localStorage.getItem("uuid");
    CrmService.userLoggedIn();
    let body = {
      studentid: deleteKey,
      modifiedby: uuid, // Logged in User unique ID
    };

    await CrmService.deleteStudent(body)
      .then((response) => {
        alert("Students Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    callApiStudentData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  // Pay
  const handlepay = (apiStudentData) => {
    setpayShow(true);
    setpaymentstudentdata(apiStudentData);
    setreciptdata(apiStudentData.studentpayments);
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
    let uuid = localStorage.getItem("uuid");

    const refid = referral == "" ? 0 : referral;

    let body = {
      email: email,
      name: name,
      createdby: uuid, // Logged in User unique ID
      company: "",
      primaryphone: mobilenumber,
      passedoutyear: yearofpassedout,
      startDate: "2023-10-12",
      endDate: "2023-10-12",
      totalFees: totalfees,
      paidFees: feespaid,
      college: college,
      degree: degree,
      paymentMode: "",
      referralId: refid, // call get referral list API and use the primary key of referral data

      batchId: batchCode, // call get batch list API and use the primary key of batch data

      trainerId: "", // call get trainer list API and use the primary key of trainer data

      courseId: course, // call get course list API and use the primary key of course data
      referralPaid: referralPaid, // call get
      referralAmount: referralAmount, // call get
    };
    await CrmService.createStudent(body)
      .then((response) => {
        alert("Student Created");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
    e.target.reset();
    callApiStudentData();
  };

  //Submit Edit

  const submitStudentEdit = async (e) => {
    let uuid = localStorage.getItem("uuid");
    e.preventDefault();
    let body = {
      studentid: selectedstudentdata.STUDENT_ID,
      email: updatedstudentdata.STUDENT_EMAIL,
      name: updatedstudentdata.STUDENT_NAME,
      modifiedby: uuid, // Logged in User unique ID
      company: "",
      primaryphone: updatedstudentdata.STUDENT_PHONE,
      passedoutyear: updatedstudentdata.STUDENT_PASSED_YEAR,
      startDate: "2023-10-12",
      endDate: "2023-10-12",
      totalFees: updatedstudentdata.STUDENT_TOTAL_FEES,
      paidFees: updatedstudentdata.STUDENT_FEES_PAID,
      college: updatedstudentdata.STUDENT_COLLEGE,
      degree: updatedstudentdata.STUDENT_DEGREE,
      paymentMode: "",
      referralId: updatedstudentdata.STUDENT_REFERRAL_ID,
      batchId: updatedstudentdata.STUDENT_BATCH_ID,
      trainerId: updatedstudentdata.STUDENT_TRAINER_ID,
      courseId: updatedstudentdata.STUDENT_COURSE_ID,
      referralAmount: updatedstudentdata.STUDENT_REFERRAL_AMOUNT,
      referralPaid: updatedstudentdata.STUDENT_REFERRAL_PAID,
    };

    await CrmService.editstudent(body)
      .then((response) => {
        alert("Student Updated");
        setEditStudentShow(false);
      })
      .catch((err) => {
        console.log(err);
      });

    callApiStudentData();
  };

  // submit payment details
  const submitStudentPay = async (e) => {
    e.preventDefault();
    let uuid = localStorage.getItem("uuid");
    let body = {
      id: 0, // for create give ID as 0 for edit give ID as Receipt ID(SRP_ID)
      studentid: paymentstudentdata.STUDENT_ID, // student id
      receivedAmount: studentamount,
      paymentMode: receiptpaymentmode, // payment mode paym id
      refNumber: transitionID,
      paymentDate: studentpaymentDate, // payment date
      createdBy: uuid, // logged in users unqiue uuID
    };

    await CrmService.createStudentPymentDetails(body)
      .then((response) => {
        alert("Payment updated Successfully");
        setpayShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
    callapiPayment();
  };

  const [deletepay, setDeletePay] = useState(null);
  const deletestudentpay = async (data) => {
    setdeletepaymentpopup(true);
    setDeletePay(data.SRP_ID);
  };

  const deletestudentPaymentHistroy = async () => {
    let uuid = localStorage.getItem("uuid");
    let body = {
      transactionId: deletepay,
      studentid: studentpaymentDate.STUDENT_ID, // user unique UUID
      modifiedby: uuid, // logged in users unqiue uuID
    };
    await CrmService.deletestudentpaymentdetials(body)
      .then((response) => {
        setdeletepaymentpopup(false);

        setpayShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                      <div className="student-grid" id="studentFlex">
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
                        {/* <div className="inputstudent">
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
                        </div> */}
                        {/* <div className="paymentDate">
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
                        </div> */}
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
                            value={referral}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setReferral(
                                isNaN(selectedValue) ? 0 : selectedValue
                              );
                            }}
                          >
                            <option value="">Referral name</option>
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
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="referralAmount"
                            placeholder="Referral Amount"
                            autoComplete="off"
                            value={referralAmount}
                            onChange={(e) => {
                              setreferralAmount(e.target.value);
                            }}
                            required
                          ></input>
                        </div>
                        <div>
                          <select
                            id="referralPaid"
                            name="referralPaid"
                            className="referaldropdown"
                            required
                            value={referralPaid}
                            onChange={(e) => {
                              setreferralPaid(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Payment Status
                            </option>
                            {referralPaidList.map((Data) => (
                              <option key={Data.id} value={Data.id}>
                                {Data.value}
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
                                STUDENT_COLLEGE: e.target.value,
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
                        {/* <div className="inputstudent">
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
                        </div> */}
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
                        <div className="inputstudent">
                          <input
                            type="number"
                            name="referralAmount"
                            placeholder="Referral Amount"
                            autoComplete="off"
                            value={updatedstudentdata.STUDENT_REFERRAL_AMOUNT}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_REFERRAL_AMOUNT: e.target.value,
                              });
                            }}
                            required
                          ></input>
                        </div>
                        <div>
                          <select
                            id="referralPaid"
                            name="referralPaid"
                            className="referaldropdown"
                            required
                            value={updatedstudentdata.STUDENT_REFERRAL_PAID}
                            onChange={(e) => {
                              setupdatedstudentdata({
                                ...updatedstudentdata,
                                STUDENT_REFERRAL_PAID: e.target.value,
                              });
                            }}
                          >
                            <option value="" disabled selected>
                              Payment Status
                            </option>
                            {referralPaidList.map((Data) => (
                              <option key={Data.id} value={Data.id}>
                                {Data.value}
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
                            .filter((apiStudentData) => {
                              return search.toLowerCase() == ""
                                ? apiStudentData
                                : apiStudentData.STUDENT_NAME.toLowerCase().includes(
                                    search
                                  ) ||
                                    apiStudentData.STUDENT_NAME.includes(
                                      search
                                    );
                              // ||
                              // apiStudentData.course
                              //   .toLowerCase()
                              //   .includes(search) ||
                              // apiStudentData.course.includes(search);
                            })
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
          <Button variant="primary" onClick={confirmstudentDelete}>
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
                    value={studentamount}
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
                    value={studentpaymentDate}
                    onChange={(e) => {
                      setstudentPaymentDate(e.target.value);
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
                          <TableRow key={apiData.SRP_ID} hover role="checkbox">
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              {apiData.paymentmethod.PAYM_NAME}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              {apiData.SRP_CREATED_DATE}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              {apiData.SRP_AMOUNT}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              12
                              {apiData.SRP_PAYMENT_REF_NUMBER}
                            </TableCell>

                            <TableCell
                              align="center"
                              id="table-body"
                              style={{ fontSize: 16 }}
                            >
                              <MdDelete
                                id="dlt-icon"
                                onClick={() => deletestudentpay(apiData)}
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
          <Button variant="primary" onClick={deletestudentPaymentHistroy}>
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

export default Studentpage;
