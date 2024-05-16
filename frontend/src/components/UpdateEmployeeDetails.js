import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployeeDetails = ({ id, onCancel }) => {
  const [updateData, setUpdateData] = useState({
    name: "",
    nic: "",
    email: "",
    contactNumber: "",
    gender: "",
    age: "",
    address: "",
    jobrole: "",
    qualifications: ""
  });
  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false); // New state variable

  useEffect(() => {
    axios.get(`http://localhost:8070/employee/get/${id}`)
      .then(response => {
        setUpdateData(response.data.employee);
      })
      .catch(error => {
        console.error("Error fetching employee details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(updateData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.put(`http://localhost:8070/employee/update/${id}`, updateData);
      console.log("Employee updated successfully");
      alert("Employee updated successfully");
      setUpdateSuccess(true); // Update success flag to true
      window.location.reload(); // Reload the page after successful update
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.nic) {
      errors.nic = "NIC is required";
    } else if (data.nic.length < 10 || data.nic.length > 12) {
      errors.nic = "NIC must be between 10 and 12 characters";
    }
    if (!data.contactNumber) {
      errors.contactNumber = "Contact number is required";
    } else if (data.contactNumber.length < 10 || data.contactNumber.length > 15) {
      errors.contactNumber = "Contact number must be between 10 and 15 digits";
    }
    if (!data.gender) {
      errors.gender = "Gender is required";
    }
    if (!data.age) {
      errors.age = "Age is required";
    } else if (isNaN(data.age) || data.age < 18 || data.age > 100) {
      errors.age = "Age must be a number between 18 and 100";
    }
    if (!data.address) {
      errors.address = "Address is required";
    }
    if (!data.jobrole) {
      errors.jobrole = "Job role is required";
    }
    if (!data.qualifications) {
      errors.qualifications = "Qualifications are required";
    }

    return errors;
  };

  if (updateSuccess) {
    return (
      <div className="container mt-4" style={{ maxWidth: "calc(100% - 255px)", paddingLeft: "20px" }}>
        <h1>Employee Updated Successfully!</h1>
      </div>
    );
  }
 
  return (
    <div id="updateForm" className="container mt-2"  style={{ maxWidth: "calc(80% - 255px)", paddingLeft: "20px" ,paddingBottom: "20px",paddingTop: "10px" }}>
      <h1>Update Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name && 'is-invalid'}`}
            name="name"
            value={updateData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>NIC:</label>
          <input
            type="text"
            className={`form-control ${errors.nic && 'is-invalid'}`}
            name="nic"
            value={updateData.nic}
            onChange={handleChange}
          />
          {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            className={`form-control ${errors.contactNumber && 'is-invalid'}`}
            name="contactNumber"
            value={updateData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            className={`form-control ${errors.gender && 'is-invalid'}`}
            name="gender"
            value={updateData.gender}
            onChange={handleChange}
          />
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className={`form-control ${errors.age && 'is-invalid'}`}
            name="age"
            value={updateData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className={`form-control ${errors.address && 'is-invalid'}`}
            name="address"
            value={updateData.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <div className="form-group">
          <label>Job Role:</label>
          <input
            type="text"
            className={`form-control ${errors.jobrole && 'is-invalid'}`}
            name="jobrole"
            value={updateData.jobrole}
            onChange={handleChange}
          />
          {errors.jobrole && <div className="invalid-feedback">{errors.jobrole}</div>}
        </div>
        <div className="form-group">
          <label>Qualifications:</label>
          <input
            type="text"
            className={`form-control ${errors.qualifications && 'is-invalid'}`}
            name="qualifications"
            value={updateData.qualifications}
            onChange={handleChange}
          />
          {errors.qualifications && <div className="invalid-feedback">{errors.qualifications}</div>}
        </div>
        <div className="form-group">
          <button type="submit" className="emp-att-btn-primary" style={{ marginTop:'20px',marginRight: '20px' }}>Update</button>
          <button type="button" className="emp-att-btn-secondary" style={{ marginTop:'20px'}}onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeeDetails;
