import React from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CloseButton } from "react-bootstrap";
import RefModalPopUp from "./RefModalPopUp";
import "../Css/Refprofile.css";

function Modalpopup({ user, showmodal, onClosemodal }) {
  return (
    <>
      <Modal
        show={showmodal}
        onHide={onClosemodal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mods"
      >
        <Modal.Header style={{ backgroundColor: " #002333 ", color: "white" }}>
          <Modal.Title style={{ color: "white" }}>Referral Profile</Modal.Title>

          <CloseButton variant="white" onClick={onClosemodal} />
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }}>
          <RefModalPopUp user={user} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modalpopup;
