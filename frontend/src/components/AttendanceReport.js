import React, { useState } from 'react';
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

function AttendanceReport() {
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePDF = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Employee Attendance Report</Text>
            {attendanceData.length > 0 ? (
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={{ ...styles.tableCol, width: '18%' }}>
                    <Text style={styles.tableCell}>Employee name</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '15%' }}>
                    <Text style={styles.tableCell}>NIC</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '5%' }}>
                    <Text style={styles.tableCell}>Day Type</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '20%' }}>
                    <Text style={styles.tableCell}>Date</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: '5%' }}>
                    <Text style={styles.tableCell}>Attendance Status</Text>
                  </View>
                </View>
                {attendanceData.map((record, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={{ ...styles.tableCol, width: '18%' }}>
                      <Text style={styles.tableCell}>{record.name}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '15%' }}>
                      <Text style={styles.tableCell}>{record.nic}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '5%' }}>
                      <Text style={styles.tableCell}>{record.dayType}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}>
                      <Text style={styles.tableCell}>{record.date}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '5%' }}>
                      <Text style={styles.tableCell}>{record.attendance}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No attendance data available for the day you selected.</Text>
            )}
          </View>
        </Page>
      </Document>
    );
  };
  
  const handleDateChange = (event) => {
    setDate(event.target.value);
    setError(null); 
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8070/employeeAttendance/report?date=${date}`);
      const formattedData = response.data.map(record => ({
        ...record,
        date: new Date(record.date).toISOString().split('T')[0] // Format date
      }));
      setAttendanceData(formattedData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setError("Error fetching attendance data");
    } finally {
      setLoading(false);
    }
  };
  

  const handleGenerateReport = () => {
    if (date) {
      fetchData();
    } else {
      setError("Please select the Date.It is required");
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
      <h2>Employee Attendance Report</h2>
      <form style={{ paddingLeft: "30px"  }}>
        <label htmlFor="date" style={{ fontWeight: 'bold' }}>Select Date :</label>
        <input type="date" className="emp-att-dateSelect" id="date" name="date" value={date} onChange={handleDateChange}  />
        <button type="button" className="btn-for-generateReport" onClick={handleGenerateReport } >Generate Report</button>
      </form>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div style={styles.downloadContainer}>
  <PDFDownloadLink document={generatePDF()} fileName="attendance_report.pdf">
    {({ loading }) => (
      <span>
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
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        {generatePDF()}
      </PDFViewer>
    </div>
    </div>
  );
}

export default AttendanceReport;
