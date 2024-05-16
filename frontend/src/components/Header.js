import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/Logo.png'; 
import homeIcon from '../images/Icons/home.png';
import fertilizerIcon from '../images/Icons/fertilizer.png';
import supplierIcon from '../images/Icons/supplier.png';
import purchaseIcon from '../images/Icons/purchase.png';
import dashboardIcon from '../images/Icons/dashboard.png';

function Header() {
    const location = useLocation();

    // Check if the user is authenticated (logged in)
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Check if the current page is the home page or a login page
    const isHomePage = location.pathname === "/";
    const isLoginPage = location.pathname === "/login" || location.pathname === "/emplogin";
    const isDashboardPage = location.pathname === "/empdashboard" || location.pathname === "/employee/add" || 
    location.pathname === "/EmployeeLeave/add" || location.pathname === "/EmployeeAttendance/add" || location.pathname === "/update/:id" || 
    location.pathname === "/all-employees" || location.pathname === "/all-attendance-details" || 
    location.pathname === "/all-leave-details" ||  location.pathname === "/view-more-employee" || 
    location.pathname === "/attendance-report" || location.pathname === "/leave-report";

    // Determine whether to display the navigation panel
    const showNavPanel = isAuthenticated && !isHomePage && !isLoginPage && !isDashboardPage;

    return (
        <div>
            {showNavPanel && (
                <div className="fertilizer-side-nav">
                    <div className="fertilizer-brand" style={{ textAlign: "center", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
                        <div style={{ color: "#1E421D", fontSize: "20px" }}>Fertilizer And Supplier</div>
                        <div style={{ color: "#1E421D", fontSize: "20px" }}>Management</div>
                    </div>
                    
                    <nav className="fertilizer-navbar">
                        <ul className="fertilizer-navbar-nav" style={{ listStyleType: "none", padding: 0 }}> {/* Remove list dots */}
                            <li className="fertilizer-nav-item">
                                <Link exact className="fertilizer-nav-link" to="/">
                                    <img src={homeIcon} alt="Home" style={{ width: "20px", height: "20px", marginRight: "10px", marginLeft: "-30px" }} />
                                    Home
                                </Link>
                            </li>
                            <li className="fertilizer-nav-item">
                                <Link className="fertilizer-nav-link" to="/dashboard">
                                    <img src={dashboardIcon} alt="Dashboard" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="fertilizer-nav-item">
                                <Link className="fertilizer-nav-link" to="/fertilizers">
                                    <img src={fertilizerIcon} alt="Fertilizers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Fertilizers
                                </Link>
                            </li>
                            <li className="fertilizer-nav-item">
                                <Link className="fertilizer-nav-link" to="/suppliers">
                                    <img src={supplierIcon} alt="Suppliers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Suppliers
                                </Link>
                            </li>
                            <li className="fertilizer-nav-item">
                                <Link className="fertilizer-nav-link" to="/purchases">
                                    <img src={purchaseIcon} alt="Add Purchases" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Purchases
                                </Link>
                            </li>
                            <li className="fertilizer-nav-item"> {/* Logout Button */}
                                <button className="fertilizer-logout-btn" onClick={() => { window.location.href = "/" }}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Header;
