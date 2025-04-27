import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Course from "./Course/Components/Course";
import { ToastContainer } from "react-toastify";
import Rubric from "./Rubric/Components/Rubric";
import RubricCriteria from "./RubricCriteria/Components/RubricCriteria";
import Dashboard from "./AdminDashboard/Dashboard";
import NavMenu from "./AdminDashboard/NavMenu";
import ChangePassword from "./Authentication/ChangePassword";
import DateTimeSlot from "./TimeSlot/Components/dateTimeSlot";
import SlotBooking from "./SlotManagement/Components/SlotBooking";
import RubricManagement from './RubricManagement/Components/RubricManagement';
import TeacherStudentMarking from "./TeacherStudentMarking/Components/TeacherStudentMarking";
import StudentGroupedMarkingTable from "./TeacherStudentMarking/Components/MarkingDetails";
import StudentFinalMarkingTable from "./TeacherStudentMarking/Components/FinalMarkingCalculation";


function PrivateRoute({ element }) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/" />; 
  }

  return element; 
}



const Layout = () => {
  const location = useLocation();
  const hideNavMenu = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="d-flex">
      {!hideNavMenu && (
        <div className="sidebar">
          <NavMenu />
        </div>
      )}

      <div className="content-area" style={{ marginLeft: hideNavMenu ? "0" : "250px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/course" element={<PrivateRoute element={<Course />} />} />
          <Route path="/rubric" element={<PrivateRoute element={<Rubric />} />} />
          <Route path="/rubriccriteria" element={<PrivateRoute element={<RubricCriteria />} />} />
          <Route path="/timeslot" element={<PrivateRoute element={<DateTimeSlot/>}/>} />
          <Route path="/slotbooking" element={<PrivateRoute element={<SlotBooking />} />} />
          <Route path="/rubricmanagement" element={<PrivateRoute element={<RubricManagement />} />} />
          <Route path="/teacherstudentmarking" element={<PrivateRoute element={<TeacherStudentMarking />} />} />
          <Route path="/markingdetails" element={<PrivateRoute element={<StudentGroupedMarkingTable />} />} />
          <Route path="/finalmarkingdetails" element={<PrivateRoute element={<StudentFinalMarkingTable />} />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    // <Router>
    //   <div className="d-flex">
    //     <div className="sidebar">
    //       <NavMenu />
    //     </div>
    //     <div className="content-area">
    //       <Routes>
    //         <Route path="/" element={<Login />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/dashboard" element={<Dashboard />} />
    //         <Route path="/course" element={<Course />} />
    //         <Route path="/rubric" element={<Rubric />} />
    //         <Route path="/rubriccriteria" element={<RubricCriteria />} />
    //       </Routes>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </Router>

    <Router>
      <Layout />
      <ToastContainer />
    </Router>

  );
}


{/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
