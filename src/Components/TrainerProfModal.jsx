import React from "react";
import "../Css/TrainerProfile.css";
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
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
// import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

const columns = [
  { id: "batchcode", label: "Batch Code", minWidth: 170, align: "center" },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 200,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currentTopic",
    label: "Current Topic",
    minWidth: 200,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function TrainerProfModal() {
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
      "https://64b638a2df0839c97e1528f4.mockapi.io/trainers"
    );
    setApiData(trainerData.data);
  };

  useEffect(() => {
    callApiData();
  }, []);

  return (
    <>
      <div className="trainerProfileModel">
        <div className="crd-bg">
          <div className="trainer-profdetails">
            <Container>
              <div className="colum">
                <div className="column1">
                  <div className="trainer-bio">
                    <div className="profile">
                      <img
                        src={ProfileLogo}
                        alt="profile-logo"
                        className="prof-logo"
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
                                <div className="details">
                                  {/* : {apiData.name} */}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Email ID</div>
                              </td>
                              <td>
                                <div className="details">
                                  {/* : {apiData.mobilenumber} */}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Contact No</div>
                              </td>
                              <td>
                                <div className="details">
                                  {/* : {apiData.email} */}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Payment</div>
                              </td>
                              <td>
                                <div className="details">{/* : 12 */}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="label">Domain</div>
                              </td>
                              <td>
                                <div className="details">{/* : Gold */}</div>
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
