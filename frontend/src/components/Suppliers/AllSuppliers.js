import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png'; 

export default function AllSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    supplierName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    productTypes: []
  });
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8070/supplier")
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this supplier?");
  
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/supplier/delete/${id}`)
        .then(response => {
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
          console.log("Supplier deleted successfully");
          alert("Supplier deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting supplier:", error);
        });
    }
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    const supplierToUpdate = suppliers.find(supplier => supplier._id === id);
    setUpdateFormData(supplierToUpdate);
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8070/supplier/update/${updateId}`, updateFormData)
      .then(response => {
        alert("Supplier updated successfully");
        setUpdateFormData({
          supplierName: "",
          contactPerson: "",
          phone: "",
          email: "",
          address: "",
          productTypes: []
        });
        setUpdateId(null);
        // Fetch updated supplier data...
        axios.get("http://localhost:8070/supplier")
          .then(response => {
            setSuppliers(response.data);
          })
          .catch(error => {
            console.error("Error fetching suppliers:", error);
          });
      })
      .catch(error => {
        console.error("Error updating supplier:", error);
        alert("Error updating supplier");
      });
  };

  const handleUpdateFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      (selectedFilter === "" || supplier.productTypes.includes(selectedFilter)) &&
      (supplier.supplierName.toLowerCase().includes(lowercaseQuery) ||
      supplier.productTypes.some(type => type.toLowerCase().includes(lowercaseQuery)))
    );
  });

  const uniqueProductTypes = [...new Set(suppliers.flatMap(supplier => supplier.productTypes))];

  return (
    <div style={{ marginLeft: "280px", marginRight: "10px", marginTop: "10px" }}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>All Supplier Details</h1>
        <div style={{ marginBottom: "25px", display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search Supplier or Product Type"
            value={searchQuery}
            onChange={handleSearch}
            style={{ marginLeft: "20px", width: "600px", borderRadius: "10px", padding: "8px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" , marginRight: "100px"}}
          />
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            style={{ marginLeft: "10px", borderRadius: "10px", padding: "8px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}
          >
            <option value="">All Product Types</option>
            {uniqueProductTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Product Types</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.productTypes.join(", ")}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdate(supplier._id)}
                        style={{ marginRight: "5px" }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(supplier._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {updateId && (
        <div style={{ marginTop: "20px" }}>
          <h2>Update Supplier</h2>
          <form onSubmit={handleUpdateFormSubmit}>
            <div>
              <label htmlFor="supplierName">Supplier Name:</label>
              <input type="text" name="supplierName" id="supplierName" value={updateFormData.supplierName} onChange={handleUpdateFormChange} />
            </div>
            <div>
              <label htmlFor="contactPerson">Contact Person:</label>
              <input type="text" name="contactPerson" id="contactPerson" value={updateFormData.contactPerson} onChange={handleUpdateFormChange} />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input type="text" name="phone" id="phone" value={updateFormData.phone} onChange={handleUpdateFormChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" value={updateFormData.email} onChange={handleUpdateFormChange} />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input type="text" name="address" id="address" value={updateFormData.address} onChange={handleUpdateFormChange} />
            </div>
            <div>
              <label htmlFor="productTypes">Product Types:</label>
              <input type="text" name="productTypes" id="productTypes" value={updateFormData.productTypes} onChange={handleUpdateFormChange} />
            </div>
            <button type="submit">Update Supplier</button>
          </form>
        </div>
      )}
    </div>
  );
}
