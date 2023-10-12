import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Css/HomePage.css";
import "../Css/BatchPopUp.css";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const columns = [
  { id: "studentname", label: "Student Name", minWidth: 170, align: "center" },

  {
    id: "pendingfees",
    label: "Pending Fees",
    minWidth: 120,
    align: "center",

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "trainername",
    label: "Trainer",
    minWidth: 120,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Studentnumber",
    label: "Student Number",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function BatchModalPopUp({ user }) {
  // console.log("user", user);

  const batchStudents = user.batch_students ?? [];

  const arr = [...batchStudents];

  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // get Course name in Table

  //
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
                    {arr.map((sdata) => {
                      return (
                        <TableRow key={sdata.STUDENT_ID} hover role="checkbox">
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          >
                            {sdata.STUDENT_NAME}
                          </TableCell>

                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          >
                            {sdata.STUDENT_PENDING_FEES}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          >
                            {" "}
                            {user.trainers === null
                              ? "NA"
                              : user.trainers.userinfo.UI_FIRST_NAME}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          >
                            {sdata.STUDENT_PHONE}
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
