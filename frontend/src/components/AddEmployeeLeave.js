import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeLeave() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Function to update the error state for a specific field
  const updateErrors = (fieldName, value) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: value ? undefined : `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    }));
  };

  // Function to validate leave end date
  const validateLeaveDates = () => {
    if (new Date(leaveFrom) >= new Date(leaveTo)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        leaveTo: "Leave end date should be after start date"
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        leaveTo: undefined
      }));
    }
  };

  // Function to send data
  const sendData = (e) => {
    e.preventDefault();

    // Perform validation checks
    if (!name || !nic || !jobrole || !leaveType || !leaveFrom || !leaveTo || !leaveStatus) {
      setErrors({
        name: !name ? "Name is required" : undefined,
        nic: !nic ? "NIC is required" : undefined,
        jobrole: !jobrole ? "Job role is required" : undefined,
        leaveType: !leaveType ? "Leave type is required" : undefined,
        leaveFrom: !leaveFrom ? "Leave start date is required" : undefined,
        leaveTo: !leaveTo ? "Leave end date is required" : undefined,
        leaveStatus: !leaveStatus ? "Leave status is required" : undefined,
      });
      return;
    }

    // If no validation errors, proceed to send data
    const newEmployeeLeave = {
      name,
      nic,
      jobrole,
      leaveType,
      leaveFrom,
      leaveTo,
      leaveStatus
    };

    axios.post("http://localhost:8070/EmployeeLeave/add", newEmployeeLeave)
      .then(() => {
        alert("New employee leave added");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400 && err.response.data.error) {
          // Show error message from the server
          alert(err.response.data.error);
        } else {
          // Show generic error message
          alert("An error occurred while adding employee leave");
        }
      });
  };

  // Function to check if there are errors
  const hasErrors = Object.values(errors).some(error => error);

  return (
    <div className="emp-att-background-container">
      <div className="emp-att-container mt-2" style={{ maxWidth: "calc(100% - 235px)", paddingLeft: "30px", paddingTop: "10px", paddingBottom: "7px", paddingRight: "30px" }} >
        <h2>Add New Employee Leave</h2>
        <form className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className={`form-label ${errors.name && 'text-danger'}`}>Employee Full Name</label>
              <input type="text" className={`emp-att-form-control ${errors.name && 'is-invalid'}`} id="name" placeholder="Enter Employee name" value={name} onChange={(e) => { setName(e.target.value); updateErrors('name', e.target.value); }} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="nic" className={`form-label ${errors.nic && 'text-danger'}`}>Employee NIC</label>
              <input type="text" className={`emp-att-form-control ${errors.nic && 'is-invalid'}`} id="nic" placeholder="Enter Employee NIC" value={nic} onChange={(e) => { setNIC(e.target.value); updateErrors('nic', e.target.value); }} />
              {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="jobrole" className={`form-label ${errors.jobrole && 'text-danger'}`}>Employee Job Role</label>
              <input type="text" className={`emp-att-form-control ${errors.jobrole && 'is-invalid'}`} id="jobrole" placeholder="Enter Employee Job role" value={jobrole} onChange={(e) => { setJobRole(e.target.value); updateErrors('jobrole', e.target.value); }} />
              {errors.jobrole && <div className="invalid-feedback">{errors.jobrole}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="leaveType" className={`form-label ${errors.leaveType && 'text-danger'}`}>Leave Type</label>
              <select className={`emp-att-form-select ${errors.leaveType && 'is-invalid'}`} id="leaveType" value={leaveType} onChange={(e) => { setLeaveType(e.target.value); updateErrors('leaveType', e.target.value); }}>
                <option value="">Select leave type</option>
                <option value="Casual">Casual</option>
                <option value="Annual">Annual</option>
                <option value="Medical">Medical</option>
                <option value="Emergency">Emergency</option>
              </select>
              {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="leaveFrom" className={`form-label ${errors.leaveFrom && 'text-danger'}`}>Leave Date From</label>
              <input type="date" className={`emp-att-form-control ${errors.leaveFrom && 'is-invalid'}`} id="leaveFrom" value={leaveFrom} onChange={(e) => { setLeaveFrom(e.target.value); updateErrors('leaveFrom', e.target.value); }} />
              {errors.leaveFrom && <div className="invalid-feedback">{errors.leaveFrom}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="leaveTo" className={`form-label ${errors.leaveTo && 'text-danger'}`}>Leave Date To</label>
              <input type="date" className={`emp-att-form-control ${errors.leaveTo && 'is-invalid'}`} id="leaveTo" value={leaveTo} onChange={(e) => { setLeaveTo(e.target.value); updateErrors('leaveTo', e.target.value); }} onBlur={validateLeaveDates} />
              {errors.leaveTo && <div className="invalid-feedback">{errors.leaveTo}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="leaveStatus" className={`form-label ${errors.leaveStatus && 'text-danger'}`}>Leave Status</label>
              <select className={`emp-att-form-select ${errors.leaveStatus && 'is-invalid'}`} id="leaveStatus" value={leaveStatus} onChange={(e) => { setLeaveStatus(e.target.value); updateErrors('leaveStatus', e.target.value); }}>
                <option value="">Select leave status</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
              </select>
              {errors.leaveStatus && <div className="invalid-feedback">{errors.leaveStatus}</div>}
            </div>
          </div>

          <div className="col-12 text-center" >
            <button type="submit" className="emp-att-btn-primary" onClick={sendData} disabled={hasErrors}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
