import { useState, useEffect } from "react";
import { createCourse, updateCourse, getTeachers } from "../Services/courseService";
//import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";

function CourseForm({ selectedCourse, refreshCourses, closeModal }) {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    startDate: "",
    endDate: "",
    teacherId: ""
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
    if (selectedCourse) {
      setCourse(selectedCourse);
    } else {
      setCourse({ courseName: "", courseCode: "", description: "", startDate: "", endDate: "", teacherId: "" });
    }
  }, [selectedCourse]);

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // useEffect(() => {
  //   async function fetchTeachers() {
  //     try {
  //       const data = await getTeachers();
  //       setTeachers(data); 
  //     } catch (err) {
  //       console.error("Error fetching teachers:", err);
  //       toast.error("Failed to load teachers");
  //     }
  //   }
  //   fetchTeachers();
  // }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCourse) {
        await updateCourse(course);
        toast.success("Course updated successfully");
      } else {
        await createCourse(course);
        toast.success("Course created successfully");
      }
      refreshCourses();
      closeModal();
    } catch (err) {
      toast.error("Error saving course");
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="courseNameInput">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Course Name"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="courseCourseInput">
        <Form.Label>Course Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Course Code"
          name="courseCode"
          value={course.courseCode}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="descriptionInput">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea" rows={3}
          name="description"
          value={course.description}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="startDateInput">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Start Date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="endDateInput">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="End Date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="teacherDropdown">
        <Form.Label>Select Teacher</Form.Label>
        <Form.Select 
          name="teacherId" 
          value={course.teacherId} 
          onChange={handleChange} 
          required
        >
          <option value="">-- Select a Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.value} value={teacher.value}>
              {teacher.text}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button
        variant={selectedCourse ? "success" : "primary"}
        type="submit">
        {selectedCourse ? "Update" : "Create"}
      </Button>
    </Form>

  );
}

export default CourseForm;
