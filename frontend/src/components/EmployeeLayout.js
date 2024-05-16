// EmployeeLayout.js
import React from 'react';
import EmpHeader from './EmpHeader'; // Assuming this is the header for employee management

const EmployeeLayout = ({ children }) => {
  return (
    <div>
      <EmpHeader />
      {children}
    </div>
  );
};

export default EmployeeLayout;
