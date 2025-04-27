import axios from "axios";

const API_URL = "https://localhost:7084/api/rubric";
const API_COURSE = "https://localhost:7084/api/course";
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

export const getRubric = async () => {
  //const response = await axios.get(API_URL, getAuthHeaders());
  const response = await axios.get(`${API_URL}/list`, getAuthHeaders());
  return response.data.result;
};

export const getRubricById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data.result;
};

export const createRubric = async (rubric) => {
  return await axios.post(API_URL, rubric, getAuthHeaders());
};

export const updateRubric = async (rubric) => {
  return await axios.put(API_URL, rubric, getAuthHeaders());
};

export const deleteRubric = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const getCourses = async () => {
    const response = await axios.get(API_COURSE, getAuthHeaders());
    return response.data.result;
  };