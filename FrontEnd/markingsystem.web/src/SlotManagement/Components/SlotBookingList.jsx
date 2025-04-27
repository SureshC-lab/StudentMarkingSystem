import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getSlotManagement,
  deleteSlotManagement
} from "../services/slotManagementService"; // Make sure the path is correct

const SlotBookingList = () => {
  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  // Fetch slots data when the component mounts
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await getSlotManagement(); // Get slots using the service
        //console.log("Fetched data:", data);  // Log the data to see if it's correct
        setSlots(data); // Set the slots data
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Error fetching slots.");
      }
    };

    fetchSlots();
  }, []);

  // Refresh the slots list after performing any actions like deleting
  const refreshSlots = async () => {
    try {
      const data = await getSlotManagement(); // Refresh slots data from API
      setSlots(data); // Update the state with the new data
    } catch (error) {
      console.error("Error refreshing slots:", error);
      toast.error("Error refreshing slots.");
    }
  };




  // Handle delete confirmation
  const handleDelete = (bookingId) => {
    setSlotToDelete(bookingId);
    setShowModal(true);
  };

  // Confirm the deletion and call the API
  const confirmDelete = async () => {
    try {
      await deleteSlotManagement(slotToDelete); // Call the delete API
      toast.success("Slot deleted successfully");
      refreshSlots(); // Refresh the slots after deletion
    } catch (err) {
      toast.error("Error deleting slot");
    } finally {
      setShowModal(false);
      setSlotToDelete(null);
    }
  };

  return (
    <div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Slot Date</th>
              <th>Max Students</th>
              <th>Student Name</th>
              {/* <th>Booking Time</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots && slots.length > 0 ? (
              // Loop through each slot and display the bookings in a row
              slots.map((slot, index) =>
                slot.bookings.map((booking, bookingIndex) => (
                  <tr key={booking.bookingId}>
                    <td>{index * slot.bookings.length + bookingIndex + 1}</td>
                    <td>{new Date(slot.startTime).toLocaleDateString()}</td>
                    <td>{slot.maxStudents}</td>
                    <td>{booking.studentName}</td>
                    {/* <td>{new Date(booking.startTime).toLocaleDateString()}</td> */}
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => console.log("Edit", booking)}
                      >
                        Edit
                      </Button>{" "}
                      
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(booking.bookingId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="6">No slots available</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal for Delete Confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this booking?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SlotBookingList;
