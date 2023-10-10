import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";

import CrmService from "../API/CrmService";

import { Modal, Button, CloseButton } from "react-bootstrap";

import { BiSolidMessageSquareEdit, BiDollar } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modalpopup from "./Modalpopup";

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
    id: "noofreferral",
    label: "No of Referrals",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "referraltype",
    label: "Referral Type",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Edit/Delete/Pay",
    label: "Edit/Delete",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

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

export default function RefTable({ search, referralCount }) {
  const [showModal, setShowModal] = useState(false);
  const [showRef, setShowref] = useState([]);
  //payment Trasaction
  const [payShow, setpayShow] = useState(false);
  const [paymentDate, setPaymentDate] = useState([]);
  const [useramount, setuseramount] = useState("");
  const [transitionID, settransitionID] = useState("");
  const [receiptpaymentmode, setReceiptpaymentmode] = useState("");

  const [paymentmodelist, setPaymentList] = useState([]);
  const [reciptdata, setreciptdata] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [paymetuserdata, setPaymentuserdata] = useState([]);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [apiData, setApiData] = useState([]);

  const callapiPayment = async (e) => {
    CrmService.userLoggedIn();
    await CrmService.getPaymentmode()
      .then((response) => {
        setPaymentList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const callApiData = async (e) => {
    CrmService.userLoggedIn();

    await CrmService.getReferalList()
      .then((response) => {
        console.log(response);
        setApiData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callApiData();
    callapiPayment();
  }, []);

  const [editRefShow, setEditRefShow] = useState(false);

  const edithandleClose = () => {
    setEditRefShow(false);
    setErrors("");
  };

  const opnetable = (apiData) => {
    setShowref(apiData);
    setShowModal(true);
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

  const handleCloseModal = (e) => {
    setShowModal(false);
  };
  const [selectedrefdata, setselectedrefdata] = useState({});
  const [updatedrefdata, setupdatedrefdata] = useState({});

  const handlerefedit = (rowRefData) => {
    console.log(rowRefData);
    setEditRefShow(true);
    setselectedrefdata(rowRefData);
    setupdatedrefdata({ ...rowRefData });
  };

  const testhandlechange = (e) => {
    const { name, value } = e.target;
    setupdatedrefdata({
      ...updatedrefdata,
      [name]: value,
    });
  };
  const [deleteKey, setdeleteKey] = useState("");
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [deletepaymentpopup, setdeletepaymentpopup] = useState(false);

  // Delete Referral
  const deleteref = (data) => {
    setdeletePopUp(true);
    setdeleteKey(data.uuid);
  };

  const confirmDelete = async () => {
    let body = {
      userid: deleteKey, // user UUID
      modifiedby: "2225", // Logged in User unique ID
    };

    CrmService.userLoggedIn();
    await CrmService.deleteReferral(body)
      .then((response) => {
        console.log(response);
        alert("deleted");
      })
      .catch((error) => {
        console.log(error);
      });

    callApiData();

    setdeletePopUp(false);
  };

  const [errors, setErrors] = useState("");

  const submitRefEdit = async (e) => {
    e.preventDefault();
    let editBody = {
      email: updatedrefdata.email,
      firstname: updatedrefdata.name,
      lastname: "",
      usertype: 1, //userType Id
      createdby: 123, // Logged in User unique ID
      userid: selectedrefdata.id,
      company: updatedrefdata.companyname,
      primaryphone: updatedrefdata.mobilenumber,
      course: "", //course id

      paymentmode: updatedrefdata.paymentmode, // payment mode ID
      paymentdetails: updatedrefdata.paymentdetails, // Account no. or Gpay no.
      ifsccode: updatedrefdata.ifscCode, // ifsc code if bank selected or else give empty
      password: updatedrefdata.password,
    };
    await CrmService.editTrainer(editBody)
      .then((response) => {
        console.log(response);
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    setEditRefShow(false);
  };

  // delete payment history

  const [deletepay, setDeletePay] = useState(null);
  const deleteHistory = async (data) => {
    setdeletepaymentpopup(true);
    setDeletePay(data.UPR_ID);
  };

  const deletePaymentHistroy = async () => {
    let body = {
      transactionId: deletepay,
      userid: paymetuserdata.uuid, // user unique UUID
      modifiedby: "123", // logged in users unqiue uuID
    };
    await CrmService.deletePaymentDetails(body).then((response) => {
      console.log(response);
      setdeletepaymentpopup(false);

      setpayShow(false);
    });

    callApiData();
  };

  const getType = (count) => {
    console.log("count", count);
    if (count >= 4) {
      return <div className="gold">Gold</div>;
    } else if (count < 4) {
      return <div className="silver">silver</div>;
    }
  };

  // submit payment
  const submitRefPay = async (e) => {
    e.preventDefault();
    let body = {
      id: 0, // for create give ID as 0 for edit give ID as Receipt ID(SRP_ID)
      userid: paymetuserdata.uuid, // user unique UUID
      receivedAmount: useramount,
      paymentMode: receiptpaymentmode, // payment mode paym id
      refNumber: transitionID,
      paymentDate: paymentDate, // payment date
      createdBy: 123,
    };

    await CrmService.createPymentDetails(body)
      .then((response) => {
        console.log(response);
        alert("Payment updated Successfully");
        setpayShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };

  return (
    <>
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
                {apiData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  // .filter((apiData) => {
                  //   return search.toLowerCase() === ""
                  //     ? apiData
                  //     : apiData.name.toLowerCase().includes(search) ||
                  //         apiData.name.includes(search);
                  // })
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
                          {/* 12 */}
                          {apiData.referralStudents.length}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          {getType(apiData.referralStudents.length)}
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
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={apiData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* Edit */}
        <Modal
          className="mods"
          show={editRefShow}
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
              Update Referral
            </Modal.Title>

            <CloseButton variant="white" onClick={edithandleClose} />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submitRefEdit}>
              <div className="inputref-box">
                <div className="student-grid">
                  <div className="inputref">
                    <input
                      type="text"
                      id="input-name"
                      name="name"
                      placeholder="Fullname"
                      autoComplete="new-password"
                      value={updatedrefdata.name}
                      onChange={testhandlechange}
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
                      value={updatedrefdata.mobilenumber}
                      onChange={testhandlechange}
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
                      value={updatedrefdata.email}
                      onChange={(e) => {
                        setupdatedrefdata({
                          ...updatedrefdata,
                          email: e.target.value,
                        });
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
                      value={updatedrefdata.companyname}
                      onChange={testhandlechange}
                      required
                    ></input>
                  </div>
                  {/* <div className="inputref">
                    <input
                      type="Password"
                      id="input-pwd"
                      name="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={updatedrefdata.password}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          password: e.target.value,
                        })
                      }
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
                      value={updatedrefdata.confirmpassword}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          confirmpassword: e.target.value,
                        })
                      }
                      required
                    ></input>
                  </div> */}
                  <div className="inputref">
                    <select
                      id="paymentmode"
                      name="paymentmode"
                      className="referaldropdown"
                      required
                      value={updatedrefdata.paymentmode}
                      onChange={testhandlechange}
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
                  {updatedrefdata.paymentmode == "3" && (
                    <div className="inputref">
                      <input
                        type="text"
                        name="ifscCode"
                        placeholder="Enter IFSC Code"
                        autoComplete="off"
                        value={updatedrefdata.ifsccode}
                        onChange={testhandlechange}
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
                      value={updatedrefdata.paymentdetails}
                      onChange={testhandlechange}
                      required
                    ></input>
                  </div>
                  {/* <div className="inputstudent">
                    <input
                      type="text"
                      name="paymentdetails"
                      placeholder="ReEnter Payment Details"
                      autoComplete="off"
                      value={updatedrefdata.reEnterDetails}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          reEnterDetails: e.target.value,
                        })
                      }
                      required
                    ></input>
                  </div> */}
                </div>
              </div>

              {/* {errors ? (
                <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
              ) : (
                ""
              )} */}
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
        {/* model profile */}
      </div>
      {showRef && (
        <Modalpopup
          id={apiData.id}
          user={showRef}
          showmodal={showModal}
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
        data={apiData}
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
          <form onSubmit={submitRefPay}>
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
          {/* Payment mode */}

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
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
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
                count={reciptdata.length}
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
