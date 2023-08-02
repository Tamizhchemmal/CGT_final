import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card,CloseButton } from 'react-bootstrap';
function Modalpopup({user, showmodal,onClosemodal,}) {
  

  return (
    <>
        <Modal
          show={showmodal}
          onHide={onClosemodal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            style={{ backgroundColor: " #002333 ", color: "white" }}
          >
          <Modal.Title style={{ color: "white" }}>
              Referral Profile
            </Modal.Title> 

       
            <CloseButton variant="white" onClick={onClosemodal} />
          </Modal.Header>
          <Modal.Body>
            <div>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "400px",
                  boxShadow: "rgba(66, 84, 102, 0.1) 0px 8px 25px ",
                }}
              >
                <Card
                  sx={{
                    width: "50%",
                    height: "70%",
                    margin: "15px 15px",
                    boxShadow: "rgba(66, 84, 102, 0.3) 0px 8px 25px ",
                  }}
                >
                
                  <div style={{ margin: "10px 30px", fontSize: "18px" }}>
                    Name : {user.name}
                  </div>
                  <div style={{ margin: "10px 30px", fontSize: "18px" }}>
                    Email : {user.email}
                  </div>
                  <div style={{ margin: "10px 30px", fontSize: "18px" }}>
                    Mobile number : {user.mobilenumber}
                  </div>
                  <div style={{ margin: "10px 30px", fontSize: "18px" }}>
                    CompanyName : {user.companyname}
                  </div>
                </Card>
              </Card>
            </div>
            <hr></hr>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClosemodal}>
                Close
              </Button>
           
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        
    
    </>
  )
}

export default Modalpopup