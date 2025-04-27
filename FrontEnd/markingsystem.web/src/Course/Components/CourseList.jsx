
import { useState } from "react";
import { deleteCourse } from "../Services/courseService";
import { toast } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';
import { Table, Modal, Button } from "react-bootstrap";

function CourseList({ courses, onEdit, refreshCourses }) {
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleDelete = (id) => {
    setCourseToDelete(id);
    setShowModal(true);  // Show the modal
  };

  const confirmDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete);
        toast.success("Course deleted successfully");
        refreshCourses();
      } catch (err) {
        toast.error("Error deleting course");
      } finally {
        setShowModal(false); // Close the modal after success or failure
        setCourseToDelete(null);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal without deleting
    setCourseToDelete(null);
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={course.courseId}>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.description}</td>
                <td>{new Date(course.startDate).toLocaleDateString()}</td>
                <td>{new Date(course.endDate).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" onClick={() => onEdit(course)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(course.courseId)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No courses available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
}

export default CourseList;























// import { deleteCourse } from "../Services/courseService";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Table from 'react-bootstrap/Table';

// function CourseList({ courses, onEdit, refreshCourses }) {
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await deleteCourse(id);
//         toast.success("Course deleted successfully");
//         refreshCourses();
//       } catch (err) {
//         toast.error("Error deleting course");
//       }
//     }
//   };

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Name</th>
//           <th>Description</th>
//           <th>Start Date</th>
//           <th>End Date</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {courses.length > 0 ? (
//           courses.map((course, index) => (
//             <tr key={course.courseId}>
//               <td>{index + 1}</td>
//               <td>{course.courseName}</td>
//               <td>{course.description}</td>
//               <td>{new Date(course.startDate).toLocaleDateString()}</td>
//               <td>{new Date(course.endDate).toLocaleDateString()}</td>
//               <td>
//                 <button onClick={() => onEdit(course)}>Edit</button>
//                 <button onClick={() => handleDelete(course.courseId)}>Delete</button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="6">No courses available</td>
//           </tr>
//         )}
//       </tbody>
//     </Table>
//   );
// }

// export default CourseList;
