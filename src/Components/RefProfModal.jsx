import React from 'react'
import "../Css/Refprofile.css";
import { Container } from 'react-bootstrap';
import ProfileLogo from "../Assets/Images/boss.png";

export default function RefProfModal() {
  return (
    <>
                <div className="refProfileModel">
                <div className="crd-bg">
                    <div className="ref-profdetails">
                        <Container>
                            <div className="colum">
                                <div className="column1">
                                    <div className="ref-bio">
                                        <img src={ProfileLogo} alt="profile-logo" className='prof-logo' />
                                    </div>
                                    <div className="ref-wallet">
                                         
                                    </div>
                                </div>
                                <div className="column2">

                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
    </>
  )
}