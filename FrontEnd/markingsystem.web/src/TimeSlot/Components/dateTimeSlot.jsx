import { useEffect, useState } from "react";
import { getTimeSlot } from "../Services/timeSlotService";
import { Button, Modal } from "react-bootstrap";
import DateTimeSlotList from "./dateTimeSlotList";
import DateTimeSlotForm from "./dateTimeSlotForm";

function DateTimeSlot() {
  const [timeSlots, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchTimeSlot();
  }, []);

  const fetchTimeSlot = async () => {
    try {
      const data = await getTimeSlot();
      setTimeSlot(data);
    } catch (err) {
      console.error("Error fetching TimeSlot:", err);
    }
  };

  const handleEdit = (timeSlots) => {
    console.log(timeSlots);
    timeSlots.startTime = timeSlots.startTime.split("T")[0];
    timeSlots.endTime = timeSlots.endTime.split("T")[0];
    setSelectedTimeSlot(timeSlots);
    setShow(true);
  };

  const handleAdd = () => {
    setSelectedTimeSlot(null);
    setShow(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="mb-4">TimeSlot Details</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>Add TimeSlot</Button>
      </div>

      <DateTimeSlotList
        timeSlots={timeSlots}
        onEdit={handleEdit}
        refreshTimeSlot={fetchTimeSlot}
      />

      <Modal 
      show={show} 
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTimeSlot ? "Edit TimeSlot" : "Add TimeSlot"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateTimeSlotForm
            selectedTimeSlot={selectedTimeSlot}
            refreshTimeSlot={fetchTimeSlot}
            closeModal={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DateTimeSlot;
