import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import rubricService from '../Services/rubricService';
import { toast } from "react-toastify";

const RubricForm = ({ rubric, onUpdated }) => {
  const [rubricName, setRubricName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setCriteriaDesc] = useState('');
  const [maxScore, setMaxScoreValue] = useState('');

  useEffect(() => {
    if (rubric) {
      setRubricName(rubric.rubricName || '');
      setCourseId(rubric.courseId || '');
      setCriteriaDesc(rubric.criteria[0]?.description || '');
      setMaxScoreValue(rubric.criteria[0]?.maxScore || '');
    }
  }, [rubric]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRubric = {
      ...rubric,
      rubricName,
      courseId,
      criteria: [
        {
          description,
          maxScore
        }
      ]
    };

    // try {
    //   await rubricService.updateRubric(updatedRubric.rubricId, updatedRubric);
    //   if (onUpdated) onUpdated();
    // } catch (error) {
    //   console.error('Error updating rubric:', error);
    // }

    try {
      await rubricService.updateRubric(updatedRubric.rubricId, updatedRubric);
      if (onUpdated) onUpdated();
      toast.success('update successful!');
    } catch (error) {
      toast.error('update failed.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rubricName" className="mb-3">
        <Form.Label>Rubric Name</Form.Label>
        <Form.Control
          type="text"
          value={rubricName}
          onChange={(e) => setRubricName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Criteria</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setCriteriaDesc(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="maxScore" className="mb-3">
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="text"
          value={maxScore}
          onChange={(e) => setMaxScoreValue(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="courseId" className="mb-3">
        <Form.Label>Course ID</Form.Label>
        <Form.Control
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
      Update
      </Button>
    </Form>
  );
};

export default RubricForm;















// import React, { useState } from 'react';
// import rubricService from '../Services/rubricService';

// const RubricForm = ({ rubric, onUpdated }) => {
//   const [formData, setFormData] = useState({
//     rubricName: rubric.rubricName,
//     courseId: rubric.courseId,
//     criteria: rubric.criteria
//   });

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedCriteria = [...formData.criteria];
//     updatedCriteria[index][name] = value;
//     setFormData({ ...formData, criteria: updatedCriteria });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await rubricService.updateRubric(rubric.rubricId, formData);
//     onUpdated();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       {formData.criteria.map((c, index) => (
//         <div key={index} className="mb-2">
//           <input
//             className="form-control mb-1"
//             name="description"
//             value={c.description}
//             onChange={(e) => handleChange(e, index)}
//             placeholder="Description"
//           />
//           <input
//             className="form-control"
//             name="maxScore"
//             type="number"
//             value={c.maxScore}
//             onChange={(e) => handleChange(e, index)}
//             placeholder="Max Score"
//           />
//         </div>
//       ))}
//       <button type="submit" className="btn btn-success">Update Rubric</button>
//     </form>
//   );
// };

// export default RubricForm;
