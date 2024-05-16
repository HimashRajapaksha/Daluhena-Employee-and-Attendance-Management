import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddEmployeeAttendance() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [attendanceExists, setAttendanceExists] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    checkAttendanceExists();
  }, [date]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8070/employee/");
      setEmployees(response.data);
      setLoading(false);
      setAttendanceData(
        response.data.map((employee) => ({
          employeeId: employee._id,
          name: employee.name,
          nic: employee.nic,
          jobrole: employee.jobrole,
          attendance: "",
          dayType: "",
          error: "",
        }))
      );
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleAttendanceChange = (index, value) => {
    setAttendanceData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].attendance = value;
      updatedData[index].error = "";
      return updatedData;
    });
  };

  const handleDayTypeChange = (index, dayType) => {
    setAttendanceData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].dayType = dayType;
      updatedData[index].error = "";
      return updatedData;
    });
  };

  const validateData = () => {
    const attendanceErrors = [];
    const dayTypeErrors = [];

    attendanceData.forEach((employee, index) => {
      if (!employee.attendance) {
        attendanceErrors.push(`Please select attendance for Employee ${index + 1}`);
      }
      if (!employee.dayType) {
        dayTypeErrors.push(`Please select day type for Employee ${index + 1}`);
      }
    });

    setErrors([...attendanceErrors, ...dayTypeErrors]);
    return attendanceErrors.length === 0 && dayTypeErrors.length === 0;
  };

  const checkAttendanceExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/EmployeeAttendance/report?date=${date}`);
      setAttendanceExists(response.data.length > 0);
    } catch (error) {
      console.error("Error checking attendance:", error);
    }
  };

  const saveAttendance = async () => {
    try {
      if (!validateData()) {
        return;
      }

      if (attendanceExists) {
        alert("Attendance has already been marked for the employees on the selected date.");
        return;
      }

      const employeesWithAttendance = attendanceData.map((employee) => ({
        _id: employee.employeeId,
        name: employee.name,
        nic: employee.nic,
        jobrole: employee.jobrole,
        date,
        attendance: employee.attendance,
        dayType: employee.dayType,
      }));

      await axios.post("http://localhost:8070/EmployeeAttendance/add", employeesWithAttendance);
      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance. Please try again later.");
    }
  };

  return (
    <div className="emp-att-background-container">
    <div
    className="emp-att-container"
    style={{
      backgroundColor: "white",
      borderRadius: "15px",
      maxWidth: "calc(100% - 255px)", // Adjust the max-width to increase the width
      width: "90%", // Adjust the width to increase the width
      marginLeft: "250px", // Adjust margin-left to match layout
      marginRight: "15px",
      marginBottom: "15px",
      marginTop: "5px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      paddingBottom: "20px",
    }}
  >
        <h2>Add Employee Attendance</h2>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="date" style={{ fontWeight: 'bold' }}>Select the date in here :
              <input type="date" className="AttendancedateSelect" value={date} onChange={(e) => handleDateChange(e.target.value)} />
            </label>
          </div>
        </div>
        <table className="table mt-3" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>NIC</th>
              <th>Job Role</th>
              <th>Attendance</th>
              <th>Day Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="5">No employees available</td>
              </tr>
            ) : (
              attendanceData.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.nic}</td>
                  <td>{employee.jobrole}</td>
                  <td>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`attendance-${index}`}
                        value="present"
                        checked={employee.attendance === "present"}
                        onChange={() => handleAttendanceChange(index, "present")}
                      />
                      <label className="form-check-label">Present</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`attendance-${index}`}
                        value="absent"
                        checked={employee.attendance === "absent"}
                        onChange={() => handleAttendanceChange(index, "absent")}
                      />
                      <label className="form-check-label">Absent</label>
                    </div>
                    <p className="text-danger">{errors[index]}</p>
                  </td>
                  <td>
                    <select
                      className="emp-att-form-selectAttendance"
                      value={employee.dayType}
                      onChange={(e) => handleDayTypeChange(index, e.target.value)}
                    >
                      <option value="">Select Day Type</option>
                      <option value="workday">Workday</option>
                      <option value="holiday">Holiday</option>
                    </select>
                    <p className="text-danger">{errors[index + attendanceData.length]}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="col-12 text-center">
          <button type="button" className="emp-att-btn-primary" onClick={saveAttendance}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
