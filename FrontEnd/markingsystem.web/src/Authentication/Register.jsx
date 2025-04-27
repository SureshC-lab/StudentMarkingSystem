import React, { useEffect, useState } from "react";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  async function userRegister(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7084/api/auth/register", {
        email: email,
        password: password,
        username: username,
        fullname: fullname,
        role: role
      });
      alert("User Registered Successfully");
      setEmail("");
      setPassword("");
      setUserName("");
      setFullName("");
      setRole("");
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>User Register</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <label>UserName</label>
            <input
              type="text"
              class="form-control"
              id="username"
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              value={fullname}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select
              className="form-control"
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={userRegister}>
              Register
            </button>
          </div>
        </form>

        <div className="mt-3">
          <p>
            Already registered?{" "}
            <a
              href="./"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Login here
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register;