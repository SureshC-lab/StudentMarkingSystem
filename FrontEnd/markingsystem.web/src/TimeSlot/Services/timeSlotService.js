import axios from "axios";

const API_URL = "https://localhost:7084/api/timeslot";
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

export const getTimeSlot = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data.result;
};

export const getTimeSlotById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data.result;
};

export const createTimeSlot = async (course) => {
  return await axios.post(API_URL, course, getAuthHeaders());
};

export const updateTimeSlot = async (course) => {
  return await axios.put(API_URL, course, getAuthHeaders());
};

export const deleteTimeSlot = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
