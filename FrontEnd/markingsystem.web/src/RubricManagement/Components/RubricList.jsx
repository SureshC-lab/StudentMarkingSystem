
// import React from 'react';
// import { Table, Modal, Button } from "react-bootstrap";

// const RubricList = ({ rubrics, onEdit, onDelete }) => {
//   return (
//     <div className="table-responsive">
//     <Table striped bordered hover className="w-100">
//       <thead>
//         <tr>
//           <th>Rubric Name</th>
//           {/* <th>Course ID</th> */}
//           <th>Criteria</th>
//           <th>Area</th>
//           <th>Score</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rubrics.map((rubric) => (
//           <tr key={rubric.rubricId}>
//             <td>{rubric.rubricName}</td>
//             {/* <td>{rubric.courseId}</td> */}
//             <td>{rubric.criteria[0]?.description}</td>
//             <td>{rubric.criteria[0]?.area}</td>
//             <td>{rubric.criteria[0]?.maxScore}</td>
//             <td>
//               <button onClick={() => onEdit(rubric)} className="btn btn-warning btn-sm me-2">Edit</button>
//               <button onClick={() => onDelete(rubric.rubricId)} className="btn btn-danger btn-sm">Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//     </div>
//   );
// };

// export default RubricList;




import React from 'react';
import { Table, Button } from "react-bootstrap";

const RubricList = ({ rubrics, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>Rubric Name</th>
            {/* <th>Course ID</th> */}
            <th>Criteria</th>
            <th>Area</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rubrics.map((rubric) =>
            rubric.criteria.map((criterion, index) => (
              <tr key={`${rubric.rubricId}-${index}`}>
                {/* <td>{index === 0 ? rubric.rubricName : ''}</td>  */}
                <td>{rubric.rubricName}</td>
                <td>{criterion.description}</td>
                <td>{criterion.area}</td>
                <td>{criterion.maxScore}</td>
                <td>
                  {/* {index === 0 && (
                    <> */}
                      <button onClick={() => onEdit(rubric)} className="btn btn-warning btn-sm me-2">Edit</button>
                      <button onClick={() => onDelete(rubric.rubricId)} className="btn btn-danger btn-sm">Delete</button>
                    {/* </>
                  )} */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RubricList;












// import React from 'react';
// import { useState } from "react";
// //import { deleteRubric } from "../Services/rubricService";
// import rubricService from '../Services/rubricService';
// import { Table, Modal, Button } from "react-bootstrap";
// import { toast } from "react-toastify";

// const RubricList = ({ rubrics, onEdit, onDelete }) => {

  // const [showModal, setShowModal] = useState(false);
  //   const [rubricToDelete, setRubricToDelete] = useState(null);
  
  //   const handleDelete = (id) => {
  //     setRubricToDelete(id);
  //     setShowModal(true);  
  //   };
  
  //   const confirmDelete = async () => {
  //     if (rubricToDelete) {
  //       try {
  //         //await deleteRubric(rubricToDelete);
  //         await rubricService.deleteRubric(rubricToDelete);
  //         toast.success("Rubric deleted successfully");
  //         //refreshRubrics();
  //       } catch (err) {
  //         toast.error("Error deleting rubric");
  //       } finally {
  //         setShowModal(false); 
  //         setRubricToDelete(null);
  //       }
  //     }
  //   };
  
  //   const handleCancel = () => {
  //     setShowModal(false); 
  //     setRubricToDelete(null);
  //   };

//   return (
//     <div className="table-responsive">
//     <Table striped bordered hover className="w-100">
//       <thead>
//         <tr>
//           <th>Rubric Name</th>
//           <th>Course ID</th>
//           <th>Criteria</th>
//           <th>Score</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rubrics.map((rubric) => (
//           <tr key={rubric.rubricId}>
//             <td>{rubric.rubricName}</td>
//             <td>{rubric.courseId}</td>
//             <td>{rubric.criteria[0]?.description}</td>
//             <td>{rubric.criteria[0]?.maxScore}</td>
//             <td>
//               <button onClick={() => onEdit(rubric)} className="btn btn-warning btn-sm me-2">Edit</button>
//               {/* <button onClick={() => onDelete(rubric.rubricId)} className="btn btn-danger btn-sm">Delete</button> */}
//               <Button variant="danger" onClick={() => handleDelete(rubric.rubricId)}>Delete</Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>

    // <Modal show={showModal} onHide={handleCancel}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Confirm Deletion</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Are you sure you want to delete this rubric?</Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleCancel}>
    //         Cancel
    //       </Button>
    //       <Button variant="danger" onClick={confirmDelete}>
    //         Delete
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
//       </div>
    
//   );
// };

// export default RubricList;


















// import React from 'react';

// const RubricList = ({ rubrics, onEdit, onDelete }) => {
//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Rubric Name</th>
//           <th>Course ID</th>
//           <th>Criteria</th>
//           <th>Score</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rubrics.map((rubric) => (
//           <tr key={rubric.rubricId}>
//             <td>{rubric.rubricName}</td>
//             <td>{rubric.courseId}</td>
//             <td>{rubric.criteria[0]?.description}</td>
//             <td>{rubric.criteria[0]?.maxScore}</td>
//             <td>
//               <button onClick={() => onEdit(rubric)} className="btn btn-warning btn-sm me-2">Edit</button>
//               <button onClick={() => onDelete(rubric.rubricId)} className="btn btn-danger btn-sm">Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default RubricList;