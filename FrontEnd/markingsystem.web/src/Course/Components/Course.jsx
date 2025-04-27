import { useState, useEffect } from "react";
import { getCourses } from "../Services/courseService";
import CourseForm from "../Components/CourseForm";
import CourseList from "../Components/CourseList";
import { Modal, Button } from "react-bootstrap";

function Course() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handleEdit = (course) => {
    course.startDate = course.startDate.split("T")[0];
    course.endDate = course.endDate.split("T")[0];
    setSelectedCourse(course);
    setShow(true);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setShow(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="mb-4">Course Details</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>Add Course</Button>
      </div>

      <CourseList
        courses={courses}
        onEdit={handleEdit}
        refreshCourses={fetchCourses}
      />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static" // Prevents closing when clicking outside
        keyboard={false} // Optionally disable closing on pressing the escape key
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCourse ? "Edit Course" : "Add Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseForm
            selectedCourse={selectedCourse}
            refreshCourses={fetchCourses}
            closeModal={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Course;
