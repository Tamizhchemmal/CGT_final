import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Css/HomePage.css";
import "../Css/BatchPopUp.css";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { Modal, Button, ModalTitle, CloseButton } from "react-bootstrap";

const columns = [
  { id: "studentname", label: "Student Name", minWidth: 270, align: "center" },

  {
    id: "course",
    label: "Course",
    minWidth: 270,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "trainername",
    label: "Trainer Name",
    minWidth: 270,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currenttopic",
    label: "Current Topic",
    minWidth: 300,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function BatchModalPopUp({ search }) {
  const [apiData, setApiData] = useState([]);

  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  return (
    <div className="refProfileModel">
      <div className="crd-bg1">
        <div className="batch-profdetails1">
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
                          ></TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          ></TableCell>
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
        </div>
      </div>
    </div>
  );
}