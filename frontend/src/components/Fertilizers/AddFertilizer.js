import React, { useState } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png';

export default function AddFertilizer() {
  const [fertilizerName, setFertilizerName] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturedDate, setManufacturedDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [manufacturerError, setManufacturerError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [manufacturedDateError, setManufacturedDateError] = useState("");
  const [expiredDateError, setExpiredDateError] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  function validateInputs() {
    let isValid = true;

    if (!fertilizerName) {
      setNameError("Fertilizer Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!fertilizerType) {
      setTypeError("Fertilizer Type is required.");
      isValid = false;
    } else {
      setTypeError("");
    }

    if (!manufacturer) {
      setManufacturerError("Manufacturer is required.");
      isValid = false;
    } else {
      setManufacturerError("");
    }

    if (!quantity) {
      setQuantityError("Quantity is required.");
      isValid = false;
    } else if (isNaN(quantity) || quantity <= 0) {
      setQuantityError("Quantity should be a positive number.");
      isValid = false;
    } else {
      setQuantityError("");
    }

    if (!manufacturedDate) {
      setManufacturedDateError("Manufactured Date is required.");
      isValid = false;
    } else {
      setManufacturedDateError("");
    }

    if (!expiredDate) {
      setExpiredDateError("Expired Date is required.");
      isValid = false;
    } else {
      setExpiredDateError("");
    }

    if (isValid) {
      const manufacturedTime = new Date(manufacturedDate).getTime();
      const expiredTime = new Date(expiredDate).getTime();
      if (manufacturedTime >= expiredTime) {
        setError("Manufactured Date should be before Expired Date.");
        isValid = false;
      } else {
        setError("");
      }
    }

    return isValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newFertilizer = {
      fertilizerName,
      fertilizerType,
      manufacturer,
      quantity,
      manufacturedDate,
      expiredDate
    };

    setSubmitted(true);
    setFormData(newFertilizer);
  }

  function handleConfirm() {
    if (formData) {
      axios.post("http://localhost:8070/fertilizer/add", formData)
        .then(() => {
          alert("Fertilizer Added");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
    setSubmitted(false);
    setFormData(null);
    setFertilizerName("");
    setFertilizerType("");
    setManufacturer("");
    setQuantity("");
    setManufacturedDate("");
    setExpiredDate("");
    setError("");
  }

  return (
    <div className="fertilizer-transparent-box" style={{ paddingTop: "20px", paddingBottom: "35px", paddingLeft: "10px" }}>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!submitted ? (
          <div className="fertilizer-form-container" style={{ paddingTop: "1px", paddingLeft:"40px" }}>
            <div className="fertilizer-form-wrapper" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "800px" }}>
              <form onSubmit={sendData}>
                <div className="fertilizer-form-group">
                  <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>Add New Fertilizer</h2>
                  <label htmlFor="fertilizerName">Fertilizer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fertilizerName"
                    placeholder="Enter fertilizer name"
                    value={fertilizerName}
                    onChange={(e) => setFertilizerName(e.target.value)}
                  />
                  {nameError && <div className="fertilizer-text-danger">{nameError}</div>}
                </div>

                <div className="fertilizer-form-group">
                  <label htmlFor="fertilizerType">Fertilizer Type</label>
                  <select
                    className="form-control"
                    id="fertilizerType"
                    value={fertilizerType}
                    onChange={(e) => setFertilizerType(e.target.value)}
                  >
                    <option value="">Select fertilizer type</option>
                    <option value="Organic">Organic</option>
                    <option value="Mineral">Mineral</option>
                  </select>
                  {typeError && <div className="fertilizer-text-danger">{typeError}</div>}
                </div>

                <div className="fertilizer-form-group">
                  <label htmlFor="manufacturer">Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="manufacturer"
                    placeholder="Enter manufacturer"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                  {manufacturerError && <div className="fertilizer-text-danger">{manufacturerError}</div>}
                </div>

                <div className="fertilizer-form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {quantityError && <div className="fertilizer-text-danger">{quantityError}</div>}
                </div>

                <div className="fertilizer-form-row">
                    <div className="fertilizer-form-group" style={{ marginRight: "10px", display: "inline-block", width: "50%" }}>
                      <label htmlFor="manufacturedDate">Manufactured Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="manufacturedDate"
                        value={manufacturedDate}
                        onChange={(e) => setManufacturedDate(e.target.value)}
                      />
                      {manufacturedDateError && <div className="fertilizer-text-danger">{manufacturedDateError}</div>}
                    </div>

                    <div className="fertilizer-form-group" style={{ marginLeft: "10px", display: "inline-block", width: "50%" }}>
                      <label htmlFor="expiredDate">Expired Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="expiredDate"
                        value={expiredDate}
                        onChange={(e) => setExpiredDate(e.target.value)}
                      />
                      {expiredDateError && <div className="fertilizer-text-danger">{expiredDateError}</div>}
                    </div>
                  </div>

                
                {error && <div className="fertilizer-alert fertilizer-alert-danger">{error}</div>}

                <button type="submit" className="fertilizer-btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="fertilizer-confirmation-container" style={{ width: "600px", marginLeft: "100px", marginTop: "40px",marginBottom: "40px", padding: "60px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1E421D", fontSize: "24px" }}>Confirm Entry</h2>
            <div className="fertilizer-confirmation-details" style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "10px" }}><strong>Fertilizer Name:</strong> {formData.fertilizerName}</p>
              <p style={{ marginBottom: "10px" }}><strong>Fertilizer Type:</strong> {formData.fertilizerType}</p>
              <p style={{ marginBottom: "10px" }}><strong>Manufacturer:</strong> {formData.manufacturer}</p>
              <p style={{ marginBottom: "10px" }}><strong>Quantity:</strong> {formData.quantity} kg</p>
              <p style={{ marginBottom: "10px" }}><strong>Manufactured Date:</strong> {formData.manufacturedDate}</p>
              <p style={{ marginBottom: "10px" }}><strong>Expired Date:</strong> {formData.expiredDate}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="fertilizer-btn-primary" onClick={handleConfirm} style={{ marginRight: "10px", padding: "10px 20px", fontSize: "16px" }}>
                Confirm
              </button>
              <button className="fertilizer-btn-warning" onClick={() => setSubmitted(false)} style={{ marginLeft: "10px", padding: "10px 20px", fontSize: "16px" }}>
                Edit Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
