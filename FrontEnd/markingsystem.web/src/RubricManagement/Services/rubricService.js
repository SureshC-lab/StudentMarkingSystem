
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7084/api/rubricmanagement';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

const rubricService = {
  uploadRubric: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },


  getRubricById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  },

 
  updateRubric: async (id, rubricDto) => {
    console.log(rubricDto);
    console.log(rubricDto.rubricId);
    const response = await axios.put(`${API_BASE_URL}/${id}`, rubricDto, getAuthHeader());
    return response.data;
  },

 
  deleteRubric: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  },


getAllRubrics: async () => {
  const response = await axios.get(`${API_BASE_URL}/list`, getAuthHeader());
  console.log(response.data);
  return response.data;
},

};

export default rubricService;
