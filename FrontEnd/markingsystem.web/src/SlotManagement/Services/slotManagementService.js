import axios from "axios";

const API_URL = "https://localhost:7084/api/slotmanagement";
const API_UTILITY = "https://localhost:7084/api/utility";
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

export const getSlotManagement = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  console.log(response.data);
  return response.data;
};

export const getSlotManagementById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createSlotManagement = async (slot) => {
  return await axios.post(API_URL, slot, getAuthHeaders());
};

// export const createSlotManagement = async (slot, studentId) => {
//     const data = {
//       slotDto: slot,    // slotDto here matches your API's parameter name
//       studentId: studentId,
//     };
//     console.log(data);
//     console.log(getAuthHeaders());
//     //return await axios.post(`${API_URL}/CreateSlotAndBookAsync`, payload, getAuthHeaders());
//     return await axios.post(API_URL, data, getAuthHeaders());
//   };

export const updateSlotManagement = async (slot) => {
  return await axios.put(API_URL, slot, getAuthHeaders());
};

export const deleteSlotManagement = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const getStudents = async () => {
  const response = await axios.get(`${API_UTILITY}/getStudents`, getAuthHeaders());
  return response.data.result;
};



















// import axios from "axios";

// const API_URL = "https://localhost:7084/api/slotmanagement";
// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//     "Content-Type": "application/json",
//   },
// });

// export const getSlotManagement = async () => {
//   const response = await axios.get(API_URL, getAuthHeaders());
//   return response.data.result;
// };

// export const getSlotManagementById = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
//   return response.data.result;
// };

// export const createSlotManagement = async (slot) => {
//   return await axios.post(API_URL, slot, getAuthHeaders());
// };

// export const updateSlotManagement = async (slot) => {
//   return await axios.put(API_URL, slot, getAuthHeaders());
// };

// export const deleteSlotManagement = async (id) => {
//   return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
// };
