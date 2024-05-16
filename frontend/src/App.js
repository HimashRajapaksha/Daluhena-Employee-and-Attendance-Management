import React from 'react';
import './App.css';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';
import AddEmployeeLeave from './components/AddEmployeeLeave';
import AddEmployeeAttendance from './components/AddEmployeeAttendance';
import UpdateEmployeeDetails from './components/UpdateEmployeeDetails';
import Dashboard from './components/Dashboard'; 
import AllEmployeesDisplay from './components/AllEmployeesDisplay';
import AllEmployeeAttendance from './components/AllEmployeeAttendance';
import AllEmployeeLeaves from './components/AllEmployeeLeaves';
import ViewMoreEmployee from './components/ViewMoreEmployee';
import AttendanceReport from './components/AttendanceReport';
import LeaveReport from './components/LeaveReport';
import Login from './components/Login/Login';
import Home from './components/Home/Home';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Routes for adding new data */}
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/EmployeeLeave/add" element={<AddEmployeeLeave />} />
          <Route path="/EmployeeAttendance/add" element={<AddEmployeeAttendance />} />
          
          

          <Route path="/update/:id" element={<UpdateEmployeeDetails />} />
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          {/* Routes for displaying all data */}
          <Route path="/all-employees" element={<AllEmployeesDisplay />} />
          <Route path="/all-attendance-details" element={<AllEmployeeAttendance/>} />
          <Route path="/all-leave-details" element={<AllEmployeeLeaves/>} />
          {/* Route for viewing more employee details */}
          <Route path="/view-more-employee" element={<ViewMoreEmployee />} />

          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="/leave-report" element={<LeaveReport/>} />


          

          {/* Route for the Login */}
          <Route path="/login" element={<Login/>}/>

         {/* Home route */}
        <Route path="/" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
