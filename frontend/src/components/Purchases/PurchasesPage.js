import React from "react";
import { Link } from "react-router-dom";
import purchaseIcon from '../../images/Icons/purchase.png'; 
import addIcon from '../../images/Icons/add.png';
import viewIcon from '../../images/Icons/view.png';
import reportIcon from '../../images/Icons/report.png';

export default function PurchasesPage() {
  return (
    <div className="fertilizer-transparent-box" style={{ marginLeft: "340px", marginRight: "auto", marginTop: "80px", marginBottom: "20px", padding: "60px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1000px" }}>
      <div style={{ backgroundColor: "#1E421D", padding: "20px", borderRadius: "15px", marginBottom: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={purchaseIcon} alt="Purchase Icon" style={{ marginRight: "30px", width: "40px", height: "40px", filter: "invert(1)" }} /> {/* Add the purchase icon */}
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0" }}>Purchase Tracker</h1>
      </div>
      <div className="fertilizer-tiles-container" style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/purchase/add" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={addIcon} alt="Add Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} /> {/* Add the add icon */}
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Add New Purchase Record</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to add a new purchase record.</p>
          </div>
        </Link>
        <Link to="/purchase/" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={viewIcon} alt="View Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} /> {/* Add the view icon */}
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>View Purchase Details</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to view purchase details.</p>
          </div>
        </Link>
        <Link to="/report-generation" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={reportIcon} alt="Report Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} /> {/* Add the report icon */}
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Generate Purchase History Report</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to generate a report.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
