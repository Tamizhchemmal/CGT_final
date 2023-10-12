import React from "react";
import "../Css/Refprofile.css";
import { Container } from "react-bootstrap";
import ProfileLogo from "../Assets/Images/boss.png";
import { useEffect, useState } from "react";
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
import CrmService from "../API/CrmService";

const columns = [
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  {
    id: "totalfee",
    label: "Total Fee",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Feepaid",
    label: "Fees Paid",
    minWidth: 170,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pendingfee",
    label: "Pending Fee",
    minWidth: 170,
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

export default function RefProfModal() {
  const [apiData, setApiData] = useState([]);
  const [userData, setUserData] = useState({});

  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getreferraldetails = async () => {
    await CrmService.getmyreferrals()
      .then((response) => {
        console.log("student", response.data);
        //  CrmService.userLoggedIn();
        setApiData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userInfo = async () => {
    var userId = localStorage.getItem("uuid");
    await CrmService.getinduvidualusers(userId)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let total = 0;
  for (let x of apiData) {
    console.log(x.STUDENT_REFERRAL_AMOUNT);
    const sum = Number(x.STUDENT_REFERRAL_AMOUNT);
    total += sum;
  }

  useEffect(() => {
    // CrmService.userLoggedIn();
    getreferraldetails();
    userInfo();
  }, []);

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
      <div className="leo-profile" id="referralleo-profile">
        <div className="colum" id="referralcolum">
          <div className="column1" id="referralcolum1">
            <div className="ref-bio">
              <div className="profile">
                <img
                  src={ProfileLogo}
                  alt="profile-logo"
                  className="prof-logo"
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
                          <div className="details">: {userData.name}</div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="ref-label">Contact No</div>
                        </td>
                        <td>
                          <div className="details">
                            : {userData.mobilenumber}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ref-label">Email ID</div>
                        </td>
                        <td>
                          <div className="details">: {userData.email}</div>
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
            <div className="ref-wallet">
              <div className="wallet-title">Account Balance</div>
              <div>
                <span className="ruppess">
                  <CurrencyRupeeOutlinedIcon className="rupee-icon" /> {total}
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
          <div className="column2" id="referralcolum2">
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
                            fontSize: "18px",
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
                          {data.STUDENT_PENDING_FEES}
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
    </>
  );
}
