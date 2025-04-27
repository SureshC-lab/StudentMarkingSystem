import React, { useEffect, useState } from 'react';
import teacherStudentMarkingService from '../Services/teacherStudentMarking';
import { Form, Button } from "react-bootstrap";

const TeacherStudentMarking = () => {
  const [rubricData, setRubricData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [marks, setMarks] = useState({
    studentId: "",
    totalMarks: 0,
  });
  const [students, setStudents] = useState([]);
  const [validationError, setValidationError] = useState(""); // Store validation error message
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Disable submit button

  const levels = ['Excellent', 'Good', 'Fair', 'Poor'];

  useEffect(() => {
    const fetchRubrics = async () => {
      try {
        const data = await teacherStudentMarkingService.getAllRubrics();
        console.log("rubric marking",data);
        setRubricData(data);
      } catch (error) {
        console.error('Failed to load rubrics:', error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchStudents() {
      try {
        const data = await teacherStudentMarkingService.getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students");
      }
    }

    fetchStudents();
    fetchRubrics();

    setMarks({ studentId: "", totalMarks: 0 });
  }, []);

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  // For saving scores
  const handleInputChange = (rubricName, value) => {
    const numericValue = parseFloat(value) || 0; // Ensure the value is a valid number

    setFeedbackInputs((prev) => {
      const updatedFeedback = {
        ...prev,
        [rubricName]: numericValue,
      };

      // Recalculate totalMarks based on updated feedbackInputs
      const newTotalMarks = Object.values(updatedFeedback).reduce((sum, score) => sum + score, 0);
      setMarks((prevMarks) => ({ ...prevMarks, totalMarks: newTotalMarks }));

      // Check if all fields are either 1 or 5
      const allOnesOrFives = Object.values(updatedFeedback).every(score => score === 1 || score === 5);

      if (allOnesOrFives) {
        setValidationError("Invalid: All fields cannot be set to the same value (either all 1 or all 5).");
        setIsSubmitDisabled(true); // Disable submit button if all values are 1 or 5
      } else {
        setValidationError(""); // Clear validation error
        setIsSubmitDisabled(false); // Enable submit button
      }

      return updatedFeedback;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If the validation error exists, don't submit the form
    if (validationError) {
      alert(validationError);
      return;
    }

    // const payload = Object.entries(feedbackInputs).map(([rubricName, score]) => ({
    //   rubricName,
    //   score
    // }));
    const payload = {
      studentId: marks.studentId,
      totalMarks: marks.totalMarks,
      rubricScores: Object.entries(feedbackInputs).map(([rubricName, score]) => ({
        rubricName,
        score
      }))
    };

    try {
      await teacherStudentMarkingService.submitStudentMarking(payload);
      alert("Marks submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }
  };

  const groupByRubric = () => {
    const grouped = {};
    rubricData.forEach(({ rubricName, criteria }) => {
      if (!grouped[rubricName]) grouped[rubricName] = {};
      criteria.forEach(crit => {
        grouped[rubricName][crit.area] = crit.description;
      });
    });
    return grouped;
  };

  const groupedRubrics = groupByRubric();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="container mt-4">
        <h3 className="mb-3">Marking</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Form.Group className="mb-3" controlId="studentDropdown">
              <Form.Label>Select Student</Form.Label>
              <Form.Select
                name="studentId"
                value={marks.studentId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a Student --</option>
                {students.map((student) => (
                  <option key={student.value} value={student.value}>
                    {student.text}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {validationError && <div className="alert alert-danger">{validationError}</div>} {/* Display error message */}

            <table className="table table-bordered rubric-table">
              <thead>
                <tr>
                  <th>Area</th>
                  {/* {levels.map((level) => (
                    <th key={level}>{level}</th>
                  ))} */}
                  {levels.map((level) => {
      let value = 0;
      if (level === 'Excellent') value = 4;
      else if (level === 'Good') value = 3;
      else if (level === 'Fair') value = 2;
      else if (level === 'Poor') value = 1;

      return (
        <th key={level}>
          {level} ({value})
        </th>
      );
    })}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedRubrics).map(([rubricName, descriptions], idx) => (
                  <tr key={idx}>
                    <td><strong>{rubricName}</strong></td>
                    {levels.map((level) => (
                      <td key={level}>{descriptions[level] || '-'}</td>
                    ))}
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={feedbackInputs[rubricName] || ''}
                        onChange={(e) => handleInputChange(rubricName, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5}>Total</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={marks.totalMarks}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div className="text-end mt-3">
              <button className="btn btn-primary" type="submit" disabled={isSubmitDisabled}>
                Submit Marks
              </button>
            </div> */}
            <Button
        variant={"primary"}
        type="submit"
        disabled={isSubmitDisabled}>
        {"Submit Marks"}
      </Button>
          </>
        )}
      </div>
    </Form>
  );
};

export default TeacherStudentMarking;













// import React, { useEffect, useState } from 'react';
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';
// import { Form, Button } from "react-bootstrap";

// const TeacherStudentMarking = () => {
//   const [rubricData, setRubricData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [feedbackInputs, setFeedbackInputs] = useState({});

//   const levels = ['Excellent', 'Good', 'Fair', 'Poor'];

//   const [marks, setMarks] = useState({
//     studentId: "",
//     totalMarks: 0,
//   });
//   const [students, setStudents] = useState([]);
//   const [validationError, setValidationError] = useState(""); // To store validation error message

//   useEffect(() => {
//     const fetchRubrics = async () => {
//       try {
//         const data = await teacherStudentMarkingService.getAllRubrics();
//         setRubricData(data);
//       } catch (error) {
//         console.error('Failed to load rubrics:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     async function fetchStudents() {
//       try {
//         const data = await teacherStudentMarkingService.getStudents();
//         setStudents(data);
//       } catch (err) {
//         console.error("Failed to load students");
//       }
//     }
//     fetchStudents();

//     fetchRubrics();

//     setMarks({ studentId: "", totalMarks: 0 });
//   }, []);

//   const handleChange = (e) => {
//     setMarks({ ...marks, [e.target.name]: e.target.value });
//   };

//   // For saving scores
//   const handleInputChange = (rubricName, value) => {
//     const numericValue = parseFloat(value) || 0; // Make sure the value is a number, default to 0 if invalid

//     setFeedbackInputs((prev) => {
//       const updatedFeedback = {
//         ...prev,
//         [rubricName]: numericValue,
//       };

//       // Recalculate totalMarks based on updated feedbackInputs
//       const newTotalMarks = Object.values(updatedFeedback).reduce((sum, score) => sum + score, 0);
//       setMarks((prevMarks) => ({ ...prevMarks, totalMarks: newTotalMarks }));

//       // Validation check: check if all inputs are either 1 or 5
//       const allOnesOrFives = Object.values(updatedFeedback).every(score => score === 1 || score === 5);
      
//       // If all values are either 1 or 5, set error message
//       if (allOnesOrFives) {
//         setValidationError("Invalid: All fields cannot be set to the same value (either all 1 or all 5).");
//       } else {
//         setValidationError(""); // Clear error message
//       }

//       return updatedFeedback;
//     });
//   };

//   const handleSubmit = async () => {
//     // Check if there is a validation error before submitting
//     if (validationError) {
//       alert(validationError);
//       return;
//     }

//     const payload = Object.entries(feedbackInputs).map(([rubricName, score]) => ({
//       rubricName,
//       score
//     }));

//     try {
//       await teacherStudentMarkingService.submitMarks(payload);
//       alert("Marks submitted successfully!");
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   const groupByRubric = () => {
//     const grouped = {};
//     rubricData.forEach(({ rubricName, criteria }) => {
//       if (!grouped[rubricName]) grouped[rubricName] = {};
//       criteria.forEach(crit => {
//         grouped[rubricName][crit.area] = crit.description;
//       });
//     });
//     return grouped;
//   };

//   const groupedRubrics = groupByRubric();

//   return (
//     <Form onSubmit={handleSubmit}>
//       <div className="container mt-4">
//         <h3 className="mb-3">Marking</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <Form.Group className="mb-3" controlId="studentDropdown">
//               <Form.Label>Select Student</Form.Label>
//               <Form.Select
//                 name="studentId"
//                 value={marks.studentId}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select a Student --</option>
//                 {students.map((student) => (
//                   <option key={student.value} value={student.value}>
//                     {student.text}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {validationError && <div className="alert alert-danger">{validationError}</div>} {/* Display error message */}

//             <table className="table table-bordered rubric-table">
//               <thead>
//                 <tr>
//                   <th>Area</th>
//                   {levels.map((level) => (
//                     <th key={level}>{level}</th>
//                   ))}
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(groupedRubrics).map(([rubricName, descriptions], idx) => (
//                   <tr key={idx}>
//                     <td><strong>{rubricName}</strong></td>
//                     {levels.map((level) => (
//                       <td key={level}>{descriptions[level] || '-'}</td>
//                     ))}
//                     <td>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={feedbackInputs[rubricName] || ''}
//                         onChange={(e) => handleInputChange(rubricName, e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan={5}>Total</td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={marks.totalMarks}
//                       onChange={handleChange}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="text-end mt-3">
//               <button className="btn btn-primary" onClick={handleSubmit}>
//                 Submit Marks
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </Form>
//   );
// };

// export default TeacherStudentMarking;











// import React, { useEffect, useState } from 'react';
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';
// import { Form, Button } from "react-bootstrap";

// const TeacherStudentMarking = () => {
//   const [rubricData, setRubricData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [feedbackInputs, setFeedbackInputs] = useState({});

//   const levels = ['Excellent', 'Good', 'Fair', 'Poor'];

//   const [marks, setMarks] = useState({
//     studentId: "",
//     totalMarks: 0, // Make sure the total starts at 0
//   });
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchRubrics = async () => {
//       try {
//         const data = await teacherStudentMarkingService.getAllRubrics();
//         setRubricData(data);
//       } catch (error) {
//         console.error('Failed to load rubrics:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     async function fetchStudents() {
//       try {
//         const data = await teacherStudentMarkingService.getStudents();
//         setStudents(data);
//       } catch (err) {
//         console.error("Failed to load students");
//       }
//     }
//     fetchStudents();

//     fetchRubrics();

//     setMarks({ studentId: "", totalMarks: 0 }); // Reset the total marks when component loads
//   }, []);

//   const handleChange = (e) => {
//     setMarks({ ...marks, [e.target.name]: e.target.value });
//   };

//   // For saving scores
//   const handleInputChange = (rubricName, value) => {
//     const numericValue = parseFloat(value) || 0; // Make sure the value is a number, default to 0 if invalid

//     setFeedbackInputs((prev) => {
//       const updatedFeedback = {
//         ...prev,
//         [rubricName]: numericValue,
//       };

//       // Recalculate totalMarks based on updated feedbackInputs
//       const newTotalMarks = Object.values(updatedFeedback).reduce((sum, score) => sum + score, 0);
//       setMarks((prevMarks) => ({ ...prevMarks, totalMarks: newTotalMarks }));

//       // Validation check: if all values are 1 or all values are 5
//       const allOnes = Object.values(updatedFeedback).every(score => score === 1);
//       const allFives = Object.values(updatedFeedback).every(score => score === 5);

//       if (allOnes || allFives) {
//         alert('All fields cannot be set to 1 or all to 5');
//         return prev; // If the validation fails, keep the previous state
//       }

//       return updatedFeedback;
//     });
//   };

//   const handleSubmit = async () => {
//     const payload = Object.entries(feedbackInputs).map(([rubricName, score]) => ({
//       rubricName,
//       score
//     }));

//     try {
//       await teacherStudentMarkingService.submitMarks(payload);
//       alert("Marks submitted successfully!");
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   const groupByRubric = () => {
//     const grouped = {};
//     rubricData.forEach(({ rubricName, criteria }) => {
//       if (!grouped[rubricName]) grouped[rubricName] = {};
//       criteria.forEach(crit => {
//         grouped[rubricName][crit.area] = crit.description;
//       });
//     });
//     return grouped;
//   };

//   const groupedRubrics = groupByRubric();

//   return (
//     <Form onSubmit={handleSubmit}>
//       <div className="container mt-4">
//         <h3 className="mb-3">Marking</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <Form.Group className="mb-3" controlId="studentDropdown">
//               <Form.Label>Select Student</Form.Label>
//               <Form.Select
//                 name="studentId"
//                 value={marks.studentId}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select a Student --</option>
//                 {students.map((student) => (
//                   <option key={student.value} value={student.value}>
//                     {student.text}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <table className="table table-bordered rubric-table">
//               <thead>
//                 <tr>
//                   <th>Area</th>
//                   {levels.map((level) => (
//                     <th key={level}>{level}</th>
//                   ))}
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(groupedRubrics).map(([rubricName, descriptions], idx) => (
//                   <tr key={idx}>
//                     <td><strong>{rubricName}</strong></td>
//                     {levels.map((level) => (
//                       <td key={level}>{descriptions[level] || '-'}</td>
//                     ))}
//                     <td>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={feedbackInputs[rubricName] || ''}
//                         onChange={(e) => handleInputChange(rubricName, e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan={5}>Total</td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={marks.totalMarks}
//                       onChange={handleChange}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="text-end mt-3">
//               <button className="btn btn-primary" onClick={handleSubmit}>
//                 Submit Marks
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </Form>
//   );
// };

// export default TeacherStudentMarking;








// import React, { useEffect, useState } from 'react';
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';
// import { Form, Button } from "react-bootstrap";

// const TeacherStudentMarking = () => {
//   const [rubricData, setRubricData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [feedbackInputs, setFeedbackInputs] = useState({});

//   const levels = ['Excellent', 'Good', 'Fair', 'Poor'];

//   const [marks, setMarks] = useState({
//     studentId: "",
//     totalMarks : ""
//   });
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchRubrics = async () => {
//       try {
//         const data = await teacherStudentMarkingService.getAllRubrics();
//         setRubricData(data);
//       } catch (error) {
//         console.error('Failed to load rubrics:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     async function fetchStudents() {
//           try {
//             const data = await teacherStudentMarkingService.getStudents();
//             setStudents(data);
//           } catch (err) {
//             console.error("Failed to load students");
//           }
//         }
//         fetchStudents();

//     fetchRubrics();

//     setMarks({ studentId: "", totalMarks: "" });
//   }, []);

//   const handleChange = (e) => {
//     setMarks({ ...marks, [e.target.name]: e.target.value });
//   };
//   //for savinf scores
//   const handleInputChange = (rubricName, value) => {
//     setFeedbackInputs(prev => ({
//       ...prev,
//       [rubricName]: value
//     }));
//   };
//   const handleSubmit = async () => {
//     const payload = Object.entries(feedbackInputs).map(([rubricName, score]) => ({
//       rubricName,
//       score
//     }));

//     try {
//       // Replace with your actual POST API to save feedback/scores
//       await teacherStudentMarkingService.submitMarks(payload);
//       alert("Marks submitted successfully!");
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };
// //end saving score

//   const groupByRubric = () => {
//     const grouped = {};
//     rubricData.forEach(({ rubricName, criteria }) => {
//       if (!grouped[rubricName]) grouped[rubricName] = {};
//       criteria.forEach(crit => {
//         grouped[rubricName][crit.area] = crit.description;
//       });
//     });
//     return grouped;
//   };

//   const groupedRubrics = groupByRubric();

//   return (
// <Form onSubmit={handleSubmit}>

//     <div className="container mt-4">
//       <h3 className="mb-3">Marking</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
        
//         <>
// <Form.Group className="mb-3" controlId="studentDropdown">
//         <Form.Label>Select Student</Form.Label>
//         <Form.Select
//           name="studentId"
//           value={marks.studentId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Select a Student --</option>
//           {students.map((student) => (
//             <option key={student.value} value={student.value}>
//               {student.text}
//             </option>
//           ))}
//         </Form.Select>
//       </Form.Group>


//         <table className="table table-bordered rubric-table">
//           <thead>
//             <tr>
//               <th>Area</th>
//               {/* <th colSpan={levels.length} className="text-center">Level</th> */}
//               {levels.map((level) => (
//                 <th key={level}>{level}</th>
//               ))}
//               <th>Total</th>
//             </tr>
//             {/* <tr>
//               {levels.map((level) => (
//                 <th key={level}>{level}</th>
//               ))}
//             </tr> */}
//           </thead>
//           <tbody>
//             {Object.entries(groupedRubrics).map(([rubricName, descriptions], idx) => (
//               <tr key={idx}>
//                 <td><strong>{rubricName}</strong></td>
//                 {levels.map((level) => (
//                   <td key={level}>{descriptions[level] || '-'}</td>
//                 ))}
//                 <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                     //   placeholder="Enter score"
//                       value={feedbackInputs[rubricName] || ''}
//                       onChange={(e) => handleInputChange(rubricName, e.target.value)}
//                     />
//                   </td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan={5}>Total</td>
//               <td>
//               <input
//                       type="text"
//                       className="form-control"
//                       value={marks.totalMarks}
//                       onChange={handleChange}
//                     />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="text-end mt-3">
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               Submit Marks
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//      </Form>
//   );
// };

// export default TeacherStudentMarking;























// import React, { useEffect, useState } from 'react';
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';

// const TeacherStudentMarking = () => {
//   const [rubricData, setRubricData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [feedbackInputs, setFeedbackInputs] = useState({});

//   const levels = ['Excellent', 'Good', 'Fair', 'Poor'];

//   useEffect(() => {
//     const fetchRubrics = async () => {
//       try {
//         const data = await teacherStudentMarkingService.getAllRubrics();
//         setRubricData(data);
//       } catch (error) {
//         console.error('Failed to load rubrics:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRubrics();
//   }, []);


//   //for savinf scores
//   const handleInputChange = (rubricName, value) => {
//     setFeedbackInputs(prev => ({
//       ...prev,
//       [rubricName]: value
//     }));
//   };
//   const handleSubmit = async () => {
//     const payload = Object.entries(feedbackInputs).map(([rubricName, score]) => ({
//       rubricName,
//       score
//     }));

//     try {
//       // Replace with your actual POST API to save feedback/scores
//       await teacherStudentMarkingService.submitMarks(payload);
//       alert("Marks submitted successfully!");
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };
// //end saving score

//   const groupByRubric = () => {
//     const grouped = {};
//     rubricData.forEach(({ rubricName, criteria }) => {
//       if (!grouped[rubricName]) grouped[rubricName] = {};
//       criteria.forEach(crit => {
//         grouped[rubricName][crit.area] = crit.description;
//       });
//     });
//     return grouped;
//   };

//   const groupedRubrics = groupByRubric();

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-3">Marking</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//         <table className="table table-bordered rubric-table">
//           <thead>
//             <tr>
//               <th>Area</th>
//               {/* <th colSpan={levels.length} className="text-center">Level</th> */}
//               {levels.map((level) => (
//                 <th key={level}>{level}</th>
//               ))}
//               <th>Total</th>
//             </tr>
//             {/* <tr>
//               {levels.map((level) => (
//                 <th key={level}>{level}</th>
//               ))}
//             </tr> */}
//           </thead>
//           <tbody>
//             {Object.entries(groupedRubrics).map(([rubricName, descriptions], idx) => (
//               <tr key={idx}>
//                 <td><strong>{rubricName}</strong></td>
//                 {levels.map((level) => (
//                   <td key={level}>{descriptions[level] || '-'}</td>
//                 ))}
//                 <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                     //   placeholder="Enter score"
//                       value={feedbackInputs[rubricName] || ''}
//                       onChange={(e) => handleInputChange(rubricName, e.target.value)}
//                     />
//                   </td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan={5}>Total</td>
//               <td>
//               {/* <input
//                       type="text"
//                       className="form-control"
//                       value={feedbackInputs[rubricName] || ''}
//                       onChange={(e) => handleInputChange(rubricName, e.target.value)}
//                     /> */}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="text-end mt-3">
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               Submit Marks
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TeacherStudentMarking;
