// App.js
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmpHeader from './components/EmpHeader';
import Header from './components/Header';
import EmpLogin from './components/EmpLogin/EmpLogin';
import Login from './components/Login/Login';
import AddEmployee from './components/AddEmployee';
import AddEmployeeLeave from './components/AddEmployeeLeave';
import AddEmployeeAttendance from './components/AddEmployeeAttendance';
import UpdateEmployeeDetails from './components/UpdateEmployeeDetails';
import EmpDashboard from './components/EmpDashboard';
import AllEmployeesDisplay from './components/AllEmployeesDisplay';
import AllEmployeeAttendance from './components/AllEmployeeAttendance';
import AllEmployeeLeaves from './components/AllEmployeeLeaves';
import ViewMoreEmployee from './components/ViewMoreEmployee';
import AttendanceReport from './components/AttendanceReport';
import LeaveReport from './components/LeaveReport';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard';
import AddFertilizer from './components/Fertilizers/AddFertilizer';
import AddSupplier from './components/Suppliers/AddSupplier';
import AddPurchase from './components/Purchases/AddPurchase';
import AllPurchases from './components/Purchases/AllPurchases';
import AllSuppliers from './components/Suppliers/AllSuppliers';
import AllFertilizers from './components/Fertilizers/AllFertilizers';
import PurchaseHistoryReport from './components/Purchases/PurchaseHistoryReport';
import PurchasesPage from './components/Purchases/PurchasesPage';
import SuppliersPage from './components/Suppliers/SuppliersPage';
import FertilizersPage from './components/Fertilizers/FertilizersPage';
import ScheduleProcess from './components/Fertilizers/ScheduleProcess';
import ContactSupplier from './components/Suppliers/ContactSupplier';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase/add" element={<AddPurchase />} />
          <Route path="/fertilizer/add" element={<AddFertilizer />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/purchase/" element={<AllPurchases />} />
          <Route path="/supplier/" element={<AllSuppliers />} />
          <Route path="/fertilizer/" element={<AllFertilizers />} />
          <Route path="/report-generation" element={<PurchaseHistoryReport />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/fertilizers" element={<FertilizersPage />} />
          <Route path="/fertilizer/schedule" element={<ScheduleProcess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supplier/contact" element={<ContactSupplier />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/EmployeeLeave/add" element={<AddEmployeeLeave />} />
          <Route path="/EmployeeAttendance/add" element={<AddEmployeeAttendance />} />
          <Route path="/update/:id" element={<UpdateEmployeeDetails />} />
          <Route path="/empdashboard" element={<EmpDashboard />} />
          <Route path="/all-employees" element={<AllEmployeesDisplay />} />
          <Route path="/all-attendance-details" element={<AllEmployeeAttendance />} />
          <Route path="/all-leave-details" element={<AllEmployeeLeaves />} />
          <Route path="/view-more-employee" element={<ViewMoreEmployee />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="/leave-report" element={<LeaveReport />} />
          <Route path="/emplogin" element={<EmpLogin/>} />
        </Routes>

        <Header />
        <EmpHeader/>

      </div>
    </Router>
  );
}

export default App;
