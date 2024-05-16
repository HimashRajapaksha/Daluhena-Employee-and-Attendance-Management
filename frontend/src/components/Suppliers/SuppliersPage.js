import React from "react";
import { Link } from "react-router-dom";
import supplierIcon from '../../images/Icons/supplier.png';
import addIcon from '../../images/Icons/add.png';
import viewIcon from '../../images/Icons/view.png';
import contactIcon from '../../images/Icons/contact.png';

export default function SuppliersPage() {
  return (
    <div className="fertilizer-transparent-box" style={{ marginLeft: "340px", marginRight: "auto", marginTop: "80px", marginBottom: "20px", padding: "60px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1000px" }}>
      <div style={{ backgroundColor: "#1E421D", padding: "20px", borderRadius: "15px", marginBottom: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={supplierIcon} alt="Supplier Icon" style={{ marginRight: "30px", width: "40px", height: "40px", filter: "invert(1)" }} />
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0" }}>Supplier Management</h1>
      </div>
      <div className="fertilizer-tiles-container" style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/supplier/add" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={addIcon} alt="Add Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Add New Supplier Details</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to add new supplier details.</p>
          </div>
        </Link>
        <Link to="/supplier/" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={viewIcon} alt="View Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>View Current Suppliers</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to view current suppliers.</p>
          </div>
        </Link>
        <Link to="/supplier/contact" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={contactIcon} alt="Contact Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Contact Supplier</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to contact suppliers.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
