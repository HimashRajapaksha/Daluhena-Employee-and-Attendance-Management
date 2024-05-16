import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Logo from '../../images/Logo.png'; // Import your logo here
import FertilizerIcon from '../../icons/HomeIcons/fertilizer.png';
import EmployeeIcon from '../../icons/HomeIcons/employee.png';
import HarvestIcon from '../../icons/HomeIcons/harvest.png';
import MaintenanceIcon from '../../icons/HomeIcons/repair.png';
import PickupIcon from '../../icons/HomeIcons/pickup.png';
import BuyerIcon from '../../icons/HomeIcons/buyer.png';
import FinancialIcon from '../../icons/HomeIcons/finance.png';
import WeatherIcon from '../../icons/HomeIcons/weather.png';
import fbIcon from '../../icons/HomeIcons/fb.png';
import instaIcon from '../../icons/HomeIcons/insta.png';
import linkdinIcon from '../../icons/HomeIcons/linkdin.png';
import pinterestIcon from '../../icons/HomeIcons/pint.png';

export default function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <img src={Logo} alt="Daluhena Tea Estate Logo" className="logo" />
        <div className="title-container">
          <h1 className="title">Welcome to Daluhena Tea Estate</h1>
        </div>
      </div>
      <div className="tiles-container">
        <Tile title="Fertilizer and Supplier Management"  icon={FertilizerIcon} />
        <Tile title="Employee and Attendance Management" to="/login" icon={EmployeeIcon} />
        <Tile title="Harvest and Inventory Management" icon={HarvestIcon} />
        <Tile title="Maintenance and Repairs Management" icon={MaintenanceIcon} />
        <Tile title="Pickup Schedule and Delivery Management" icon={PickupIcon} />
        <Tile title="Buyer and Sales Management" icon={BuyerIcon} />
        <Tile title="Financial Management" icon={FinancialIcon} />
        <Tile title="Weather and Cultivation Advisory" icon={WeatherIcon} />
      </div>
      <footer className="footer">
  <div className="copyright">
    <p>&copy; 2024 Daluhena Tea Estate. All rights reserved.</p>
  </div>
  <div className="social-icons">
    <a href="https://www.facebook.com">
      <img src={fbIcon} alt="Facebook" className="social-icon" />
    </a>
    <a href="https://www.instagram.com">
      <img src={instaIcon} alt="Instagram" className="social-icon2" />
    </a>
    <a href="https://www.linkedin.com">
      <img src={linkdinIcon} alt="LinkedIn" className="social-icon3" />
    </a>
    <a href="https://www.pinterest.com">
      <img src={pinterestIcon} alt="Pinterest" className="social-icon4" />
    </a>
  </div>
</footer>


    </div>
  );
}

function Tile({ title, to, icon }) {
  return (
    <div className="tile">
      <Link to={to} className="tile-link">
        <div className="icon-container">
          <img src={icon} alt={title} className="tile-icon" />
        </div>
        <h2 className="tile-title">{title}</h2>
      </Link>
    </div>
  );
}