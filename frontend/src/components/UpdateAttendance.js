import React, { useState } from 'react';

function UpdateAttendance({ attendance, onUpdate, onCancel }) {
    const [dayType, setDayType] = useState(attendance.dayType);
    const [date, setDate] = useState(attendance.date);
    const [attendanceStatus, setAttendanceStatus] = useState(attendance.attendance);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!dayType.trim()) {
            errors.dayType = "Day type is required";
        }

        if (!date) {
            errors.date = "Date is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onUpdate(attendance._id, { dayType, date, attendance: attendanceStatus });
        }
    };

    return (
        <div>
            <h2>Edit Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Employee Name</label>
                    <input type="text" className="form-control" value={attendance.name} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Day Type</label>
                    <input type="text" className="form-control" value={dayType} onChange={(e) => setDayType(e.target.value)} />
                    {errors.dayType && <div className="text-danger">{errors.dayType}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                    {errors.date && <div className="text-danger">{errors.date}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Attendance</label>
                    <select className="form-select" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                    </select>
                </div>
                <button type="submit" className="emp-att-btn-primary"  style={{ marginRight: '20px' }} >Update</button>
                <button type="button" className="emp-att-btn-secondary" onClick={onCancel}  style={{marginRight: '20px' }}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateAttendance;
