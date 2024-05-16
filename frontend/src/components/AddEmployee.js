import React, { useState } from "react";
import axios from "axios";



export default function AddEmployee() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [errors, setErrors] = useState({});

  function sendData(e) {
    e.preventDefault();

    const errors = {};
    // Perform validation checks
    if (!name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = "Name should only contain letters";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!nic) {
      errors.nic = "NIC is required";
    } else if (nic.length < 10 || nic.length > 12) {
      errors.nic = "NIC must be between 10 and 12 characters";
    }
   
    if (!contactNumber) {
      errors.contactNumber = "Contact number is required";
    } else if (contactNumber.length < 10 || contactNumber.length > 15) {
      errors.contactNumber = "Contact number must be between 10 and 15 digits";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!age) {
      errors.age = "Age is required";
    } else if (isNaN(age) || age < 18 || age > 100) {
      errors.age = "Age must be a number between 18 and 100";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!jobrole) {
      errors.jobrole = "Job role is required";
    }
    if (!qualifications) {
      errors.qualifications = "Qualifications are required";
    }

    setErrors(errors); // Update errors state

    if (Object.keys(errors).length > 0) {
      return; // Do not proceed if there are validation errors
    }

    // If no validation errors, proceed to send data
    const newEmployee = {
      name,
      nic,
      email,
      contactNumber,
      gender,
      age,
      address,
      jobrole,
      qualifications
    };

    axios.post("http://localhost:8070/employee/add", newEmployee)
      .then(() => {
        alert("New employee added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="emp-att-background-container">
    <div className="emp-att-container mt-2" style={{ maxWidth: "calc(100% - 235px)", paddingLeft: "30px",paddingBottom: "10px",paddingTop: "30px",paddingRight: "30px"}}>
      <h2>Add New Employee</h2>
      <form onSubmit={sendData}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Employee Full Name :</label>
              <input type="text" className={`emp-att-form-control ${errors.name && 'is-invalid'}`} id="name" placeholder="Enter Employee Name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="nic" className="form-label">Employee NIC :</label>
              <input type="text" className={`emp-att-form-control ${errors.nic && 'is-invalid'}`} id="nic" placeholder="Enter Employee NIC" value={nic} onChange={(e) => setNIC(e.target.value)} />
              {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Employee Email  :  (*not required)</label>
              <input type="email" className={`emp-att-form-control ${errors.email && 'is-invalid'}`} id="email" placeholder="Enter Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender :</label>
              <select className={`emp-att-form-select ${errors.gender && 'is-invalid'}`} id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age :</label>
              <input type="text" className={`emp-att-form-control ${errors.age && 'is-invalid'}`} id="age" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
              {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number :</label>
              <input type="text" className={`emp-att-form-control ${errors.contactNumber && 'is-invalid'}`} id="contactNumber" placeholder="Enter Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
              {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address :</label>
              <input type="text" className={`emp-att-form-control ${errors.address && 'is-invalid'}`} id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="jobrole" className="form-label">Job Role :</label>
              <input type="text" className={`emp-att-form-control ${errors.jobrole && 'is-invalid'}`} id="jobrole" placeholder="Enter Job Role" value={jobrole} onChange={(e) => setJobRole(e.target.value)} />
              {errors.jobrole && <div className="invalid-feedback">{errors.jobrole}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="qualifications" className="form-label">Qualifications :</label>
              <input type="text" className={`emp-att-form-control ${errors.qualifications && 'is-invalid'}`} id="qualifications" placeholder="Enter Qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
              {errors.qualifications && <div className="invalid-feedback">{errors.qualifications}</div>}
            </div>
          </div>
        </div >
        <div className="col-12 text-center" >
          <button type="submit" className="emp-att-btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}
