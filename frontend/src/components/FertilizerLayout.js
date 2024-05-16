// FertilizerLayout.js
import React from 'react';
import Header from './Header'; // Assuming this is the header for fertilizer management

const FertilizerLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default FertilizerLayout;
