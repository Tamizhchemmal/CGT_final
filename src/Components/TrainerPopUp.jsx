import React from "react";

import Modal from "react-bootstrap/Modal";
import { CloseButton } from "react-bootstrap";

import "../Css/Refprofile.css";
import TrainerPopUpDetails from "./TrainerPopUpDetails";

export default function TrainerPopUp({ user, showmodal, onClosemodal }) {
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
          <Modal.Title style={{ color: "white" }}>Trainer Profile</Modal.Title>

          <CloseButton variant="white" onClick={onClosemodal} />
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }}>
          <TrainerPopUpDetails user={user} />
        </Modal.Body>
      </Modal>
    </>
  );
}
