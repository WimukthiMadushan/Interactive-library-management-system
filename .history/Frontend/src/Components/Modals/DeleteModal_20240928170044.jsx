import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function DeleteModal({
  show,
  handleClose,
  handleConfirm,
  value,
  fetchAuthors,
  authorId,
  setShowModal,
}) {
  const handleConfirmDelete = async () => {
    console.log("Deleting author with ID:", authorId);
    try {
      await axios.delete(`http://localhost:5001/api/author/${authorId}`);
      setShowModal(false);
      fetchAuthors();
    } catch (error) {
      console.error("Failed to delete author. Please try again.", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      data-testid="delete-modal"
    >
      <Modal.Header closeButton data-testid="delete-modal-header">
        <Modal.Title data-testid="delete-modal-title">
          Confirm Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body data-testid="delete-modal-body">
        Are you sure you want to delete this {value}?
      </Modal.Body>
      <Modal.Footer data-testid="delete-modal-footer">
        <Button
          variant="secondary"
          onClick={handleConfirm}
          data-testid="cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          data-testid="delete-button"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
