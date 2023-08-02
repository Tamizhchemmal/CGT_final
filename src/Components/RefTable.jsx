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

export default function RefTable({search}) {
  const [showModal, setShowModal] = useState(false);
  const [showRef , setShowref]=  useState([])


  const handleShow = () => {};

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
   


  
 
  const opnetable = async(apiData) => {
    setShowref(apiData);
    setShowModal(true)
   
   
  }
  const handleCloseModal=(e) => { setShowModal(false); }


  const handleedit = (e) => {
    alert("button");
  };
  // Delete referral
  const deleteref = async (id) => {
    await axios.delete(
      "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData/" + id
    );
    alert("referral deleted");

    callApiData();
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
                    return search.toLowerCase() === ''
                      ? apiData
                      : apiData.name.toLowerCase().includes(search) || apiData.name.includes(search)
                  })
                  .map((apiData) => {
                    return (
                      <TableRow key={apiData.id} hover role="checkbox" >
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={()=>opnetable(apiData)}
                        >
                          {apiData.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={()=>opnetable(apiData)}
                        >
                          {apiData.mobilenumber}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={()=>opnetable(apiData)}
                        >
                          {apiData.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={()=>opnetable(apiData)}
                        >
                          12
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                          onClick={()=>opnetable(apiData)}
                        >
                          {" "}
                          <Type count={15} />
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          <BiSolidMessageSquareEdit
                            id="edit-icon"
                            onClick={handleedit}
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
        {/* model profile */}
     
      </div>
      {
       showRef &&  <Modalpopup user={showRef} showmodal={showModal} onClosemodal={handleCloseModal}/>
      }
     
    </>
  );
}
