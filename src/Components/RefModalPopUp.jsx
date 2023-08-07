import React from "react";
import "../Css/RefModalPopUp.css";
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
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

const columns = [
  { id: "name", label: "Name", minWidth: 140, align: "center" },
  {
    id: "course",
    label: "Course",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "batchcode",
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
];

export default function RefModalPopUp() {
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
    const refData = await axios.get(
      "https://64a587de00c3559aa9bfdbd4.mockapi.io/refData"
    );
    setApiData(refData.data);
  };

  useEffect(() => {
    callApiData();
  }, []);

  return (
    <>
      <div className="refProfileModel">
        <div className="crd-bg1">
          <div className="ref-profdetails1">
            <Container>
              <div className="colum">
                <div className="column1">
                  <div className="ref-bio1">
                    <div className="profile">
                      <img
                        src={ProfileLogo}
                        alt="profile-logo"
                        className="prof-logo1"
                      />
                    </div>
                    <div className="ref-details">
                      <div className="referral-label">
                        <Table>
                          <TableBody key={apiData.id}>
                            <TableRow>
                              <div className="ref-label">Name</div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : {apiData.name} */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            <TableRow>
                              <div className="ref-label">Contact No</div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : {apiData.mobilenumber} */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            <TableRow>
                              <div className="ref-label">Email ID</div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : {apiData.email} */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            <TableRow>
                              <div className="ref-label">
                                No of Student Referred
                              </div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : 12 */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            <TableRow>
                              <div className="ref-label">Referral Type</div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : Gold */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            <TableRow>
                              <div className="ref-label">Amount Benefited</div>
                              {apiData.map((apiData) => {
                                return (
                                  <TableCell className="details">
                                    {/* : 12000 */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  <div className="ref-wallet1">
                    <div className="wallet-title">Account Balance</div>
                    <div>
                      <span className="ruppess">
                        <CurrencyRupeeOutlinedIcon className="rupee-icon" />
                        10,000
                      </span>
                    </div>
                    <div className="request-money">
                      <Button
                        variant="contained"
                        startIcon={<CurrencyRupeeOutlinedIcon />}
                        className="money-btn"
                      >
                        Request Money
                      </Button>
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
