
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7084/api/rubricmanagement';
const API_UTILITY = "https://localhost:7084/api/utility";
const API_MARKING_URL = 'https://localhost:7084/api/studentmarking';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

const teacherStudentMarkingService = {
getAllRubrics: async () => {
  const response = await axios.get(`${API_BASE_URL}/list`, getAuthHeader());
  //console.log(response.data);
  return response.data;
},

getStudents : async () => {
  const response = await axios.get(`${API_UTILITY}/getStudents`, getAuthHeader());
  return response.data.result;
},

submitStudentMarking: async (markingData) => {
  const response = await axios.post(
    `${API_MARKING_URL}/marking`,
    markingData,
    getAuthHeader()
  );
  return response.data;
},

getAllGroupedMarkings: async () => {
  const response = await axios.get(`${API_MARKING_URL}/grouped`, getAuthHeader());
  return response.data;
},

};

export default teacherStudentMarkingService;
