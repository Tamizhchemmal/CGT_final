import React from "react";
import "../Css/TrainerPopUpDetails.css";
import { Container } from "react-bootstrap";
import ProfileLogo from "../Assets/Images/boss.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

const columns = [
  { id: "batchcode", label: "Batch Code", minWidth: 140, align: "center" },
  {
    id: "startdate",
    label: "Start Date",
    minWidth: 140,
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
    id: "status",
    label: "Status",
    minWidth: 140,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function TrainerPopUpDetails({ user }) {
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
    const trainerData = await axios.get(
      "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData"
    );
    setApiData(trainerData.data);
  };

  useEffect(() => {
    callApiData();
  }, []);

  return (
    <>
      <div className="trainerProfileModel">
        <div className="crd-bg1">
          <div className="trainer-profdetails1">
            <Container>
              <div className="colum">
                <div className="column1">
                  <div className="trainer-bio1">
                    <div className="profile">
                      <img
                        src={ProfileLogo}
                        alt="profile-logo"
                        className="prof-logo1"
                      />
                    </div>
                    <div className="trainer-details">
                      <div className="trainer-label">
                        <table>
                          <tbody className="trainmodal-table">
                            <tr>
                              <td>
                                <div className="label">Name</div>
                              </td>
                              <td>
                                <div className="details">: {user.name}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Email ID</div>
                              </td>
                              <td>
                                <div className="details">{user.email}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Contact No</div>
                              </td>
                              <td>
                                <div className="details">
                                  {user.mobilenumber}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Payment</div>
                              </td>
                              <td>
                                <div className="details">
                                  {user.paymentmode}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Domain</div>
                              </td>
                              <td>
                                <div className="details">{user.course}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column2">
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
                        <TableBody></TableBody>
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
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
