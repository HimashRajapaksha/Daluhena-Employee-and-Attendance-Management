import React from "react";
import { Link } from "react-router-dom";
import fertilizerIcon from '../../images/Icons/fertilizer.png';
import addIcon from '../../images/Icons/add.png';
import viewIcon from '../../images/Icons/view.png';
import scheduleIcon from '../../images/Icons/schedule.png';

export default function FertilizersPage() {
  return (
    <div className="fertilizer-transparent-box" style={{ marginLeft: "340px", marginRight: "auto", marginTop: "80px", marginBottom: "20px", padding: "60px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1000px" }}>
      <div style={{ backgroundColor: "#1E421D", padding: "20px", borderRadius: "15px", marginBottom: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={fertilizerIcon} alt="Fertilizer Icon" style={{ marginRight: "30px", width: "40px", height: "40px", filter: "invert(1)" }} />
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0" }}>Fertilizer Management</h1>
      </div>
      <div className="fertilizer-tiles-container" style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/fertilizer/add" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={addIcon} alt="Add Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Add New Fertilizer</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to add new fertilizer details.</p>
          </div>
        </Link>
        <Link to="/fertilizer/" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={viewIcon} alt="View Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>View Fertilizer Stocks</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to view fertilizer stocks.</p>
          </div>
        </Link>
        <Link to="/fertilizer/schedule" style={{ textDecoration: "none", width: "30%" }}>
          <div className="fertilizer-tile" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={scheduleIcon} alt="Schedule Icon" style={{ marginBottom: "10px", width: "40px", height: "40px" }} />
            <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>Schedule Task</h2>
            <p style={{ color: "#666", fontSize: "16px" }}>Click here to schedule a task.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
