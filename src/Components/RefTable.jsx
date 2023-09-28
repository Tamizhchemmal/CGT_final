import Form from "react-bootstrap/Form";
import React, { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";
import { Card } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
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
    id: "Edit/Delete",
    label: "Edit/Delete",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

// const rows = [];

export default function RefTable({ search, referralCount }) {
  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  const [email, setEmail] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRef, setShowref] = useState([]);

  const handleShow = () => {};

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

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [alertt, setAlertt] = useState(null);
  const [paymentdetails, setPaymentdetails] = useState("");
  const [reEnterDetails, setreEnterDetails] = useState("");
  const [paymentmode, setPaymentmode] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [apiData, setApiData] = useState([]);

  const callApiData = async (e) => {
    const refData = await axios.get(
      "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData"
    );
    setApiData(refData.data);
  };

  useEffect(() => {
    callApiData();
  }, []);

  const [show, setShow] = useState(false);

  const naviagte = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const [editRefShow, setEditRefShow] = useState(false);

  const edithandleClose = () => {
    setEditRefShow(false);
    setErrors("");
  };

  const opnetable = (apiData) => {
    setShowref(apiData);
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    setShowModal(false);
  };

  const [editedRefData, setEditedRefData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    companyname: "",
    mobilenumber: "",
    paymentdetails: "",
    paymentmode: "",
    reEnterDetails: "",
    ifscCode: "",
  });

  const handlerefedit = (rowRefData) => {
    console.log(rowRefData);
    setEditRefShow(true);
    setEditedRefData({
      ...rowRefData,
    });
  };

  const [deleteKey, setdeleteKey] = useState(null);
  const [deletePopUp, setdeletePopUp] = useState(false);
  // Delete Referral
  const deleteref = (id) => {
    setdeletePopUp(true);
    setdeleteKey(id);
  };

  const confirmDelete = async () => {
    await axios.delete(
      "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData/" + deleteKey
    );
    callApiData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  const [errors, setErrors] = useState("");

  const submitRefEdit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setErrors("Password should be same");
    } else if (paymentdetails !== reEnterDetails) {
      setErrors("Payment Details should be same");
    } else {
      const refResponse = await axios.put(
        "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData/" +
          editedRefData.id,
        editedRefData
      );

      console.log(refResponse.data);

      setEditRefShow(false);
    }
  };

  var count;

  const Type = ({ count }) => {
    if (count <= 10) {
      return <div>Silver</div>;
    } else if ((count) => 10) {
      return <div>Gold</div>;
    }
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
                          {/* 12 */}
                          {referralCount}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => opnetable(apiData)}
                        >
                          {/* <Type count={15} /> */}
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
                            onClick={() => deleteref(apiData.id)}
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
          data={apiData}
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
                      value={editedRefData.name}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          name: e.target.value,
                        })
                      }
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
                      value={editedRefData.mobilenumber}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          mobilenumber: e.target.value,
                        })
                      }
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
                      value={editedRefData.email}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          email: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  <div className="inputref">
                    <input
                      type="text"
                      id="input-comp"
                      name="companyname"
                      placeholder="Company Name"
                      autoComplete="off"
                      value={editedRefData.companyname}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          companyname: e.target.value,
                        })
                      }
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
                      value={editedRefData.password}
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
                      value={editedRefData.confirmpassword}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          confirmpassword: e.target.value,
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div>
                    <select
                      id="paymentmode"
                      name="paymentmode"
                      className="referaldropdown"
                      required
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          paymentmode: e.target.value,
                        })
                      }
                      value={editedRefData.paymentmode}
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

                  {editedRefData.paymentmode === "BANK ACCOUNT" && (
                    <div className="inputstudent">
                      <input
                        type="text"
                        name="paymentdetails"
                        placeholder="Enter IFSC Code"
                        autoComplete="off"
                        value={editedRefData.ifscCode}
                        onChange={(e) =>
                          setEditedRefData({
                            ...editedRefData,
                            ifscCode: e.target.value,
                          })
                        }
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
                      value={editedRefData.paymentdetails}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          paymentdetails: e.target.value,
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div className="inputstudent">
                    <input
                      type="text"
                      name="paymentdetails"
                      placeholder="ReEnter Payment Details"
                      autoComplete="off"
                      value={editedRefData.reEnterDetails}
                      onChange={(e) =>
                        setEditedRefData({
                          ...editedRefData,
                          reEnterDetails: e.target.value,
                        })
                      }
                      required
                    ></input>
                  </div>
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
    </>
  );
}
