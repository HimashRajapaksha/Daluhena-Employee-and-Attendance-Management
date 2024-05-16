import React, { useState } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png';

export default function AddSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [supplierNameError, setSupplierNameError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [productTypesError, setProductTypesError] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  function validateInputs() {
    let isValid = true;

    if (!supplierName) {
      setSupplierNameError("Supplier Name is required.");
      isValid = false;
    } else if (!/^[a-zA-Z ()]*[a-zA-Z][a-zA-Z () & .]*$/.test(supplierName)) {
      setSupplierNameError("Please enter a valid supplier name.");
      isValid = false;
    } else {
      setSupplierNameError("");
    }
    
    if (!contactPerson) {
      setContactPersonError("Contact Person is required.");
      isValid = false;
    } else if (!/^[a-zA-Z. ]*[a-zA-Z][a-zA-Z. ]*$/.test(contactPerson)) {
      setContactPersonError("Please enter a valid name.");
      isValid = false;
    } else {
      setContactPersonError("");
    }    

    if (!phone) {
      setPhoneError("Phone is required.");
      isValid = false;
    } else if (!/^(\d{3}\d{3}\d{4})$/.test(phone)) {
      setPhoneError("Phone must be in the format XXXXXXXXXX.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!address) {
      setAddressError("Address is required.");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!productTypes) {
      setProductTypesError("Product Types are required.");
      isValid = false;
    } else {
      setProductTypesError("");
    }

    setError(isValid ? "" : "All fields are required.");
    return isValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setShowConfirmation(true);
  }

  function handleConfirm() {
    const newSupplier = {
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      productTypes
    };

    axios.post("http://localhost:8070/supplier/add", newSupplier)
      .then(() => {
        alert("Supplier Added");
        setSupplierName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setAddress("");
        setProductTypes("");
        setError("");
        setShowConfirmation(false);
      })
      .catch((err) => {
        alert(err.response.data.message); // Display error message from server
      });
  }

  function handleEdit() {
    setShowConfirmation(false);
  }

  return (
    <div className="fertilizer-transparent-box">
      {!showConfirmation ? (
        <div className="fertilizer-form-container">
          <div className="fertilizer-form-wrapper" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "800px" }}>
            <form style={{ margin: "0 auto" }} onSubmit={sendData}>
              <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>Add New Supplier Details</h2>
              <div className="fertilizer-form-row">
                <div className="fertilizer-form-group-col" style={{ marginRight: "10px", width: "50%"}}>
                  <label htmlFor="supplierName">Supplier Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierName"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                  {supplierNameError && <div className="fertilizer-text-danger">{supplierNameError}</div>}
                </div>

                <div className="fertilizer-form-group-col" style={{ marginLeft: "10px", width: "50%"}}>
                  <label htmlFor="contactPerson">Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson"
                    placeholder="Enter contact person"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                  {contactPersonError && <div className="fertilizer-text-danger">{contactPersonError}</div>}
                </div>
              </div>

              <div className="fertilizer-form-row">
                <div className="fertilizer-form-group-col" style={{ marginRight: "10px", width: "50%"}}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number (XXX XXX XXXX)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && <div className="fertilizer-text-danger">{phoneError}</div>}
                </div>

                <div className="fertilizer-form-group-col" style={{ marginLeft: "10px", width: "50%" }}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <div className="fertilizer-text-danger">{emailError}</div>}
                </div>
              </div>

              <div className="fertilizer-form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {addressError && <div className="fertilizer-text-danger">{addressError}</div>}
              </div>

              <div className="fertilizer-form-group">
                <label htmlFor="productTypes">Product Types</label>
                <input
                  type="text"
                  className="form-control"
                  id="productTypes"
                  placeholder="Enter product types"
                  value={productTypes}
                  onChange={(e) => setProductTypes(e.target.value)}
                />
                {productTypesError && <div className="fertilizer-text-danger">{productTypesError}</div>}
              </div>

              {error && <div className="fertilizer-alert fertilizer-alert-danger">{error}</div>}

              <button type="submit" className="fertilizer-btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="fertilizer-confirmation-box" style={{ width: "600px",marginTop: "40px",marginBottom: "40px", padding: "60px"}}>
          <h2>Confirm Supplier Details</h2>
          <p><strong>Supplier Name:</strong> {supplierName}</p>
          <p><strong>Contact Person:</strong> {contactPerson}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Product Types:</strong> {productTypes}</p>
          <div>
            <button onClick={handleConfirm} className="fertilizer-btn-primary">Confirm</button>
            <button onClick={handleEdit} className="fertilizer-btn-warning">Edit Entry</button>
          </div>
        </div>
      )}
    </div>
  );
}
