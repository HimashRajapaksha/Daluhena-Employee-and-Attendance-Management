import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadPDFIcon from '../../images/Icons/downloadPdf.png';
import { Document, Page, View, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function PurchaseHistoryReport() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        fetchReport();
    }, [fromDate, toDate]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8070/purchase/report', {
                params: {
                    fromDate,
                    toDate
                }
            });
            setReportData(response.data.reportData);
            setTotalExpense(response.data.totalExpense);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching purchase history report:', error);
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        title: {
            textAlign: 'center', // Align the title text to the center
            fontSize: 20,
            marginBottom: 10, // Add some space below the title
            fontWeight: 'bold',
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10,
        },
        headerCol: {
            backgroundColor: '#ccc',
            fontWeight: 'bold',
        },
        totalCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10,
        },
        totalExpense: {
            textAlign: 'right',
            marginTop: 15,
            fontSize: 14,
            fontWeight: 'bold',
            borderTopWidth: 1,
            borderBottomWidth: 2,
            borderColor: '#000',
            paddingTop: 8,
            paddingBottom: 8,
            marginBottom: 10,
        },
        subtitleContainer: {
            flexDirection: 'row', // Display the "From" and "To" dates horizontally
            justifyContent: 'space-between', // Add space between the "From" and "To" dates
            marginBottom: 20, // Adjust the margin between From Date and To Date
            paddingLeft: 10, // Add left padding
            paddingRight: 10, // Add right padding
        },
        subtitle: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        
        
    });

    const formatCurrency = (amount) => {
        return `LKR ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    const PDFDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Fertilizer Purchase History Report</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>From: {fromDate}</Text>
                        <Text style={styles.subtitle}>To: {toDate}</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCol, styles.headerCol]}>Supplier</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Product</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Invoice Number</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Purchase Date</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Total Price</Text>
                        </View>
                            {reportData.map((purchase, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCol}>{purchase.supplier}</Text>
                                    <Text style={styles.tableCol}>{purchase.product}</Text>
                                    <Text style={styles.tableCol}>{purchase.invoiceNumber}</Text>
                                    <Text style={styles.tableCol}>{purchase.purchaseDate.split('T')[0]}</Text> {/* Format the date */}
                                    <Text style={styles.totalCol}>{formatCurrency(purchase.totalPrice)}</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.totalExpense}>Total Expense: {formatCurrency(totalExpense)}</Text>
                </View>
            </Page>
        </Document>
    );
    
    

    return (
        <div className="fertilizer-report-container">
            <h1 style={{ textAlign:'center',paddingBottom:'10px' }} >Purchase History Report</h1>
            <div className="fertilizer-report-controls">
                <div className="fertilize-report-date-input">
                    <label htmlFor="fromDate" style={{ fontWeight:'bold' }} >From Date:</label>
                    <input type="date" className="fertilizer-date-input" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="fertilizer-date-inputall">
                    <label htmlFor="toDate"  style={{ fontWeight:'bold' }}>To Date:</label>
                    <input type="date" className="fertilizer-date-input" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="fertilizer-download-pdf">
                    <PDFDownloadLink document={PDFDocument} fileName="purchase_report.pdf">
                        {({ blob, url, loading, error }) => (
                            <div style={{ display: 'flex', alignItems: 'center', fontWeight:'bold' }}>
                                <img src={DownloadPDFIcon} alt="Download PDF Icon" style={{ marginRight: '5px',width:'40px',height:'40px' }} />
                                {loading ? 'Loading document...' : 'Download PDF'}
                            </div>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
            <PDFViewer width="100%" height="600">
                {PDFDocument}
            </PDFViewer>
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default PurchaseHistoryReport;