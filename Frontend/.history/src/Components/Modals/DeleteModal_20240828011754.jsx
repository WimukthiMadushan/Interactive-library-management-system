import React from "react";
import { Modal, Button } from "react-bootstrap";

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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this {value}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleConfirm}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
