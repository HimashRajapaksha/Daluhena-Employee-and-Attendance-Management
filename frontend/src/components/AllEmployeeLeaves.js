import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import SearchIcon from '../icons/search2.png'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function AllEmployeeLeaves() {
    const [leaveDetails, setLeaveDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [editLeave, setEditLeave] = useState(null);
    const [errors, setErrors] = useState({});
    const updateFormRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:8070/EmployeeLeave")
            .then((res) => {
                setLeaveDetails(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching leave details");
            });
    }, []);

    const filteredLeaves = leaveDetails.filter(leave =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.nic.toString().includes(searchQuery.toLowerCase()) ||
        leave.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this leave record?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/EmployeeLeave/delete/${id}`);
                if (response.status === 200) {
                    setLeaveDetails(prevLeaves => prevLeaves.filter(leave => leave._id !== id));
                    alert('Leave record deleted successfully');
                } else {
                    console.error("Error deleting leave record:", response.statusText);
                    setError("Error deleting leave record");
                }
            } catch (error) {
                console.error("Error deleting leave record:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting leave record");
            }
        }
    };

    const handleEdit = (id) => {
        const leaveToEdit = leaveDetails.find(leave => leave._id === id);
        setEditLeave(leaveToEdit);

        // Scroll down to the update form
        if (updateFormRef.current) {
            updateFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleEditInputChange = event => {
        const { name, value } = event.target;
        setEditLeave(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async () => {
        const validationErrors = {};
        // Perform validation checks
        if (!editLeave.name) {
            validationErrors.name = "Name is required";
        }
        if (!editLeave.nic) {
            validationErrors.nic = "NIC is required";
        }
        if (!editLeave.jobrole) {
            validationErrors.jobrole = "Job role is required";
        }
        if (!editLeave.leaveType) {
            validationErrors.leaveType = "Leave type is required";
        }
        if (!editLeave.leaveFrom) {
            validationErrors.leaveFrom = "Leave start date is required";
        }
        if (!editLeave.leaveTo) {
            validationErrors.leaveTo = "Leave end date is required";
        }
        if (!editLeave.leaveStatus) {
            validationErrors.leaveStatus = "Leave status is required";
        }

        // Additional validation for leave end date after start date
        if (new Date(editLeave.leaveFrom) >= new Date(editLeave.leaveTo)) {
            validationErrors.leaveTo = "Leave end date should be after start date";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8070/EmployeeLeave/update/${editLeave._id}`, editLeave);
            if (response.status === 200) {
                setLeaveDetails(prevLeaves => prevLeaves.map(leave => (leave._id === editLeave._id ? editLeave : leave)));
                alert('Leave record updated successfully');
                setEditLeave(null);
            } else {
                console.error("Error updating leave record:", response.statusText);
                setError("Error updating leave record");
            }
        } catch (error) {
            console.error("Error updating leave record:", error.message);
            if (error.response) {
                console.error("Server response:", error.response.data);
            }
            setError("Error updating leave record");
        }
    };

    const handleCancelEdit = () => {
        setEditLeave(null);
    };

    return (
       <div className="emp-att-background-container">
      <div className="emp-att-container mt-3" style={{ maxWidth: "calc(100% - 255px)", paddingLeft: "20px", paddingBottom: "20px", paddingTop: "10px",paddingRight:"30px" }}>
    <h1>All Leave Details</h1>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    <div className="row mb-3" >
        <div className="col-md-6">
            <div className="input-group" style={{ width: "100%" }}>
                <span className="input-group-text">
                    <img src={SearchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search leave details"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
        </div>
        <div className="col-md-6" > 
            <Link to="/leave-report" className="emp-att-btn-primary" style={{  width: '210px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Generate Leave report</Link>
        </div>
   
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Job Role</th>
                            <th>Leave Type</th>
                            <th>Leave From</th>
                            <th>Leave To</th>
                            <th>Leave Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.map(record => (
                            <tr key={record._id}>
                                <td>{record.name}</td>
                                <td>{record.nic}</td>
                                <td>{record.jobrole}</td>
                                <td>{record.leaveType}</td>
                                <td>{new Date(record.leaveFrom).toLocaleDateString('en-US')}</td>
                                <td>{new Date(record.leaveTo).toLocaleDateString('en-US')}</td>
                                <td>{record.leaveStatus}</td>
                                <td>
                                    <button type="button" className="btn btn-success me-2" onClick={() => handleEdit(record._id)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(record._id)}> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editLeave && (
                    <div className="emp-att-container mt-2" ref={updateFormRef}  style={{ maxWidth: "calc(80% - 255px)", paddingLeft: "20px" ,paddingBottom: "20px",paddingTop: "10px" }}>
                        <h2 style={{ textAlign: "center" }}>Update Leave Details</h2>

                        <form>
                            <div className="mb-3">
                                <label className={`form-label ${errors.name && "text-danger"}`}>Name</label>
                                <input type="text" className={`form-control ${errors.name && "is-invalid"}`} name="name" value={editLeave.name} onChange={handleEditInputChange} />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.nic && "text-danger"}`}>NIC</label>
                                <input type="text" className={`form-control ${errors.nic && "is-invalid"}`} name="nic" value={editLeave.nic} onChange={handleEditInputChange} />
                                {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.jobrole && "text-danger"}`}>Job Role</label>
                                <input type="text" className={`form-control ${errors.jobrole && "is-invalid"}`} name="jobrole" value={editLeave.jobrole} onChange={handleEditInputChange} />
                                {errors.jobrole && <div className="invalid-feedback">{errors.jobrole}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.leaveType && "text-danger"}`}>Leave Type</label>
                                <input type="text" className={`form-control ${errors.leaveType && "is-invalid"}`} name="leaveType" value={editLeave.leaveType} onChange={handleEditInputChange} />
                                {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.leaveFrom && "text-danger"}`}>Leave From</label>
                                <input type="date" className={`form-control ${errors.leaveFrom && "is-invalid"}`} name="leaveFrom" value={editLeave.leaveFrom} onChange={handleEditInputChange} />
                                {errors.leaveFrom && <div className="invalid-feedback">{errors.leaveFrom}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.leaveTo && "text-danger"}`}>Leave To</label>
                                <input type="date" className={`form-control ${errors.leaveTo && "is-invalid"}`} name="leaveTo" value={editLeave.leaveTo} onChange={handleEditInputChange} />
                                {errors.leaveTo && <div className="invalid-feedback">{errors.leaveTo}</div>}
                            </div>
                            <div className="mb-3">
                                <label className={`form-label ${errors.leaveStatus && "text-danger"}`}>Leave Status</label>
                                <input type="text" className={`form-control ${errors.leaveStatus && "is-invalid"}`} name="leaveStatus" value={editLeave.leaveStatus} onChange={handleEditInputChange} />
                                {errors.leaveStatus && <div className="invalid-feedback">{errors.leaveStatus}</div>}
                            </div>
                            <button type="button" className="emp-att-btn-primary" onClick={handleEditSubmit} style={{marginRight: '20px' }}>Update</button>
                            <button type="button" className="emp-att-btn-secondary" onClick={handleCancelEdit}  >Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default AllEmployeeLeaves;
