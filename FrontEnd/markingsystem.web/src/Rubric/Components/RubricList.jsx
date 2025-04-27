import { useState } from "react";
import { deleteRubric } from "../Services/rubricService";
import { toast } from "react-toastify";
import { Table, Modal, Button } from "react-bootstrap";

function RubricList({ rubrics, onEdit, refreshRubrics }) {
  const [showModal, setShowModal] = useState(false);
  const [rubricToDelete, setRubricToDelete] = useState(null);

  const handleDelete = (id) => {
    setRubricToDelete(id);
    setShowModal(true);  
  };

  const confirmDelete = async () => {
    if (rubricToDelete) {
      try {
        await deleteRubric(rubricToDelete);
        toast.success("Rubric deleted successfully");
        refreshRubrics();
      } catch (err) {
        toast.error("Error deleting rubric");
      } finally {
        setShowModal(false); 
        setRubricToDelete(null);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false); 
    setRubricToDelete(null);
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rubrics && rubrics.length > 0 ? (
            rubrics.map((rubric, index) => (
              <tr key={rubric.rubricId}>
                <td>{index + 1}</td>
                <td>{rubric.rubricName}</td>
                {/* <td>{rubric.courseId}</td> */}
                <td>{rubric.courseName}</td>
                <td>
                  <Button variant="warning" onClick={() => onEdit(rubric)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(rubric.rubricId)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No rubric available</td>
            </tr>
          )}
        </tbody>
      </Table>

      
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this rubric?</Modal.Body>
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

export default RubricList;
