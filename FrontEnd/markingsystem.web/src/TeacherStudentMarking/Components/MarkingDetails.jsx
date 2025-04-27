// import React, { useEffect, useState, useMemo } from "react";
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';

// const StudentGroupedMarkingTable = () => {
//   const [groupedData, setGroupedData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchGroupedMarkings();
//   }, []);

//   const fetchGroupedMarkings = async () => {
//     try {
//       const data = await teacherStudentMarkingService.getAllGroupedMarkings();
//       console.log(data);
//       setGroupedData(data);
//     } catch (error) {
//       console.error("Error fetching grouped markings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Getting unique rubric names
//   const uniqueRubrics = useMemo(() => {
//     const rubrics = new Set();
//     groupedData.forEach((entry) => {
//       entry.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
//     });
//     return Array.from(rubrics);
//   }, [groupedData]);

//   // Function to fetch the score for a particular rubric for a given student's feedback
//   const getScoreForRubric = (feedbackDetails, rubricName) => {
//     // Ensure feedbackDetails is an array
//     if (Array.isArray(feedbackDetails)) {
//       // Find the score for the rubric in feedbackDetails
//       const feedbackEntry = feedbackDetails.find(fd => fd.rubricName === rubricName);
//       return feedbackEntry ? feedbackEntry.score : 0; // Return 0 if rubric is not found
//     }
//     return 0; // Return 0 if feedbackDetails is not valid
//   };

//   // Function to calculate total score from feedbackDetails
//   const calculateTotal = (feedbackDetails) => {
//     return feedbackDetails.reduce((sum, fd) => sum + (fd.score || 0), 0);
//   };

//   return (
//     <div className="container mt-4">
//       {loading ? (
//         <p>Loading...</p>
//       ) : groupedData.length > 0 ? (
//         groupedData.map((studentGroup, idx) => {
//           return (
//             <div key={idx} className="mb-5">
//               <h4>Student Name: {studentGroup.studentId}</h4>
//               <table className="table table-bordered table-striped">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th>Marked By</th>
//                     {uniqueRubrics.map((rubric) => (
//                       <th key={rubric}>{rubric}</th>
//                     ))}
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Iterating over feedbacks (marked by different people) */}
//                   {studentGroup.feedbackDetails.map((feedback, index) => (
//                     <tr key={index}>
//                       <td>{feedback.markedBy || "Unknown"}</td>
//                       {/* Rendering the score for each rubric for the current feedback entry */}
//                       {uniqueRubrics.map((rubric) => (
//                         <td key={rubric}>
//                           {getScoreForRubric(feedback.feedbackDetails, rubric)}
//                         </td>
//                       ))}
//                       <td>{calculateTotal(studentGroup.feedbackDetails)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           );
//         })
//       ) : (
//         <p>No Markings Found</p>
//       )}
//     </div>
//   );
// };

// export default StudentGroupedMarkingTable;




// // import React, { useEffect, useState, useMemo } from "react";
// // import teacherStudentMarkingService from '../Services/teacherStudentMarking';

// // const StudentGroupedMarkingTable = () => {
// //   const [groupedData, setGroupedData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchGroupedMarkings();
// //   }, []);

// //   const fetchGroupedMarkings = async () => {
// //     try {
// //       const data = await teacherStudentMarkingService.getAllGroupedMarkings();
// //       console.log(data);
// //       setGroupedData(data);
// //     } catch (error) {
// //       console.error("Error fetching grouped markings:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const uniqueRubrics = useMemo(() => {
// //     const rubrics = new Set();
// //     groupedData.forEach((entry) => {
// //       entry.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
// //     });
// //     return Array.from(rubrics);
// //   }, [groupedData]);

// //   const calculateTotal = (feedbackDetails) => {
// //     return feedbackDetails.reduce((sum, fd) => sum + (fd.score || 0), 0);
// //   };

// //   // Track the displayed student ids to avoid repetition
// //   const displayedStudents = new Set();

// //   return (
// //     <div className="container mt-4">
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : groupedData.length > 0 ? (
// //         groupedData.map((studentGroup, idx) => {
// //           // Check if this student has already been shown
// //           if (displayedStudents.has(studentGroup.studentId)) {
// //             return null; // Skip rendering if the student has already been shown
// //           }
          
// //           // Mark this student as displayed
// //           displayedStudents.add(studentGroup.studentId);

// //           return (
// //             <div key={idx} className="mb-5">
// //               <h4>Student Name: {studentGroup.studentId}</h4>
// //               <table className="table table-bordered table-striped">
// //                 <thead className="thead-dark">
// //                   <tr>
// //                     <th>Marked By</th>
// //                     {uniqueRubrics.map((rubric) => (
// //                       <th key={rubric}>{rubric}</th>
// //                     ))}
// //                     <th>Total</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {studentGroup.feedbackDetails && studentGroup.feedbackDetails.length > 0 ? (
// //                     studentGroup.feedbackDetails.map((feedback, index) => {
// //                       return (
// //                         <tr key={index}>
// //                           <td>{feedback.markedBy || "Unknown"}</td> {/* If markedBy is undefined, show "Unknown" */}
// //                           {uniqueRubrics.map((rubric) => {
// //                             // Safely access the rubric score
// //                             const feedbackEntry = feedback.feedbackDetails 
// //                               ? feedback.feedbackDetails.find(fd => fd.rubricName === rubric) 
// //                               : null;
// //                             return <td key={rubric}>{feedbackEntry ? feedbackEntry.score : 0}</td>;
// //                           })}
// //                           <td>{calculateTotal(studentGroup.feedbackDetails)}</td>
// //                         </tr>
// //                       );
// //                     })
// //                   ) : (
// //                     <tr><td colSpan={uniqueRubrics.length + 2}>No feedback details available</td></tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           );
// //         })
// //       ) : (
// //         <p>No Markings Found</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default StudentGroupedMarkingTable;


import React, { useEffect, useState } from "react";
import teacherStudentMarkingService from '../Services/teacherStudentMarking';

const StudentGroupedMarkingTable = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    fetchGroupedMarkings();
  }, []);

  function groupByStudent(data) {
    return data.reduce((acc, curr) => {
      const { studentId, markedBy, feedbackDetails } = curr;
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push({ markedBy, feedbackDetails });
      return acc;
    }, {});
  }

  function objectToArray(data) {
    return Object.keys(data).map(studentId => ({
      studentId,
      feedback: data[studentId]
    }));
  }

  const fetchGroupedMarkings = async () => {
    try {
      const data = await teacherStudentMarkingService.getAllGroupedMarkings();
      const groupedStudent = groupByStudent(data);
      const grouped = objectToArray(groupedStudent);
      console.log("object to array:", grouped);
      setGroupedData(grouped);
    } catch (error) {
      console.error("Error fetching grouped markings:", error);
    }
  };

  const getUniqueRubrics = () => {
    const rubrics = new Set();
    groupedData.forEach((studentGroup) => {
      studentGroup.feedback.forEach((fb) => {
        fb.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
      });
    });
    return Array.from(rubrics);
  };

  const uniqueRubrics = getUniqueRubrics();

  const calculateTotal = (feedbackDetails) => {
    return feedbackDetails.reduce((sum, fd) => sum + (fd.score || 0), 0);
  };

  return (
    <div className="container mt-4">
      {groupedData.length > 0 ? (
        groupedData.map((studentGroup, idx) => (
          <div key={idx} className="mb-5">
            <h4>Student Name: {studentGroup.studentId}</h4>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Marked By</th>
                  {uniqueRubrics.map((rubric, index) => (
                    <th key={index}>{rubric}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {studentGroup.feedback.map((marking, markIdx) => (
                  <tr key={markIdx}>
                    <td>{marking.markedBy}</td>
                    {uniqueRubrics.map((rubric, index) => {
                      const feedbackItem = marking.feedbackDetails.find(fd => fd.rubricName === rubric);
                      return (
                        <td key={index}>
                          {feedbackItem ? feedbackItem.score : 0}
                        </td>
                      );
                    })}
                    <td>{calculateTotal(marking.feedbackDetails)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No Markings Found</p>
      )}
    </div>
  );
};

export default StudentGroupedMarkingTable;




/////Working all
// import React, { useEffect, useState } from "react";
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';

// const StudentGroupedMarkingTable = () => {
//   const [groupedData, setGroupedData] = useState([]);

//   useEffect(() => {
//     fetchGroupedMarkings();
//   }, []);

//   function groupByStudent(data) {
//     return data.reduce((acc, curr) => {
//       const { studentId, markedBy, feedbackDetails } = curr;
//       if (!acc[studentId]) {
//         acc[studentId] = [];
//       }
//       acc[studentId].push({ markedBy, feedbackDetails });
//       return acc;
//     }, {});
//   }
//   function objectToArray(data) {
//     return Object.keys(data).map(studentId => ({
//       studentId,
//       feedback: data[studentId]
//     }));
//   }
  
//   // function iterateFeedbackArray(data) {
//   //   const feedbackArray = objectToArray(data);
//   //   return feedbackArray;
//   // }


//   const fetchGroupedMarkings = async () => {
//     try {
//       const data = await teacherStudentMarkingService.getAllGroupedMarkings();
//        const groupedStudent = groupByStudent(data);
//        const grouped = objectToArray(groupedStudent);
//        console.log("aobject to array : ",grouped);
//        setGroupedData(grouped);
//       //setGroupedData(data)
//     } catch (error) {
//       console.error("Error fetching grouped markings:", error);
//     }
//   };

//   const getUniqueRubrics = () => {
//     const rubrics = new Set();
//     groupedData.forEach((entry) => {
//       entry.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
//     });
//     return Array.from(rubrics);
//   };

//   const uniqueRubrics = getUniqueRubrics();

//   const calculateTotal = (feedbackDetails) => {
//     return feedbackDetails.reduce((sum, fd) => sum + fd.score, 0);
//   };

//   return (
//     <div className="container mt-4">
//       {groupedData.length > 0 ? (
//         groupedData.map((studentGroup, idx) => (
//           <div key={idx} className="mb-5">
//             <h4>Student Name: {studentGroup.studentId}</h4>
//             <table className="table table-bordered table-striped">
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Marked By</th>
//                   {uniqueRubrics.map((rubric, index) => (
//                     <th key={index}>{rubric}</th>
//                   ))}
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{studentGroup.markedBy}</td>
//                   {uniqueRubrics.map((rubric, index) => {
//                     const feedback = studentGroup.feedbackDetails.find(fd => fd.rubricName === rubric);
//                     return <td key={index}>{feedback ? feedback.score : 0}</td>;
//                   })}
//                   <td>{calculateTotal(studentGroup.feedbackDetails)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ))
//       ) : (
//         <p>No Markings Found</p>
//       )}
//     </div>
//   );
// };

// export default StudentGroupedMarkingTable;
