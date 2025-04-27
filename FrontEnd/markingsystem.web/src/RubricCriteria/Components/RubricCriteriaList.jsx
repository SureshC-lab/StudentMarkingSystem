import { useState } from "react";
import { deleteRubricCriteria } from "../Services/rubricCriteriaService";
import { toast } from "react-toastify";
import { Table, Modal, Button } from "react-bootstrap";

function RubricCriteriaList({ rubricsCriteria, onEdit, refreshRubricsCriteria }) {
  const [showModal, setShowModal] = useState(false);
  const [rubricCriteriaToDelete, setRubricCriteriaToDelete] = useState(null);

  const handleDelete = (id) => {
    setRubricCriteriaToDelete(id);
    setShowModal(true);  
  };

  const confirmDelete = async () => {
    if (rubricCriteriaToDelete) {
      try {
        await deleteRubricCriteria(rubricCriteriaToDelete);
        toast.success("Rubric Criteria deleted successfully");
        refreshRubricsCriteria();
      } catch (err) {
        toast.error("Error deleting rubric criteria");
      } finally {
        setShowModal(false); 
        setRubricCriteriaToDelete(null);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false); 
    setRubricCriteriaToDelete(null);
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>MaxScore</th>
            <th>Rubric</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rubricsCriteria && rubricsCriteria.length > 0 ? (
            rubricsCriteria.map((rubricCriteria, index) => (
              <tr key={rubricCriteria.rubricCriteriaId}>
                <td>{index + 1}</td>
                <td>{rubricCriteria.description}</td>
                <td>{rubricCriteria.maxScore}</td>
                {/* <td>{rubricCriteria.rubricId}</td> */}
                <td>{rubricCriteria.rubricName}</td>
                <td>
                  <Button variant="warning" onClick={() => onEdit(rubricCriteria)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(rubricCriteria.rubricCriteriaId)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No rubric criteria available</td>
            </tr>
          )}
        </tbody>
      </Table>

      
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this rubric criteria?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
}

export default RubricCriteriaList;
