import React from "react";
import ProfileLogo from "../Assets/Images/boss.png";
import { Container } from "react-bootstrap";
import "../Css/StudentPopUp.css";

export default function StudentPopUpDetails({ user }) {
  console.log(user);
  return (
    <div className="trainerProfileModel">
      <div className="crd-bg1">
        <div className="trainer-profdetails1">
          <Container>
            <div className="colum" id="column">
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
                        <tbody className="studentmodal-table">
                          <tr>
                            <td>
                              <div className="label">Fullname</div>
                            </td>
                            <td>
                              <div className="details">{user.STUDENT_NAME}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Mobile No.</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_PHONE}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Email ID</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_EMAIL}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Year Of Passedout</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_PASSED_YEAR}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">College Name</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_COLLEGE}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Degree</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_DEGREE}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Course Name</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.course.COURSE_NAME}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column2">
                <div className="trainer-bio1">
                  <div className="trainer-details" id="student-details">
                    <div className="trainer-label">
                      <table>
                        <tbody className="studentmodal-table2">
                          <tr>
                            <td>
                              <div className="label"></div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Total Fees</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_TOTAL_FEES}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="label">Fees Paid</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_FEES_PAID}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Pending Fees</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.STUDENT_PENDING_FEES}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Degree</div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Course Name</div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
