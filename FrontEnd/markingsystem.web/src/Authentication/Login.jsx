import React,{Fragment, useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-bootstrap/dist/react-bootstrap.min.js';
import { toast } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const clear =()=>{
      setEmail('');
      setPassword('');
  }

    async function userLogin(event) {
        event.preventDefault();
        try {
         const response =  await axios.post("https://localhost:7084/api/auth/login", {
            email: email,
            password: password,
          });
          console.log(response);
          const token = response.data.result.token;
          setToken(token);
          localStorage.setItem("authToken", token);
          toast.success("Logged in successfully");
          // toast.success("Logged in Successfully", { autoClose: 3000 });
          navigate("/dashboard");
          //navigate("/course");
        } catch (err) {
          toast.error("Login failed. Please check your credentials.");
        }
      }


      return (
        <div>
            <h1>User Login</h1>
            <div class="container mt-4">
                <form>
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
                <div>
                <button class="btn btn-primary mt-4" onClick={userLogin}>
                    Login
                  </button>
                </div>
                </form>

                <div className="mt-3">
          <p>
            Not registered yet?{" "}
            <a
              href="/register"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Register here
            </a>
          </p>
        </div>

            </div>
        </div>
      )
}

export default Login;