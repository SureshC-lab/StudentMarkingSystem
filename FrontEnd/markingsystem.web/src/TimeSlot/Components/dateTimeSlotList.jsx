import { useState } from "react";
import { deleteTimeSlot } from "../Services/timeSlotService";
import { toast } from "react-toastify";
import { Table, Modal, Button } from "react-bootstrap";

function DateTimeSlotList({ timeSlots, onEdit, refreshTimeSlot }){
    const [showModal, setShowModal] = useState(false);
    const [timeSlotToDelete, setTimeSlotToDelete] = useState(null);
  
    const handleDelete = (id) => {
      setTimeSlotToDelete(id);
      setShowModal(true);  // Show the modal
    };
  
    const confirmDelete = async () => {
      if (timeSlotToDelete) {
        try {
          await deleteTimeSlot(timeSlotToDelete);
          toast.success("TimeSlot deleted successfully");
          refreshTimeSlot();
        } catch (err) {
          toast.error("Error deleting TimeSlot");
        } finally {
          setShowModal(false); // Close the modal after success or failure
          setTimeSlotToDelete(null);
        }
      }
    };
  
    const handleCancel = () => {
      setShowModal(false); // Close modal without deleting
      setTimeSlotToDelete(null);
    };
  
    return (
      <div className="table-responsive">
        <Table striped bordered hover className="w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Max Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots && timeSlots.length > 0 ? (
              timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot.timeSlotId}>
                  <td>{index + 1}</td>
                  <td>{new Date(timeSlot.startTime).toLocaleDateString()}</td>
                  <td>{new Date(timeSlot.endTime).toLocaleDateString()}</td>
                  <td>{timeSlot.maxStudents}</td>
                  <td>
                    <Button variant="warning" onClick={() => onEdit(timeSlot)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(timeSlot.timeSlotId)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No timeslot available</td>
              </tr>
            )}
          </tbody>
        </Table>
  
        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this timeslotId?</Modal.Body>
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

export default DateTimeSlotList;