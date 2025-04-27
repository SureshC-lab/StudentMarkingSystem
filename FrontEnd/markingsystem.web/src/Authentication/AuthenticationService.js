// import axios from "axios";

// const API_URL = "https://localhost:7084/api/auth/change-password";
// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//     "Content-Type": "application/json",
//   },
// });

// export const changePassword = async (password) => {
//     return await axios.post(API_URL, password, getAuthHeaders());
//   };




import axios from "axios";

const API_URL = "https://localhost:7084/api/auth/change-password";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Authentication token is missing.");
    return null;
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const changePassword = async (passwordData) => {
  const headers = getAuthHeaders();
  if (!headers) return;
  
  return await axios.post(API_URL, passwordData, headers);
};
