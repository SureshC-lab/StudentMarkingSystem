// import React, { useEffect, useState } from "react";
// import teacherStudentMarkingService from '../Services/teacherStudentMarking';

// const StudentFinalMarkingTable = () => {
//   const [groupedData, setGroupedData] = useState([]);

//   useEffect(() => {
//     fetchGroupedMarkings();
//   }, []);

//   // Fetch data from API
//   const fetchGroupedMarkings = async () => {
//     try {
//       const data = await teacherStudentMarkingService.getAllGroupedMarkings();
//       setGroupedData(data);
//     } catch (error) {
//       console.error("Error fetching grouped markings:", error);
//     }
//   };

//   // Get unique rubric names from feedback
//   const getUniqueRubrics = () => {
//     const rubrics = new Set();

//     groupedData.forEach((entry) => {
//       if (entry.feedbackDetails) {
//         entry.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
//       }
//     });

//     return Array.from(rubrics);
//   };

//   const uniqueRubrics = getUniqueRubrics();

//   // Calculate the total score from feedback details
//   const calculateTotal = (feedbackDetails) => {
//     return feedbackDetails.reduce((sum, fd) => sum + fd.score, 0);
//   };

//   // Separate teacher and peer marks, calculate final marks
//   const calculateFinalMarks = (peerMarks, teacherMarks) => {
//     const peerWeight = 0.4;
//     const teacherWeight = 0.6;
//     const finalMarks = peerMarks * peerWeight + teacherMarks * teacherWeight;
//     return finalMarks;
//   };

//   return (
//     <div className="container mt-4">
//       {groupedData.length > 0 ? (
//         groupedData.map((studentGroup, idx) => {
//           // If no feedback details available for the student, return an empty state
//           if (!studentGroup.feedbackDetails || studentGroup.feedbackDetails.length === 0) {
//             return (
//               <div key={idx}>
//                 <h4>No feedback for {studentGroup.studentId}</h4>
//               </div>
//             );
//           }

//           // Separate teacher and peer feedback
//           const teacherFeedback = studentGroup.feedbackDetails.filter(fd => studentGroup.markedBy === "Teacher");
//           const peerFeedback = studentGroup.feedbackDetails.filter(fd => studentGroup.markedBy !== "Teacher");

//           const teacherMarks = calculateTotal(teacherFeedback);
//           const peerMarks = calculateTotal(peerFeedback);

//           // Calculate final marks using the weighted average
//           const finalMarks = calculateFinalMarks(peerMarks, teacherMarks);

//           return (
//             <div key={idx} className="mb-5">
//               <h4>Student Name: {studentGroup.studentId}</h4>
//               <table className="table table-bordered table-striped">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th>Marked By</th>
//                     {uniqueRubrics.map((rubric, index) => (
//                       <th key={index}>{rubric}</th>
//                     ))}
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{studentGroup.markedBy}</td>
//                     {uniqueRubrics.map((rubric, index) => {
//                       const feedback = studentGroup.feedbackDetails.find(fd => fd.rubricName === rubric);
//                       return <td key={index}>{feedback ? feedback.score : 0}</td>;
//                     })}
//                     <td>{calculateTotal(studentGroup.feedbackDetails)}</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div className="mt-3">
//                 <h5>Final Marks: {finalMarks.toFixed(2)}</h5>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No Markings Found</p>
//       )}
//     </div>
//   );
// };

// export default StudentFinalMarkingTable;




import React, { useEffect, useState } from "react";
import teacherStudentMarkingService from '../Services/teacherStudentMarking';

const StudentFinalMarkingTable = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    fetchGroupedMarkings();
  }, []);

  const fetchGroupedMarkings = async () => {
    try {
      const data = await teacherStudentMarkingService.getAllGroupedMarkings();
      // Same as before, no changes needed here
      const groupedStudent = groupByStudent(data);
      const grouped = objectToArray(groupedStudent);
      setGroupedData(grouped);
    } catch (error) {
      console.error("Error fetching grouped markings:", error);
    }
  };

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

  const getUniqueRubrics = () => {
    const rubrics = new Set();
    groupedData.forEach((studentGroup) => {
      studentGroup.feedback.forEach((entry) => {
        entry.feedbackDetails.forEach((fd) => rubrics.add(fd.rubricName));
      });
    });
    return Array.from(rubrics);
  };

  const uniqueRubrics = getUniqueRubrics();

  const calculateTotal = (feedbackDetails) => {
    return feedbackDetails.reduce((sum, fd) => sum + fd.score, 0);
  };

  const calculateFinalMarks = (peerMarks, teacherMarks) => {
    const peerWeight = 0.4;
    const teacherWeight = 0.6;
    return (peerMarks * peerWeight) + (teacherMarks * teacherWeight);
  };

  return (
    <div className="container mt-4">
      {groupedData.length > 0 ? (
        groupedData.map((studentGroup, idx) => {
          const { studentId, feedback } = studentGroup;

          if (!feedback || feedback.length === 0) {
            return (
              <div key={idx}>
                <h4>No feedback for {studentId}</h4>
              </div>
            );
          }

          const teacherFeedback = feedback.filter(f => f.markedBy === "Teacher");
          const peerFeedback = feedback.filter(f => f.markedBy !== "Teacher");

          const teacherMarks = teacherFeedback.reduce((sum, entry) => sum + calculateTotal(entry.feedbackDetails), 0);
          const peerMarks = peerFeedback.reduce((sum, entry) => sum + calculateTotal(entry.feedbackDetails), 0);

          const finalMarks = calculateFinalMarks(peerMarks, teacherMarks);

          return (
            <div key={idx} className="mb-5">
              <h4>Student Name: {studentId}</h4>
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
                  {feedback.map((entry, feedbackIdx) => (
                    <tr key={feedbackIdx}>
                      <td>{entry.markedBy}</td>
                      {uniqueRubrics.map((rubric, index) => {
                        const feedbackItem = entry.feedbackDetails.find(fd => fd.rubricName === rubric);
                        return <td key={index}>{feedbackItem ? feedbackItem.score : 0}</td>;
                      })}
                      <td>{calculateTotal(entry.feedbackDetails)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3">
                <h5>Final Marks (60% teacher + 40% peer): <strong>{finalMarks.toFixed(2)}</strong></h5>
              </div>
            </div>
          );
        })
      ) : (
        <p>No Markings Found</p>
      )}
    </div>
  );
};

export default StudentFinalMarkingTable;

