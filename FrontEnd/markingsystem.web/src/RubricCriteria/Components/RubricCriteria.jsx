import { useState, useEffect } from "react";
import { getRubricCriteria } from "../Services/rubricCriteriaService";
import RubricCriteriaForm from "../Components/RubricCriteriaForm";
import RubricCriteriaList from "../Components/RubricCriteriaList";
import { Modal, Button } from "react-bootstrap";

function RubricCriteria() {
  const [rubricsCriteria, setRubricsCriteria] = useState([]);
  const [selectedRubricCriteria, setSelectedRubricCriteria] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchRubricsCriteria();
  }, []);

  const fetchRubricsCriteria = async () => {
    try {
      const data = await getRubricCriteria();
      setRubricsCriteria(data);
    } catch (err) {
      console.error("Error fetching rubric criteria:", err);
    }
  };

  const handleEdit = (rubricCriteria) => {
    setSelectedRubricCriteria(rubricCriteria);
    setShow(true);
  };

  const handleAdd = () => {
    setSelectedRubricCriteria(null);
    setShow(true);
  };

  return (
    <div>
      <h2 className="mb-4">Rubric Criteria Details</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>Add Rubric Criteria</Button>
      </div>

      <RubricCriteriaList
        rubricsCriteria={rubricsCriteria}
        onEdit={handleEdit}
        refreshRubricsCriteria={fetchRubricsCriteria}
      />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRubricCriteria
              ? "Edit Rubric Criteria"
              : "Add Rubric Criteria"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RubricCriteriaForm
            selectedRubricCriteria={selectedRubricCriteria}
            refreshRubricsCriteria={fetchRubricsCriteria}
            closeModal={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RubricCriteria;
