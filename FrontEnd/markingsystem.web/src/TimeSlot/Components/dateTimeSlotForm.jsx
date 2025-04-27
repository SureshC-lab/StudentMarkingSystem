import { useState, useEffect } from "react";
import { createTimeSlot, updateTimeSlot } from "../Services/timeSlotService";
import { Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";

function DateTimeSlotForm({ selectedTimeSlot, refreshTimeSlot, closeModal }){
    const [timeslot, setTimeSlot] = useState({
        startTime: "",
        endTime: "",
        maxStudents: ""
      });
    
      useEffect(() => {
        if (selectedTimeSlot) {
          setTimeSlot(selectedTimeSlot);
        } else {
          setTimeSlot({ startTime: "", endTime: "", maxStudents: "" });
        }
      }, [selectedTimeSlot]);
    
    
    
      const handleChange = (e) => {
        setTimeSlot({ ...timeslot, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (selectedTimeSlot) {
            await updateTimeSlot(timeslot);
            toast.success("TimeSlot updated successfully");
          } else {
            await createTimeSlot(timeslot);
            toast.success("TimeSlot created successfully");
          }
          refreshTimeSlot();
          closeModal();
        } catch (err) {
          toast.error("Error saving TimeSlot");
        }
      };
    
      return (
    
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="startTimeInput">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Time"
              name="startTime"
              value={timeslot.startTime}
              onChange={handleChange}
              required />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="endTimeInput">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Time"
              name="endTime"
              value={timeslot.endTime}
              onChange={handleChange}
              required />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="maxStudentInput">
            <Form.Label>Max Students</Form.Label>
            <Form.Control
              type="text"
              placeholder="Max Students"
              name="maxStudents"
              value={timeslot.maxStudents}
              onChange={handleChange}
              required />
          </Form.Group>
    
          <Button
            variant={selectedTimeSlot ? "success" : "primary"}
            type="submit">
            {selectedTimeSlot ? "Update" : "Create"}
          </Button>
        </Form>
    
      );
    
}

export default DateTimeSlotForm;