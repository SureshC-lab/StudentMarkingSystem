import { useState, useEffect } from "react";
import { createRubric, updateRubric, getCourses } from "../Services/rubricService";
import { Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";

function RubricForm({ selectedRubric, refreshRubrics, closeModal }) {
  const [rubric, setRubric] = useState({
    rubricName: "",
    courseId: ""
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    if (selectedRubric) {
      setRubric(selectedRubric);
    } else {
      setRubric({ rubricName: "", courseId: "" });
    }
  }, [selectedRubric]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setRubric({ ...rubric, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRubric) {
        await updateRubric(rubric);
        toast.success("Rubric updated successfully");
      } else {
        await createRubric(rubric);
        toast.success("Rubric created successfully");
      }
      refreshRubrics();
      closeModal();
    } catch (err) {
      toast.error("Error saving rubric");
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="rubricNameInput">
        <Form.Label>Rubric Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rubric Name"
          name="rubricName"
          value={rubric.rubricName}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="courseDropdown">
        <Form.Label>Select Course</Form.Label>
        <Form.Select 
          name="courseId" 
          value={rubric.courseId} 
          onChange={handleChange} 
          required
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button
        variant={selectedRubric ? "success" : "primary"}
        type="submit">
        {selectedRubric? "Update" : "Create"}
      </Button>
    </Form>

  );
}

export default RubricForm;
