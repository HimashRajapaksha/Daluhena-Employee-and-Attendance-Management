import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png'; 
import editIcon from '../../images/Icons/edit.png';

export default function AllPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");
  const [purchaseDateFilter, setPurchaseDateFilter] = useState(""); // State for purchase date filter
  const [editPurchaseId, setEditPurchaseId] = useState(null); // State to manage which purchase is being edited
  const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState(""); // State to store updated payment status

  useEffect(() => {
    axios.get("http://localhost:8070/purchase")
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

  // Function to handle delete button click
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this purchase?");
  
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/purchase/delete/${id}`)
        .then(response => {
          setPurchases(purchases.filter(purchase => purchase._id !== id));
          console.log("Purchase deleted successfully");
          alert("Purchase deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting purchase:", error);
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePaymentStatusFilterChange = (e) => {
    setPaymentStatusFilter(e.target.value);
  };

  const handlePurchaseDateFilterChange = (e) => {
    setPurchaseDateFilter(e.target.value);
  };

  const handleEdit = (id) => {
    setEditPurchaseId(id);
  };

  const handlePaymentStatusUpdate = (value, id) => {
    if (typeof value === 'string') {
      // Send PUT request to update payment status
      axios.put(`http://localhost:8070/purchase/update/${id}/paymentStatus`, { paymentStatus: value })
        .then(response => {
          console.log("Payment status updated successfully:", response.data);
          // Update the purchases state to reflect the changes
          setPurchases(prevPurchases => {
            return prevPurchases.map(purchase => {
              if (purchase._id === id) {
                return { ...purchase, paymentStatus: value };
              }
              return purchase;
            });
          });
        })
        .catch(error => {
          console.error("Error updating payment status:", error);
        });
    } else {
      console.error("Invalid value for payment status:", value);
    }
  };
  
  
  
  
  const filteredPurchases = purchases.filter(purchase =>
    (purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (paymentStatusFilter === "All" || purchase.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase()) &&
    (!purchaseDateFilter || new Date(purchase.purchaseDate).toISOString().slice(0, 10) === purchaseDateFilter)
  );

  return (
    <div style={{ marginLeft: "280px" ,marginTop:"10px",marginRight:"10px"}}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>
          All Purchase Details
        </h1>
        <div style={{ display: "flex", marginBottom: "10px", marginLeft: "20px" }}>
        <div style={{ marginRight: "10px" ,fontWeight:'bold'  }}>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search by Supplier, Product or Invoice"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: "300px", borderRadius: "5px", padding: "5px" }}
            />
          </div>
          <div style={{ marginRight: "10px",marginLeft: "200px"  ,fontWeight:'bold'  }}>
            <label htmlFor="paymentStatus">Payment Status:</label>
            <select
              id="paymentStatus"
              value={paymentStatusFilter}
              onChange={handlePaymentStatusFilterChange}
              style={{ width: "180px",height:"35px",borderRadius: "5px", padding: "5px",marginBottom:"10px" }}
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div style={{ marginLeft: "150px" ,fontWeight:'bold'  }}>
            <label htmlFor="purchaseDate">Purchase Date:</label>
            <input
              type="date"
              id="purchaseDate"
              value={purchaseDateFilter}
              onChange={handlePurchaseDateFilterChange}
              style={{ borderRadius: "5px", padding: "5px" }}
            />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Product</th>
                <th>Invoice Number</th>
                <th>Purchase Date</th>
                <th>Payment Status</th>
                <th>Quantity (kg)</th>
                <th>Unit Price (LKR)</th>
                <th>Total Price (LKR)</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map(purchase => (
                <tr key={purchase._id}>
                  <td>{purchase.supplier}</td>
                  <td>{purchase.product}</td>
                  <td>{purchase.invoiceNumber}</td>
                  <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td>
                    {editPurchaseId === purchase._id ? (
                      <div>
                        <select
                          value={updatedPaymentStatus}
                          onChange={(e) => setUpdatedPaymentStatus(e.target.value)}
                          style={{ width: "100px", marginRight: "5px" }}
                        >

                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Pending">Pending</option>
                        </select>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handlePaymentStatusUpdate(updatedPaymentStatus, purchase._id);
                            setEditPurchaseId(null);
                          }}
                        >
                          Save
                        </button>


                      </div>
                    ) : (
                      <span>
                        {purchase.paymentStatus}
                        <img
                          src={editIcon}
                          alt="Edit"
                          style={{ marginLeft: "5px", cursor: "pointer", width: "20px", height: "20px" }}
                          onClick={() => handleEdit(purchase._id)}
                        />
                      </span>
                    )}
                  </td>
                  <td>{purchase.qty}</td>
                  <td>{purchase.unitPrice}</td>
                  <td>{purchase.totalPrice}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(purchase._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
