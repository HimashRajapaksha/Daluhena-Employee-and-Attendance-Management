import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import DownloadIcon from '../icons/download2.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 1,
    paddingHorizontal: 1,
    flexGrow: 1,
    flexBasis: 'auto',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableCell: {
    flexGrow: 1,
    fontSize: 12
  },
  downloadContainer: {
    position: 'absolute',
    top: 115,
    right: 50,
    padding: '10px',
  }
});

function LeaveReport() {
    const [leaveFrom, setLeaveFrom] = useState('');
    const [leaveTo, setLeaveTo] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [leaveData, setLeaveData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchData(); // Fetch data initially and whenever any filter changes
    }, [leaveFrom, leaveTo, leaveType]); // Dependency array to listen for changes in these states
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
  
    const generatePDF = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Employee Leave Report</Text>
            {leaveData.length > 0 ? (
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={{ ...styles.tableCol, width: '18%' }}>
                    <Text style={styles.tableCell}>Employee name</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '15%' }}>
                    <Text style={styles.tableCell}>NIC</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '20%' }}>
                    <Text style={styles.tableCell}>Job Role</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '8%' }}>
                    <Text style={styles.tableCell}>Leave Type</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '10%' }}>
                    <Text style={styles.tableCell}>Leave From</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '10%' }}>
                    <Text style={styles.tableCell}>Leave To</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '12%' }}>
                    <Text style={styles.tableCell}>Leave Status</Text>
                  </View>
                </View>
                {leaveData.map((record, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={{ ...styles.tableCol, width: '18%' }}>
                      <Text style={styles.tableCell}>{record.name}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '15%' }}>
                      <Text style={styles.tableCell}>{record.nic}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}>
                      <Text style={styles.tableCell}>{record.jobrole}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '8%' }}>
                      <Text style={styles.tableCell}>{record.leaveType}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '10%' }}>
                      <Text style={styles.tableCell}>{formatDate(record.leaveFrom)}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '10%' }}>
                      <Text style={styles.tableCell}>{formatDate(record.leaveTo)}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '12%' }}>
                      <Text style={styles.tableCell}>{record.leaveStatus}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No leave data has been entered for the fields you selected.</Text>
              
            )}
          </View>
        </Page>
      </Document>
    );
  };

  const handleLeaveFromChange = (event) => {
    setLeaveFrom(event.target.value);
    setError(null);
  };

  const handleLeaveToChange = (event) => {
    setLeaveTo(event.target.value);
    setError(null);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    setError(null);
  };

  const fetchData = async () => {
    if (!leaveFrom || !leaveTo) {
      setError("Please select both Leave From and Leave To dates");
      return;
    }
  
    try {
      setLoading(true);
      let apiUrl = `http://localhost:8070/EmployeeLeave/report?leaveFrom=${leaveFrom}&leaveTo=${leaveTo}`;
      if (leaveType) {
        apiUrl += `&leaveType=${leaveType}`;
      }
      const response = await axios.get(apiUrl);
      setLeaveData(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
      setError("Error fetching leave data");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="emp-att-background-container">
     <div
    className="emp-att-container"
    style={{
      backgroundColor: "white",
      borderRadius: "15px",
      maxWidth: "calc(100% - 255px)", // Adjust the max-width to increase the width
      width: "90%", // Adjust the width to increase the width
      marginLeft: "250px", // Adjust margin-left to match layout
      marginRight: "15px",
      marginBottom: "15px",
      marginTop: "15px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      paddingBottom: "20px",
    }}
  >
        <h2>Employee Leave Report</h2>
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="leaveFrom" style={{ fontWeight: 'bold' }}>Leave From:</label>
              <input type="date" className="emp-att-dateSelect" id="leaveFrom" value={leaveFrom} onChange={handleLeaveFromChange} />
            </div>
            <div className="col">
              <label htmlFor="leaveTo" style={{ fontWeight: 'bold' }}>Leave To:</label>
              <input type="date" className="emp-att-dateSelect" id="leaveTo" value={leaveTo} onChange={handleLeaveToChange} />
            </div>
            <div className="col">
              <label htmlFor="leaveType" style={{ fontWeight: 'bold' }}>Leave Type:</label>
              <select className="selectItem" id="leaveType" value={leaveType} onChange={handleLeaveTypeChange}>
                <option value="">Select Leave Type</option>
                <option value="Casual">Casual</option>
                <option value="Annual">Annual</option>
                <option value="Medical">Medical</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div className="col">
            <div style={styles.downloadContainer}>
          <PDFDownloadLink document={generatePDF()} fileName="leave_report.pdf">
            {({ loading }) => (
              <span >
                <img src={DownloadIcon} alt="Download Icon" style={{ 
                  marginRight: '8px', 
                  verticalAlign: 'middle',
                  width: '40px',
                  height: '40px' 
                }}  />
                {loading ? 'Loading document...' : 'Download Document'}
              </span>
            )}
          </PDFDownloadLink>
        </div>
            </div>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
       
        <PDFViewer style={{ width: '100%', height: '600px' }}>
          {generatePDF()}
        </PDFViewer>
      </div>
    </div>
  );
}

export default LeaveReport;