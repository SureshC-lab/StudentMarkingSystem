import axios from "axios";

const API_URL = "https://localhost:7084/api/rubriccriteria";
const API_COURSE = "https://localhost:7084/api/rubric";
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

export const getRubricCriteria = async () => {
  //const response = await axios.get(API_URL, getAuthHeaders());
  const response = await axios.get(`${API_URL}/list`, getAuthHeaders());
  return response.data.result;
};

export const getRubricCriteriaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data.result;
};

export const createRubricCriteria = async (rubricCriteria) => {
  return await axios.post(API_URL, rubricCriteria, getAuthHeaders());
};

export const updateRubricCriteria = async (rubricCriteria) => {
  return await axios.put(API_URL, rubricCriteria, getAuthHeaders());
};

export const deleteRubricCriteria = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const getRubric = async () => {
    const response = await axios.get(API_COURSE, getAuthHeaders());
    return response.data.result;
  };