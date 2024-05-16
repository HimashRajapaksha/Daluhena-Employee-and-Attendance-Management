import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import backgroundImage from '../images/DashboardBackground.png'; 
import backgroundImage from '../images/daluhenabg.png'; 
import employeeIcon from '../icons/employee.png';
import AttendanceIcon from '../icons/attendance.png';
import LeaveIcon from '../icons/leave.png';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  // State variables for employee count, attendance counts, and job role counts
  const [employeeCount, setEmployeeCount] = useState(0);
  const [attendanceCounts, setAttendanceCounts] = useState(null);
  const [jobRoleCounts, setJobRoleCounts] = useState([]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    // Fetch total employee count
    axios.get('http://localhost:8070/employee/count')
      .then(response => {
        setEmployeeCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching employee count:', error);
      });

    // Fetch attendance count for the current date
    axios.get('http://localhost:8070/EmployeeAttendance/attendance-count')
      .then(response => {
        setAttendanceCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance count:', error);
      });

    // Fetch count of employees by job role
    axios.get('http://localhost:8070/employee/jobrole-count')
      .then(response => {
        setJobRoleCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching job role counts:', error);
      });
  }, []);

  // Prepare data for pie chart
  const pieChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: attendanceCounts ? [attendanceCounts.presentCount, attendanceCounts.absentCount] : [0, 0],
        backgroundColor: [
          //'rgba(75, 192, 192, 0.9)',
          //'rgba(255, 99, 132, 0.9)',
          'rgba(22, 160, 133)',
          'rgba(203, 75, 53)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for bar chart
  const barChartData = {
    labels: jobRoleCounts.map(item => item._id),
    datasets: [
      {
        label: 'Employee Count by Job Role',
        data: jobRoleCounts.map(item => item.count),
        backgroundColor: [ // Specify an array of colors for each bar
          'rgba(54, 162, 235)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="emp-att-dashboard-container-view" style={{  
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0',
      padding: '0'
    }}>
      <div className="main-content" style={{ marginLeft: '250px', marginRight: '30px', paddingTop: '15px' }}>
        <div className="emp-att-tiles-container" >
          {/* Total Employee Count Section */}
          <div className="emp-att-total-count">
            <span>Total Employee Count: {employeeCount}</span>
          </div>

          {/* Tiles Section */}
          <div className="emp-att-tiles">
            <a href="/all-employees" className="emp-att-tile">
              <div className="emp-att-btn-tile" >
                <img src={employeeIcon} alt="Employee Icon" style={{ width: '50px', height: '50px' }} />
                <span style={{ display: 'block', textAlign: 'center' }}>Employee Details</span>
              </div>
            </a>
            <a href="/all-attendance-details" className="emp-att-tile">
              <div className="emp-att-btn-tile" >
                <img src={AttendanceIcon} alt="Attendance Icon" style={{ width: '55px', height: '55px' }} />
                <span style={{ display: 'block', textAlign: 'center' }}>Employee Attendance Details</span>
              </div>
            </a>
            <a href="/all-leave-details" className="emp-att-tile">
              <div className="emp-att-btn-tile" >
                <img src={LeaveIcon} alt="Leave Icon" style={{ width: '50px', height: '50px' }} />
                <span style={{ display: 'block', textAlign: 'center' }}>Employee Leave Status</span>
              </div>
            </a>
          </div>
        </div>

        {/* Attendance and Job Role Charts Section */}
        <div className="emp-att-charts-section" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {/* Attendance Count Section */}
          <div className="emp-att-attendance-count" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '330px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '10px', marginTop: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
              {attendanceCounts && (attendanceCounts.presentCount || attendanceCounts.absentCount) ? (
                <>
                  <span style={{ fontWeight:'bold' }}>Today's Attendance Count: Present - {attendanceCounts.presentCount}, Absent - {attendanceCounts.absentCount}</span>
                  <Pie 
                    data={pieChartData} 
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      plugins: { legend: { display: true } },
                      layout: {
                        padding: { top: 30, bottom: 30, left: 30, right: 30 } // Adjust the padding
                      }
                    }}
                  />
                </>
              ) : (
                <span style={{ fontWeight:'bold' }}>Today's Attendance is not yet marked</span>
              )}
            </div>
          </div>

          {/* Job Role Count Section */}
          <div className="emp-att-jobrole-count" style={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center',fontWeight:'bold'}}>
            <div style={{ width: '500px', height: '330px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span>Employee count with Job Role</span>
              <Bar 
                data={barChartData} 
                options={{
                  maintainAspectRatio: false, 
                  responsive: true, 
                  plugins: { legend: { display: false} }, 
                  scales: { 
                    y: { 
                      beginAtZero: true,
                      type: 'linear',
                      ticks: {
                        stepSize: 1
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Count of Employees'
                      }
                    },
                    x: {
                      scaleLabel: {
                        display: true,
                        labelString: 'Job Roles'
                      }
                    }
                  }, 
                  layout: { padding: { top: 30, bottom: 30 } }, 
                  height: 200 
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
