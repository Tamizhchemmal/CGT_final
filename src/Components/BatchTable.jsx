import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ModalTitle,
  CloseButton,
} from "react-bootstrap";

import axios from "axios";

import { Card } from "@mui/material";

import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

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
    id: "trainername",
    label: "Trainer Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currenttopic",
    label: "Current Topic",
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




export default function BatchTable() {

  const [batchInput, setBatchinput] = useState({
    batchcode: "",
    batchtiming: "",
    numofstudent: "",
    trainername: "",
    batchstartdate: "",
    batchenddate: "",
  });

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

  

  // const [editRow, setEditRow] = useState({});



  const [show, setShow] = useState(false);

  const naviagte = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const batchCreate = (e) => {
    e.preventDefault();
    naviagte("/home");
  };

  const edithandleClose = () => {
    setEditShow(false);
    setErrors("");
  };

  // const handleChange = (e) => {
  //   setBatchinput({ ...batchInput, [e.target.name]: e.target.value });
  // };

  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState([]);
  const [editShow, setEditShow] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [alertt, setAlertt] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const callApiData = async (e) => {
    const batchData = await axios.get(
      "https://64b638a2df0839c97e1528f4.mockapi.io/batch"
    );
    setApiData(batchData.data);
  };

  useEffect(() => {
    callApiData();
  }, []);

  const opnetable = (apiData) => {
    setShow(true);
  };

  // Delete Batch
  const deletebatch = async (id) => {
    await axios.delete(
      "https://64b638a2df0839c97e1528f4.mockapi.io/batch/" + id
    );
    alert("Batch deleted");

    callApiData();
  };

  const [editedData, setEditedData] = useState({});

  //Edit Batch

  const handleedit = (rowData) => {

    // setEditRow(rowData)
    setEditShow(true);
    console.log(rowData)
    // fetchDataFromAPi(rowData.id);
    setEditedData({ ...rowData.batchInput});
  
  };

  const handleEditChange =(e)=>{

    setEditedData((prevData)=>({
      ...prevData, [e.target.name]: e.target.value
    }))
  }

  // const handleSaveChanges =(updatedData)=>{
  //   setApiData((prevData)=>
  //     prevData.map((apiData)=>
  //     apiData.id === updatedData.id ? {...apiData, ...updatedData}:apiData
  //     )
  //   )
  //   setEditShow(false);
  // }

  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const selectedEndDate = new Date(selectedStartDate);
    selectedEndDate.setMonth(selectedStartDate.getMonth() + 3);
    const sDate = e.target.value;
    setStartDate(sDate);
    const eDate = selectedEndDate.toISOString().substr(0, 10);
    setEndDate(eDate);
    setBatchinput({ ...batchInput, batchstartdate: sDate, batchenddate: eDate });

    //Search function
  };

  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
    const btchTiming = e.target.value;
    setSelectedTime(btchTiming);
    setBatchinput({...batchInput,batchtiming:btchTiming});
  };

  var count;

  const Active = ({ count }) => {};

  const submitEdit = async(id)=>{
    // e.preventDefault();
    await axios.put("https://64b638a2df0839c97e1528f4.mockapi.io/batch/" + id);
    setEditShow(false);
  }

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
                  .map((apiData) => {
                    return (
                      <TableRow key={apiData.id} hover role="checkbox">
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={opnetable}
                        >
                          {apiData.batchInput.batchcode}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={opnetable}
                        >
                          {apiData.batchInput.batchstartdate}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={opnetable}
                        >
                          {apiData.batchInput.trainername}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={opnetable}
                        >
                          HTML
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={opnetable}
                        >
                          {" "}
                          <Active count={15} />
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          <BiSolidMessageSquareEdit
                            id="edit-icon"
                            onClick={()=>handleedit(apiData)}
                          />
                          <MdDelete
                            id="dlt-icon"
                            onClick={() => deletebatch(apiData.id)}
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
        {/* model profile */}
        <Modal
          show={show}
          onHide={handleClose}
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

            <CloseButton variant="white" onClick={handleClose} />
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
                  <div style={{ margin: "10px 30px", fontSize: "18px" }}>
                    Name : XXXX
                  </div>
                </Card>
              </Card>
            </div>
            <hr></hr>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <button
                type="submit"
                id="btn-createrefmodal"
                onClick={batchCreate}
              >
                Create
              </button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        {/* Edit */}
        {/* {apiData && ( */}
          <Modal
          data={apiData}
          show={editShow}
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
            <Modal.Title style={{ color: "white" }}>Update Batch</Modal.Title>

            <CloseButton variant="white" onClick={edithandleClose} />
          </Modal.Header>
          <Modal.Body>
            <ModalTitle style={{ textAlign: "center" }}>
              Update AN BATCH
            </ModalTitle>
            <form>
              <div className="inputbatch-box">
                <div className="inputbatch">
                  <select
                    id="batchcode"
                    name="batchcode"
                    className="batchdropdown"
                    required
                    onChange={handleEditChange}
                    value={editedData.batchcode}
                    onSubmit={submitEdit}
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
                    value={editedData.batchtiming}
                    onChange={handleTimeChange}
                  />
                </div>
                <div className="inputbatch">
                  <input
                    type="number"
                    name="numofstudent"
                    id="numofstudent"
                    placeholder="No of Student"
                    value={editedData.numofstudent}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="inputbatch">
                  <select
                    id="trainername"
                    name="trainername"
                    className="trainerdropdown"
                    required
                    onChange={handleEditChange}
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
                        value={editedData.batchstartdate}
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
                        value={editedData.batchenddate}
                        readOnly
                        disabled
                        onChange={handleEditChange}
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
                <Button variant="secondary" onClick={edithandleClose}>
                  Close
                </Button>
                <button type="submit" id="btn-createrefmodal">
                  Update
                </button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
         {/* ) */}
        {/* } */}
      </div>
    </>
  );
}
