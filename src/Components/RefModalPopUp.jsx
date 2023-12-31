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
  { id: "name", label: "Name", minWidth: 150, align: "center" },

  {
    id: "totalfees",
    label: "Total Fees",
    minWidth: 150,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "feespaid",
    label: "Fees Paid",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "referralamount",
    label: "Referral Amount",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "referralpaid",
    label: "Paid Status",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function RefModalPopUp({ user }) {
  // const [apiData, setApiData] = useState([]);
  // console.log()
  const arr = user.referralStudents ?? [];
  const apiData = [...arr];
  console.log("apiData", apiData);
  const [page, setPage] = React.useState(0);

  const allstudent = user.referralStudents ?? [];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let total = 0;
  for (let x of allstudent) {
    console.log(x.STUDENT_REFERRAL_AMOUNT);
    const sum = Number(x.STUDENT_REFERRAL_AMOUNT);
    total += sum;
  }
  // console.log("total", total);

  // const totalAmount = () => {
  //   for (let i = 0; i < apiData.length; i++) {}
  // };

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getType = (count) => {
    console.log("count", count);
    if (count >= 4) {
      return "Gold";
    } else if (count < 4) {
      return "Silver";
    }
  };

  return (
    <>
      <div className="refProfileModel">
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
                  <table>
                    <tbody className="refmodal-table">
                      <tr>
                        <td>
                          <div className="ref-label">Name</div>
                        </td>
                        <td>
                          <div className="details">: {user.name}</div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="ref-label">Contact No</div>
                        </td>
                        <td>
                          <div className="details">: {user.mobilenumber}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ref-label">Email ID</div>
                        </td>
                        <td>
                          <div className="details">: {user.email}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ref-label">Total Students</div>
                        </td>
                        <td>
                          <div className="details">: {apiData.length}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ref-label">Referral Type</div>
                        </td>
                        <td>
                          <div className="details">
                            : {getType(apiData.length)}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="ref-wallet1">
              <div className="wallet-title">Account Balance</div>
              <div>
                <span className="ruppess">
                  <CurrencyRupeeOutlinedIcon className="rupee-icon" />
                  {total}
                </span>
              </div>
              {/* <div className="request-money">
                <Button
                  variant="contained"
                  startIcon={<CurrencyRupeeOutlinedIcon />}
                  className="money-btn"
                >
                  Request Money
                </Button>
              </div> */}
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
                            backgroundColor: " #002333",
                            color: "#ffffff",
                            // fontSize: "18px",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((data) => (
                      <TableRow key={data.STUDENT_ID} hover role="checkbox">
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          {data.STUDENT_NAME}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          {data.STUDENT_TOTAL_FEES}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          {data.STUDENT_FEES_PAID}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          {data.STUDENT_REFERRAL_AMOUNT}
                        </TableCell>
                        <TableCell
                          align="center"
                          id="table-body"
                          style={{ fontSize: 16 }}
                        >
                          {data.STUDENT_REFERRAL_PAID == 0
                            ? "Not paid"
                            : "Paid"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={arr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
