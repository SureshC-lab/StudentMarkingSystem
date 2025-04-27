import { useState, useEffect } from "react";
import { getRubric } from "../Services/rubricService";
import RubricForm from "../Components/RubricForm";
import RubricList from "../Components/RubricList";
import { Modal, Button } from "react-bootstrap";

function Rubric() {
  const [rubrics, setRubrics] = useState([]);
  const [selectedRubric, setSelectedRubric] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchRubrics();
  }, []);

  const fetchRubrics = async () => {
    try {
      const data = await getRubric();
      setRubrics(data);
    } catch (err) {
      console.error("Error fetching rubrics:", err);
    }
  };

  const handleEdit = (rubric) => {
    setSelectedRubric(rubric);
    setShow(true);
  };

  const handleAdd = () => {
    setSelectedRubric(null);
    setShow(true);
  };

  return (
    <div>
      <h2 className="mb-4">Rubric Details</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>Add Rubric</Button>
      </div>

      <RubricList
        rubrics={rubrics}
        onEdit={handleEdit}
        refreshRubrics={fetchRubrics}
      />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRubric ? "Edit Rubric" : "Add Rubric"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RubricForm
            selectedRubric={selectedRubric}
            refreshRubrics={fetchRubrics}
            closeModal={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Rubric;
