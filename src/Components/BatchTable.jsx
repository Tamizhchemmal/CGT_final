import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Css/HomePage.css";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { Modal, Button, ModalTitle, CloseButton } from "react-bootstrap";

import BatchPopUp from "./BatchPopUp";

import axios from "axios";

import { Card } from "@mui/material";

import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CrmService from "../API/CrmService";

const columns = [
  { id: "batchcode", label: "Batch Code", minWidth: 100, align: "center" },

  {
    id: "startdate",
    label: "Start Date",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "enddate",
    label: "End Date",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "trainername",
    label: "Trainer Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "active",
    label: "Active",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "",
    label: "Action",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function BatchTable({ search }) {
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchcode, setbatchcode] = useState("");
  const [numofstudent, setnumofstudent] = useState("");
  const [trainername, settrainername] = useState("");

  const [batchList, setBatchList] = useState([
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
      course: "UI & UX",
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

  const [batchNumber, setBatchNumber] = useState([
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

  const [batchMonth, setBatchMonth] = useState([
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

  const [show, setShow] = useState(false);

  const naviagte = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const edithandleClose = () => {
    setEditShow(false);
    setErrors("");
  };

  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [showBatch, setShowBatch] = useState([]);
  const [deletePopUp, setdeletePopUp] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const callApiData = async (e) => {
    // const batchData = await axios.get(
    //   "https://64b638a2df0839c97e1528f4.mockapi.io/batch"
    // );
    await CrmService.getbatch().then((response) => {
      console.log(response);
      setApiData(response.data);
    });
  };
  // trainer dropdown

  // const [trainerData, settrainerData] = useState([]);

  // const callapitrainerdata = async (e) => {
  //   const trainerData = await axios.get(
  //     "https://64b638a2df0839c97e1528f4.mockapi.io/trainers"
  //   );
  //   settrainerData(trainerData.data);
  // };

  useEffect(() => {
    callApiData();
  }, []);

  const openBatchTable = (apiData) => {
    setShowBatch(apiData);
    setShowBatchModal(true);
  };

  const handleBatchCloseModal = (e) => {
    setShowBatchModal(false);
  };

  const [deleteKey, setdeleteKey] = useState(null);
  // Delete Batch
  const deletebatch = (id) => {
    setdeletePopUp(true);
    setdeleteKey(id);
    console.log(id);
  };

  const confirmDelete = async () => {
    let body = {
      batchid: deleteKey,
      modifiedby: "123", // Logged in User unique ID
    };

    await CrmService.deleteBatch(body).then((response) => {
      console.log(response);
    });
    callApiData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  const [editedData, setEditedData] = useState({
    batchcode: "",
    selectedBatchTime: "",
    numofstudent: "",
    trainername: "",
    startBatchDate: "",
    endBatchDate: "",
  });

  //Edit Batch

  const handleedit = (rowData) => {
    setEditShow(true);
    setEditedData({
      ...rowData,
    });
  };

  const [startBatchDate, setStartBatchDate] = useState([]);
  const [endBatchDate, setEndBatchDate] = useState([]);

  //Date change
  const handleStartDateChange = (e, editedData) => {
    const selectedStartDate = new Date(e.target.value);
    const selectedEndDate = new Date(selectedStartDate);
    selectedEndDate.setMonth(selectedStartDate.getMonth() + 3);
    const sDate = e.target.value;
    setStartBatchDate(sDate);
    const eDate = selectedEndDate.toISOString().substr(0, 10);
    setEndBatchDate(eDate);

    setEditedData({ ...editedData, startBatchDate: e.target.value });
    setEditedData({ ...editedData, endBatchDate: e.target.value });

    //Search function
  };

  // batch active/not

  const [isActive, setisActive] = useState(false);

  const isDateWithRange = (startDate, endDate) => {
    const currentDate = new Date();
    let strtDate = new Date(startDate);
    let edDate = new Date(endDate);

    return currentDate >= strtDate && currentDate <= edDate;
  };

  const [selectedBatchTime, setSelectedBatchTime] = useState("");

  const handleTimeChange = (e) => {
    const btchTiming = e.target.value;
    setSelectedBatchTime(btchTiming);
  };

  var count;

  const submitEdit = async (event) => {
    event.preventDefault();

    const response = await axios.put(
      "https://64b638a2df0839c97e1528f4.mockapi.io/batch/" + editedData.id,
      editedData
    );

    console.log(response.data);

    setEditShow(false);
  };

  // combined dropdown values
  const batchCodeHandleChange = (e) => {
    const newValue = e.target.value;
    setBatchList(newValue);
    setEditedData({ ...editedData, newValue });
    combineDropdownValues(newValue, batchMonth, batchNumber);
  };

  const batchMonthHandleChange = (e) => {
    const newValue = e.target.value;
    setBatchMonth(newValue);
    setEditedData({ ...editedData, newValue });
    combineDropdownValues(batchList, newValue, batchNumber);
  };

  const batchNumberHandleChange = (e) => {
    const newValue = e.target.value;
    setBatchNumber(newValue);
    setEditedData({ ...editedData, newValue });
    combineDropdownValues(batchList, batchMonth, newValue);
  };

  const combineDropdownValues = (value1, value2, value3) => {
    const combined = `${value1}-${value2}-${value3}`;
    setbatchcode(combined);
  };

  // gettrainer name
  const gettrainername = (trainerinfo) => {
    const arr = trainerinfo;
    if (arr["UI_FIRST_NAME"] === undefined) {
      return `typeof ${arr["UI_FIRST_NAME"]}`;
    } else {
      return arr["UI_FIRST_NAME"];
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
                  // .filter((apiData) => {
                  //   return search.toLowerCase() === ""
                  //     ? apiData
                  //     : apiData.trainername.toLowerCase().includes(search) ||
                  //         apiData.batchcode.toLowerCase().includes(search);
                  // })
                  .map((apiData) => {
                    return (
                      <TableRow key={apiData.BATCH_ID} hover role="checkbox">
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => openBatchTable(apiData)}
                        >
                          {apiData.BATCH_CODE}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => openBatchTable(apiData)}
                        >
                          {apiData.BATCH_STARTED_DATE}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => openBatchTable(apiData)}
                        >
                          {apiData.BATCH_END_DATE}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => openBatchTable(apiData)}
                        >
                          {gettrainername(apiData.trainerinfo)}
                          {/* {apiData.trainerinfo.UI_ID === null
                            ? `NA`
                            : apiData.trainerinfo.UI_ID} */}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={() => openBatchTable(apiData)}
                        >
                          {isDateWithRange(
                            apiData.BATCH_STARTED_DATE,
                            apiData.BATCH_END_DATE
                          ) ? (
                            <div className="isActive">Active</div>
                          ) : (
                            <div className="isNotActive">Inactive</div>
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          <BiSolidMessageSquareEdit
                            id="edit-icon"
                            onClick={() => handleedit(apiData)}
                          />
                          <MdDelete
                            id="dlt-icon"
                            onClick={() => {
                              deletebatch(apiData.BATCH_ID);
                            }}
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
          show={editShow}
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
            <Modal.Title style={{ color: "white" }}>Update Batch</Modal.Title>

            <CloseButton variant="white" onClick={edithandleClose} />
          </Modal.Header>
          <Modal.Body>
            <ModalTitle style={{ textAlign: "center" }}>
              Update AN BATCH
            </ModalTitle>
            <form onSubmit={submitEdit}>
              <div className="inputbatch-box">
                <div className="combine-dropdwn">
                  <div className="inputbatch">
                    <select
                      id="batchcode"
                      name="batchcode"
                      className="batchdropdown"
                      required
                      onChange={batchCodeHandleChange}
                      value={editedData.batchcode}
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
                    <select
                      id="batchcode"
                      name="batchcode"
                      className="batchdropdown"
                      required
                      onChange={batchMonthHandleChange}
                      value={editedData.batchcode}
                    >
                      <option value="null">Batch Month</option>
                      {batchMonth.map((data, index) => (
                        <option key={index} value={index.month}>
                          {data.month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputbatch">
                    <select
                      id="batchcode"
                      name="batchcode"
                      className="batchdropdown"
                      required
                      onChange={batchNumberHandleChange}
                      value={editedData.batchcode}
                    >
                      <option value="null">Batch Number</option>
                      {batchNumber.map((data, index) => (
                        <option key={index} value={index.number}>
                          {data.number}
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
                    value={editedData.selectedBatchTime}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        selectedBatchTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputbatch">
                  <input
                    type="number"
                    name="numofstudent"
                    id="numofstudent"
                    placeholder="No of Student"
                    value={editedData.numofstudent}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        numofstudent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputbatch">
                  <select
                    id="trainername"
                    name="trainername"
                    className="trainerdropdown"
                    required
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        trainername: e.target.value,
                      })
                    }
                    value={editedData.trainername}
                  >
                    <option value="">Trainers Name</option>
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
                        value={editedData.startBatchDate}
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
                        name="endBatchdate"
                        placeholder="End date"
                        value={editedData.endBatchDate}
                        readOnly
                        disabled
                        onChange={(e) => {
                          setEditedData({
                            endBatchDate: e.target.value,
                          });
                        }}
                        // onChange={(e) => set}
                      />
                    </div>
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
      </div>
      {/* Modal Profile */}
      {showBatch && (
        <BatchPopUp
          id={apiData.id}
          user={showBatch}
          showmodal={showBatchModal}
          onClosemodal={handleBatchCloseModal}
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
