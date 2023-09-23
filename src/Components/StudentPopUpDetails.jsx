import React from "react";
import ProfileLogo from "../Assets/Images/boss.png";
import { Container } from "react-bootstrap";
import "../Css/StudentPopUp.css";

export default function StudentPopUpDetails({ user }) {
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
                              <div className="details">{user.name}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Mobile No.</div>
                            </td>
                            <td>
                              <div className="details">{user.mobilenumber}</div>
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
                              <div className="label">Year Of Passedout</div>
                            </td>
                            <td>
                              <div className="details">
                                {user.yearofpassedout}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">College Name</div>
                            </td>
                            <td>
                              <div className="details">{user.college}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Degree</div>
                            </td>
                            <td>
                              <div className="details">{user.degree}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Course Name</div>
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
                              <div className="label">Mobile No.</div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Email ID</div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">Year Of Passedout</div>
                            </td>
                            <td>
                              <div className="details"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="label">College Name</div>
                            </td>
                            <td>
                              <div className="details"></div>
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
