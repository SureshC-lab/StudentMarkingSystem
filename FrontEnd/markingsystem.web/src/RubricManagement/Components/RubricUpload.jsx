import React, { useState } from 'react';
import rubricService from '../Services/rubricService';
import { toast } from "react-toastify";

const RubricUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    //await rubricService.uploadRubric(file);
    //onUpload();
    try {
        await rubricService.uploadRubric(file);
        toast.success('Upload successful!');
        onUpload();
      } catch (error) {
        toast.error('Upload failed.');
      }
  
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/templates/RubricExcelFormat.xlsx'; 
    link.download = 'rubric-template.xlsx'; 
    link.click();
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn btn-primary ms-2">Upload</button>
      <button onClick={handleDownloadTemplate} className="btn btn-secondary ms-2">Download Template</button>
    </div>
  );
};

export default RubricUpload;