import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoicon from '../images/Logo.png';
import DashboardIcon from '../icons/dashboard1.png';
import HomeIcon from '../icons/home1.png';
import AddNewIcon from '../icons/add.png';

function EmpHeader() {
    const location = useLocation();

    // Check if the user is authenticated (logged in)
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Check if the current page is the home page or a login page
    const isHomePage = location.pathname === "/";
    const isLoginPage = location.pathname === "/login" || location.pathname === "/emplogin";
    const isDashboardPage = location.pathname === "/dashboard" || location.pathname === "/purchase/add" || location.pathname === "/fertilizer/add" || location.pathname === "/supplier/add" || location.pathname === "/purchase/" || location.pathname === "/supplier/" ||
     location.pathname === "/fertilizer/" || location.pathname === "/report-generation" || location.pathname === "/purchases" ||
      location.pathname === "/suppliers" || location.pathname === "/fertilizers" || location.pathname === "/fertilizer/schedule" ||
       location.pathname === "/supplier/contact";

    // Determine whether to display the navigation panel
    const showNavPanel = isAuthenticated && !isHomePage && !isLoginPage && !isDashboardPage;

    // Logout function
    const handleLogout = () => {
        // Clear token from localStorage or perform any other logout logic
        localStorage.removeItem('token');
        // Redirect to the login page
        window.location.href = '/';
    };

    return (
        <div>
            {showNavPanel && (
                <nav className="emp-att-side-nav" style={{ overflowY: 'hidden', maxHeight: 'calc(100vh - 20px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <img src={logoicon} alt="logoIcon" style={{ width: '80px', height: '80px' }} /> 
                    </div>
                    <div className="emp-att-brand" style={{ color: "#1E421D", fontWeight: "bold", textAlign: "center", fontSize: "18px", marginBottom: "10px" }}>
                        Employee & Attendance Management
                    </div>
                    <div className="emp-att-navbar">
                        <ul className="navbar-nav">
                            <li className="emp-att-nav-item">
                                <NavLink  exact className="emp-att-nav-link" activeClassName="emp-att-active" to="/">
                                    <img src={HomeIcon} alt="Home" className="emp-att-nav-icon home-icon" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="emp-att-nav-item">
                                <NavLink className="emp-att-nav-link" activeClassName="emp-att-active" to="/empdashboard">
                                    <img src={DashboardIcon} alt="Dashboard" className="emp-att-nav-icon" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="emp-att-nav-item">
                                <NavLink className="emp-att-nav-link" activeClassName="emp-att-active" to="/employee/add">
                                    <img src={AddNewIcon} alt="add" className="emp-att-nav-icon add-icon" />
                                    Employee
                                </NavLink>
                            </li>
                            <li className="emp-att-nav-item">
                                <NavLink className="emp-att-nav-link" activeClassName="emp-att-active" to="/EmployeeLeave/add">
                                    <img src={AddNewIcon} alt="add" className="emp-att-nav-icon add-icon" />
                                    New Leave
                                </NavLink>
                            </li>
                            <li className="emp-att-nav-item">
                                <NavLink className="emp-att-nav-link" activeClassName="emp-att-active" to="/EmployeeAttendance/add">
                                    <img src={AddNewIcon} alt="add" className="emp-att-nav-icon add-icon" />
                                    Attendance
                                </NavLink>
                            </li>
                           
                        </ul>
                    </div>
                    <div className="emp-att-logout-btn" style={{ marginLeft: '68px',marginRight: "68px" , textAlign: "center" }}>
                        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>Logout</button>
                    </div>
                </nav>
            )}
        </div>
    );
}

export default EmpHeader;