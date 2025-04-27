import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import SlotBookingList from "./SlotBookingList";
import SlotBookingForm from "./SlotBookingForm";
import { getSlotManagement, createSlotManagement, updateSlotManagement } from "../Services/slotManagementService";
import { toast } from "react-toastify";

function SlotBooking() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [show, setShow] = useState(false);

  const fetchSlots = async () => {
    try {
      const data = await getSlotManagement();
      setSlots(data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    setShow(true);
  };

  const handleAdd = () => {
    setSelectedSlot(null);
    setShow(true);
  };

  const handleSave = async (slot) => {
    try {
        var data = "";
      if (selectedSlot) {
        // Update the slot
        data = await updateSlotManagement(slot);
        //toast.success("Slot updated successfully");
        toast.info(data.data.message);
      } else {
        // Create the slot
        data = await createSlotManagement(slot);
        //console.log(data);
        //console.log(data.data.status);
        // toast.success("Slot created successfully");
        if(data.data.success == true)
        {
            toast.success("Slot created successfully");
        }
        else if(data.data.success == false)
        {
            toast.info(data.data.message);
        }
        else{
            toast.error("Error saving slot");
        }
    
      }
      fetchSlots();
      setShow(false);
    } catch (err) {
      toast.error("Error saving slot");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Slot Bookings</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>Add Slot</Button>
      </div>

      <SlotBookingList slots={slots} onEdit={handleEdit} refreshSlots={fetchSlots} />

      <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{selectedSlot ? "Edit Slot" : "Add Slot"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SlotBookingForm
            selectedSlot={selectedSlot}
            onSave={handleSave}
            refreshSlots={fetchSlots}
            closeModal={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SlotBooking;
