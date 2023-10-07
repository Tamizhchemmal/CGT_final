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
import { log } from "util";
import CrmService from "../API/CrmService";

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

export default function BatchModalPopUp({ user }) {
  // console.log("user", user);

  const batchStudents = user.batch_students ?? [];
  // const [apiData, setApiData] = useState([]);
  const arr = [...batchStudents];

  // useEffect(() => {
  //   setApiData(batchStudents);
  // });
  // console.log(batchStudents.STUDENT_EMAIL);
  console.log(typeof arr);

  // console.log(user.batch_students);
  // setApiData(user.batch_students);
  // useEffect(() => {
  //   if (Array.isArray(user) && user.length > 0) {
  //     const studentDataArray = user
  //       .map((batch) => {
  //         if (
  //           batch.batch_students &&
  //           Object.keys(batch.batch_students).length > 0
  //         ) {
  //           return batch.batch_students.map((student) => ({
  //             batchCode: batch.BATCH_CODE,
  //             studentName: student.STUDENT_NAME,
  //             studentEmail: student.STUDENT_EMAIL,
  //             // Add other student properties as needed
  //           }));
  //         }
  //         return [];
  //       })
  //       .flat();

  //     setApiData(studentDataArray);
  //   } else {
  //     setApiData([]); // Set an empty array when user is empty or not an array
  //   }
  // }, [user]);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [trainerData, settrainerData] = useState([]);
  // Referral data dropdown

  const callapitrainerdata = async (e) => {
    await CrmService.getTrainerList()
      .then((response) => {
        settrainerData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect = () => {
    callapitrainerdata();
  };

  // get Course name in Table

  //
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // const callApiData = async (e) => {
  //   const batchData = await axios.get(
  //     "https://64b638a2df0839c97e1528f4.mockapi.io/batch"
  //   );
  //   setApiData(batchData.data);
  // };

  // useEffect(() => {
  //   callApiData();
  // }, []);

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
                            {sdata.STUDENT_EMAIL}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="table-body"
                            style={{ fontSize: 16 }}
                          >
                            {" "}
                            {sdata.BTACH_TRAINER_ID}
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
              {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={apiData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
