import { useState, useEffect } from "react";
import { createRubricCriteria, updateRubricCriteria, getRubric } from "../Services/rubricCriteriaService";
import { Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";

function RubricCriteriaForm({ selectedRubricCriteria, refreshRubricsCriteria, closeModal }) {
  const [rubricCriteria, setRubricCriteria] = useState({
    description: "",
    maxScore: "",
    rubricId: ""
  });

  const [rubrics, setRubrics] = useState([]);

  useEffect(() => {
    fetchRubrics();
    if (selectedRubricCriteria) {
      setRubricCriteria(selectedRubricCriteria);
    } else {
      setRubricCriteria({ description: "", maxScore: "", rubricId: "" });
    }
  }, [selectedRubricCriteria]);

  const fetchRubrics = async () => {
    try {
      const data = await getRubric();
      setRubrics(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setRubricCriteria({ ...rubricCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRubricCriteria) {
        await updateRubricCriteria(rubricCriteria);
        toast.success("Rubric Criteria updated successfully");
      } else {
        await createRubricCriteria (rubricCriteria);
        toast.success("Rubric Criteria created successfully");
      }
      refreshRubricsCriteria();
      closeModal();
    } catch (err) {
      toast.error("Error saving rubric criteria");
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="descriptionInput">
        <Form.Label>Rubric Criteria Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rubric Criteria Description"
          name="description"
          value={rubricCriteria.description}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="maxScoreInput">
        <Form.Label>Max Score</Form.Label>
        <Form.Control
          type="text"
          placeholder="Max Score"
          name="maxScore"
          value={rubricCriteria.maxScore}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rubricDropdown">
        <Form.Label>Select Rubric</Form.Label>
        <Form.Select 
          name="rubricId" 
          value={rubricCriteria.rubricId} 
          onChange={handleChange} 
          required
        >
          <option value="">-- Select a Rubric --</option>
          {rubrics.map((rubric) => (
            <option key={rubric.rubricId} value={rubric.rubricId}>
              {rubric.rubricName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button
        variant={selectedRubricCriteria ? "success" : "primary"}
        type="submit">
        {selectedRubricCriteria? "Update" : "Create"}
      </Button>
    </Form>

  );
}

export default RubricCriteriaForm;
