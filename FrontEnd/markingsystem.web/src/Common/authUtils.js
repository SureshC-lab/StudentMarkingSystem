
import { jwtDecode } from "jwt-decode";

export const getCurrentUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
     console.log(`$Decode-${JSON.stringify(decoded)}`);
     console.log(`Role: ${decoded.role}`);
    return decoded.role || decoded.roles || decoded?.user?.role || null;
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
};

