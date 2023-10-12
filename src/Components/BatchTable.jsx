import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Css/HomePage.css";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { Modal, Button, ModalTitle, CloseButton } from "react-bootstrap";

import BatchPopUp from "./BatchPopUp";

import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import CrmService from "../API/CrmService";

const columns = [
  { id: "batchcode", label: "Batch Code", minWidth: 170, align: "center" },

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

  const edithandleClose = () => {
    setEditShow(false);
  };

  const [apiData, setApiData] = useState([]);
  const [editShow, setEditShow] = useState(false);

  const [showBatch, setShowBatch] = useState([]);
  const [deletePopUp, setdeletePopUp] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const callApiData = async (e) => {
    await CrmService.getbatch()
      .then((response) => {
        setApiData(response.data);
        // CrmService.userLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [trainerData, settrainerData] = useState([]);
  // trainer name
  const callapitrainerdata = async (e) => {
    await CrmService.getTrainerList()
      .then((response) => {
        settrainerData(response.data);
        // CrmService.userLoggedIn();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    callApiData();
    callapitrainerdata();
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
  };

  const confirmDelete = async () => {
    let body = {
      batchid: deleteKey,
      modifiedby: "123", // Logged in User unique ID
    };

    await CrmService.deleteBatch(body)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        CrmService.userLoggedIn();
      });
    callApiData();
    setdeleteKey(null);
    setdeletePopUp(false);
  };

  //Edit Batch

  const [selectedbatchdata, setselectedbatchdata] = useState({});
  const [updatedbatchdata, setupdatedbatchdata] = useState({});

  //Date change
  const handleStartDateChange = (e) => {
    const sDate = e.target.value;

    const selectedStartDate = new Date(sDate);
    const selectedEndDate = new Date(selectedStartDate);
    selectedEndDate.setMonth(selectedStartDate.getMonth() + 3);

    const eDate = selectedEndDate.toISOString().substr(0, 10);

    setupdatedbatchdata({
      ...updatedbatchdata,
      BATCH_STARTED_DATE: sDate,
      BATCH_END_DATE: eDate,
    });

    //Search function
  };
  const handleedit = (rowData) => {
    setEditShow(true);
    setselectedbatchdata(rowData);
    setupdatedbatchdata({ ...rowData });
  };

  // batch active/not

  const isDateWithRange = (startDate, endDate) => {
    const currentDate = new Date();
    let strtDate = new Date(startDate);
    let edDate = new Date(endDate);

    return currentDate >= strtDate && currentDate <= edDate;
  };

  // const [selectedBatchTime, setSelectedBatchTime] = useState("");

  // const handleTimeChange = (e) => {
  //   const btchTiming = e.target.value;
  //   setSelectedBatchTime(btchTiming);
  //   setupdatedbatchdata(selectedBatchTime);
  // };

  const submitEdit = async (event) => {
    event.preventDefault();

    let body = {
      batchId: selectedbatchdata.BATCH_ID,
      batchCode: selectedbatchdata.BATCH_CODE,
      trainerId: updatedbatchdata.BATCH_TRAINER_ID,

      batchSelectedTime: updatedbatchdata.BATCH_SELECTED_TIME,
      startDate: updatedbatchdata.BATCH_STARTED_DATE,
      endDate: updatedbatchdata.BATCH_END_DATE,
    };

    await CrmService.createBatch(body)
      .then((response) => {
        CrmService.userLoggedIn();
        alert("Batch Updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
    callApiData();
    setEditShow(false);
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
                      : apiData.BATCH_CODE.includes(search);
                    // ||
                    // apiData.batchcode.toLowerCase().includes(search);
                  })
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
                          {apiData.trainers === null
                            ? "NA"
                            : apiData.trainers.userinfo.UI_FIRST_NAME}
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
                <div className="inputbatch">
                  <input
                    type="time"
                    name="batchtiming"
                    id="batchtiming"
                    value={updatedbatchdata.BATCH_SELECTED_TIME}
                    onChange={(e) =>
                      setupdatedbatchdata({
                        ...updatedbatchdata,
                        BATCH_SELECTED_TIME: e.target.value,
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
                    value={updatedbatchdata.BATCH_TRAINER_ID}
                    onChange={(e) =>
                      setupdatedbatchdata({
                        ...updatedbatchdata,
                        BATCH_TRAINER_ID: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled selected>
                      Trainers Name
                    </option>
                    {trainerData.map((data) => (
                      <option key={data.id} value={data.id}>
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
                        value={updatedbatchdata.BATCH_STARTED_DATE}
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
                        value={updatedbatchdata.BATCH_END_DATE}
                        readOnly
                        disabled
                        onChange={(e) => {
                          setupdatedbatchdata({
                            ...updatedbatchdata,
                            BATCH_END_DATE: e.target.value,
                          });
                        }}
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
