// import React from "react";

// function Dashboard() {
//   return (
//     <div>
//       <h2>Welcome to the Dashboard!</h2>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "react-bootstrap";
import { Menu, Home, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Course1", users: 6 },
  { name: "Course2", users: 7 },
  { name: "Course3", users: 5 },
  { name: "Course4", users: 4 },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="d-flex h-100">
       {/* Sidebar */}
      {/* <aside
        className={`bg-dark text-white p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-100"} fixed-md`}
        style={{ width: "250px" }}
      >
        <h2 className="h5">Admin Dashboard</h2>
        <nav className="mt-4">
          <Button variant="link" className="text-white d-flex align-items-center gap-2">
            <Home size={18} /> Dashboard
          </Button>
          <Button variant="link" className="text-white d-flex align-items-center gap-2">
            <Users size={18} /> Users
          </Button>
          <Button variant="link" className="text-white d-flex align-items-center gap-2">
            <Settings size={18} /> Settings
          </Button>
          <Button variant="link" className="text-white d-flex align-items-center gap-2" onClick={() => navigate("/course")}>
            <Settings size={18} /> Course
          </Button>
          <Button variant="link" className="text-white d-flex align-items-center gap-2" onClick={() => navigate("/rubric")}>
            <Settings size={18} /> Rubric
          </Button>
          <Button variant="link" className="text-white d-flex align-items-center gap-2" onClick={() => navigate("/rubriccriteria")}>
            <Settings size={18} /> Rubric Criteria
          </Button>
        </nav>
      </aside> */}

{/* Main Content Area */}
      <div className="flex-fill bg-light p-4">
        <header className="d-flex justify-content-between align-items-center bg-white p-4 shadow-sm">
          <button className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="h5">Dashboard</h1>
        </header>

        <h2 className="mt-4">Welcome to the Dashboard!</h2>

{/* Cards and Graph */}
        {/* <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card p-4">
              <h5 className="card-title">Total Course</h5>
              <p className="h4 font-weight-bold">12</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4">
              <h5 className="card-title">Total Teachers</h5>
              <p className="h4 font-weight-bold">5</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4">
              <h5 className="card-title">Total Rubric</h5>
              <p className="h4 font-weight-bold">8</p>
            </div>
          </div>
        </div> */}

{/* Bar Chart */}
        {/* <div className="bg-white p-4 rounded shadow mt-4">
          <h5 className="mb-4">Marking By Course</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}


<img 
  src="/Images/AucklandInstitute.jpg" 
  alt="Dashboard" 
  className="img-fluid my-3" 
  style={{ maxWidth: "100%" }}
/>

      </div>
    </div>
  );
}

export default Dashboard;


