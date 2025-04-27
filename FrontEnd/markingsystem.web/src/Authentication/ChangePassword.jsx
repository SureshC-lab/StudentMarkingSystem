import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { changePassword } from "./AuthenticationService";

function ChangePassword({ selectedChangePassword, refreshChangePassword }) {
  const [passwordChange, setPasswordChange] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "", 
  });

  useEffect(() => {
    if (selectedChangePassword) {
      setPasswordChange(selectedChangePassword);
    } else {
      setPasswordChange({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "", 
      });
    }
  }, [selectedChangePassword]);

  const handleChange = (e) => {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    const requestData = {
      email: passwordChange.email,
      oldPassword: passwordChange.currentPassword,
      newPassword: passwordChange.newPassword,
      confirmPassword: passwordChange.confirmPassword,
    };

    try {
      const response = await changePassword(requestData);
  
      if (response.status === 200 && response.data.isSuccess) {
        toast.success(response.data.message || "Password updated successfully.");
        setPasswordChange({
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        if (typeof refreshChangePassword === "function") {
          refreshChangePassword();
        } else {
          console.warn("refreshChangePassword is not provided or is not a function");
        }
      } else {
        throw new Error(response.data.message || "Password update failed.");
      }
    } catch (err) {
      console.error("Caught an error:", err);
      console.error("Error Response Data:", err.response?.data);
  
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }

  };

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={passwordChange.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="currentPassword" className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            value={passwordChange.currentPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={passwordChange.newPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword" 
            value={passwordChange.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
