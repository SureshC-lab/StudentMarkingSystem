import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { getStudents } from "../services/slotManagementService";
import { toast } from "react-toastify";

function SlotBookingForm({ selectedSlot, onSave }) {
  const [slot, setSlot] = useState(
    selectedSlot || {
      timeSlotId: 0,
      startTime: "",
      endTime: "",
      isClosed: false,
      maxStudents: 1,
      bookings: [
        {
          bookingId: 0,
          studentId: "",
          slotId: 0,
          studentName: "",
          startTime: "",
          endTime: ""
        }
      ]
    }
  );

  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getStudents();
        console.log(data);
        setStudents(data);
      } catch (err) {
        toast.error("Failed to load students");
      }
    }
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSlot((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setSlot((prev) => ({
      ...prev,
      bookings: [{ ...prev.bookings[0], [name]: value }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(slot);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="startTime"
          value={slot.startTime}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="endTime"
          value={slot.endTime}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="studentDropdown">
        <Form.Label>Select Student</Form.Label>
        <Form.Select
          name="studentId"
          value={slot.bookings[0]?.studentId || ""}
          onChange={handleBookingChange}
          required
        >
          <option value="">-- Select a Student --</option>
          {students.map((student) => (
            <option key={student.value} value={student.value}>
              {student.text}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">Save Slot</Button>
    </Form>
  );
}

export default SlotBookingForm;
