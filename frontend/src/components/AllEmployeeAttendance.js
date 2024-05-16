import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import UpdateAttendance from './UpdateAttendance'; // Import UpdateAttendance component
import SearchIcon from '../icons/search2.png'; 

function AllEmployeeAttendance() {
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState(''); // State for date filter
    const [error, setError] = useState(null);
    const [editingAttendance, setEditingAttendance] = useState(null); // State to hold editing attendance

    const editFormRef = useRef(null); // Ref for the edit form

    useEffect(() => {
        fetchData();
    }, [filterDate]); // Fetch data whenever the filterDate state changes

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/EmployeeAttendance");
            console.log('Fetched attendance data:', response.data);
            // Format the date string to match the expected format "yyyy-MM-dd"
            const formattedAttendanceDetails = response.data.map(attendance => ({
                ...attendance,
                date: new Date(attendance.date).toISOString().split('T')[0] // Extract the date part
            }));
            setAttendanceDetails(formattedAttendanceDetails);
        } catch (error) {
            console.error('Error fetching attendance details:', error);
            setError("Error fetching attendance details");
        }
    };
    

    const filteredAttendance = attendanceDetails.filter(attendance =>
        (filterDate === '' || attendance.date === filterDate) &&
        (attendance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.nic.toString().includes(searchQuery.toLowerCase()) ||
        attendance.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.dayType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.attendance.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDateFilterChange = event => {
        setFilterDate(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this attendance record?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/EmployeeAttendance/delete/${id}`);
                if (response.status === 200) {
                    setAttendanceDetails(prevAttendance => prevAttendance.filter(attendance => attendance._id !== id));
                    alert('Attendance record deleted successfully');
                } else {
                    console.error("Error deleting attendance record:", response.statusText);
                    setError("Error deleting attendance record");
                }
            } catch (error) {
                console.error("Error deleting attendance record:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting attendance record");
            }
        }
    };

    const handleEdit = (id) => {
        // Find the attendance to edit from the filtered attendance list
        const attendanceToEdit = filteredAttendance.find(attendance => attendance._id === id);
        setEditingAttendance(attendanceToEdit); // Set editing attendance state
    
        // Scroll to the edit form if the ref is available
        editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    

    const handleUpdate = async (id, updatedAttendance) => {
        try {
            const response = await axios.put(`http://localhost:8070/EmployeeAttendance/update/${id}`, updatedAttendance);
            if (response.status === 200) {
                // Update the attendance details in the state
                setAttendanceDetails(prevAttendance => {
                    return prevAttendance.map(attendance => {
                        if (attendance._id === id) {
                            return { ...attendance, ...updatedAttendance };
                        }
                        return attendance;
                    });
                });
                setEditingAttendance(null); // Clear editing attendance state
                alert('Attendance record updated successfully');
            } else {
                console.error("Error updating attendance record:", response.statusText);
                setError("Error updating attendance record");
            }
        } catch (error) {
            console.error("Error updating attendance record:", error.message);
            if (error.response) {
                console.error("Server response:", error.response.data);
            }
            setError("Error updating attendance record");
        }
    };

    return (
        <div className="emp-att-background-container">
    <div className="emp-att-container mt-3" style={{ maxWidth: "calc(100% - 255px)", paddingLeft: "20px", paddingBottom: "20px", paddingTop: "10px" }}>
        <h1>All Attendance Details</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="d-flex justify-content-between align-items-center mb-3" style={{ width: "1000px", textAlign: 'center' }}>
            <div className="input-group mb-4" style={{ width: "300px" }}>
            <span className="input-group-text">
                                <img src={SearchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
                            </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search attendance details"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px',fontWeight: 'bold' }}>Filter By Date:</span>
                <div className="input-group" style={{ width: "300px" }}>
                    <input
                        type="date"
                        className="form-control"
                        value={filterDate}
                        onChange={handleDateFilterChange}
                    />
                </div>
            </div>
            <div className="mb-4" style={{ marginLeft: '20px' }}>
                <Link to="/attendance-report" className="emp-att-btn-primary" style={{  width: '200px', display: 'flex', alignItems: 'center', fontWeight:'bold',textDecoration: 'none',marginRight:'30px' }}>Attendance Report</Link>
            </div>
        </div>
        <table className="table mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Job Role</th>
                    <th>Day Type</th>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {filteredAttendance.map(record => (
                    <tr key={record._id}>
                        <td>{record.name}</td>
                        <td>{record.nic}</td>
                        <td>{record.jobrole}</td>
                        <td>{record.dayType}</td>
                        <td>{record.date}</td>
                        <td>{record.attendance}</td>
                        <td>
                            <button type="button" className="btn btn-success me-2" onClick={() => handleEdit(record._id)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {editingAttendance && (
            <div ref={editFormRef}>
                <UpdateAttendance
                    attendance={editingAttendance}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingAttendance(null)}
                />
            </div>
        )}
    </div>
</div>

    );
}

export default AllEmployeeAttendance;
