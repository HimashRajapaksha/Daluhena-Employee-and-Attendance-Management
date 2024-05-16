import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";
import editIcon from '../icons/edit.png';
import deleteIcon from '../icons/delete.png';
import ViewMoreIcon from '../icons/chevron2.png';
import SearchIcon from '../icons/search2.png'; 

//import ViewMoreEmployee from './ViewMoreEmployee';

function AllEmployeesDisplay() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8070/employee/")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching employees");
            });
    }, []);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.contactNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/employee/delete/${id}`);
                if (response.status === 200) {
                    setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
                    alert('Employee deleted successfully');
                } else {
                    console.error("Error deleting employee:", response.statusText);
                    setError("Error deleting employee");
                }
            } catch (error) {
                console.error("Error deleting employee:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting employee");
            }
        }
    };

    const handleUpdate = (id) => {
        setSelectedEmployeeId(id);
        setShowUpdateForm(true);

        const updateFormElement = document.getElementById("updateForm");
        if (updateFormElement) {
            updateFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

   
    
    
    return (
        <div className="emp-att-background-container">
            <div className="emp-att-container mt-3" style={{ maxWidth: "calc(100% - 255px)", paddingLeft: "20px", paddingBottom: "10px", paddingTop: "10px" }}>
                <h1>All Employees</h1>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="d-flex justify-content-between align-items-center mb-3" style={{ width: "1000px", textAlign: 'center' }}>
                    <div style={{ marginRight: '50px', flex: '1' }}>
                        <div className="input-group">
                            <span className="input-group-text">
                                <img src={SearchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Any Employee In Here"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </div>
                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                        <Link to="/view-more-employee" className="emp-att-btn-primary" style={{ width: '200px', display: 'flex', alignItems: 'center',textDecoration: 'none'  }}>
                           
                            <span style={{ flex: '1' }}>View More</span>  <img src={ViewMoreIcon} alt="view" style={{ width: '40px', height: '40px', marginRight: '1px' }} />
                        </Link>
                       
                    </div>
                </div>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Email</th>
                            <th>Job Role</th>
                            <th>Contact Number</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.nic}>
                                <td>{employee.name}</td>
                                <td>{employee.nic}</td>
                                <td>{employee.email}</td>
                                <td>{employee.jobrole}</td>
                                <td>{employee.contactNumber}</td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => handleUpdate(employee._id)}>
                                        <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px' }} />
                                        Update
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(employee._id)}>
                                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showUpdateForm && <UpdateEmployeeDetails id={selectedEmployeeId} onCancel={() => setShowUpdateForm(false)} />}
            </div>
        </div>
    );
}

export default AllEmployeesDisplay;
