import React, { useState, useEffect } from 'react';
import axios from "axios";
import SearchIcon from '../icons/search2.png'; 

function ViewMoreEmployee() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8070/employee/`)
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching employee details");
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (employees.length === 0) {
        return <div>Loading...</div>;
    }

    // Filter employees based on search query
    const filteredEmployees = employees.filter(employee => {
        return (
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.age.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.qualifications.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="emp-att-background-container">
            <div className="emp-att-container mt-3" style={{ maxWidth: "calc(100% - 205px)", paddingLeft: "20px" ,paddingBottom: "20px",paddingTop: "10px",paddingRight:"30px" }}>
                <h1>All Employees</h1>
                <div className="mb-3 input-group">
                    <span className="input-group-text">
                        <img src={SearchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employees"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NIC</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Job Role</th>
                                <th>Qualifications</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee._id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.nic}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.contactNumber}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.jobrole}</td>
                                    <td>{employee.qualifications}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewMoreEmployee;
