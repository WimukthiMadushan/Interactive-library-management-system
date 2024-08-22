import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NotificationModal({ show, handleClose, title, message, isSuccess }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={isSuccess ? "success" : "danger"}
          onClick={handleClose}
        >
          {isSuccess ? "OK" : "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;
