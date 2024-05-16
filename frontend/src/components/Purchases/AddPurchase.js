import React, { useState, useRef } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png';

export default function AddPurchase() {
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation box visibility

  // Refs for the input fields
  const productInputRef = useRef(null);
  const invoiceNumberInputRef = useRef(null);
  const purchaseDateInputRef = useRef(null);
  const qtyInputRef = useRef(null);
  const unitPriceInputRef = useRef(null);
  const paymentStatusInputRef = useRef(null);

  function sendData(e) {
    e.preventDefault();

    const errors = {};

    if (!supplier) {
      errors.supplier = "Supplier name is required";
    } else if (!/^[a-zA-Z ()]*[a-zA-Z][a-zA-Z ()]*$/.test(supplier)) {
      errors.supplier = "Please enter a valid supplier.";
    }

    if (!product) {
      errors.product = "Product name is required";
    }

    if (!invoiceNumber) {
      errors.invoiceNumber = "Invoice number is required";
    }

    if (!purchaseDate) {
      errors.purchaseDate = "Purchase date is required";
    } else if (new Date(purchaseDate) > new Date()) {
      errors.purchaseDate = "Purchase date cannot be in the future";
    }

    if (!qty) {
      errors.qty = "Quantity is required";
    } else {
      if (isNaN(Number(qty)) || Number(qty) <= 0) {
        errors.qty = "Quantity must be a positive number";
      }
    }

    if (!unitPrice) {
      errors.unitPrice = "Unit price is required";
    } else {
      if (isNaN(Number(unitPrice)) || Number(unitPrice) <= 0) {
        errors.unitPrice = "Unit price must be a positive number";
      }
    }

    if (!paymentStatus) {
      errors.paymentStatus = "Payment status is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setShowConfirmation(true); // Show confirmation box
  }

  function handleConfirm() {
    const newPurchase = {
      supplier,
      product,
      invoiceNumber,
      purchaseDate,
      paymentStatus,
      qty,
      unitPrice
    };

    // Send data to the backend
    axios.post("http://localhost:8070/purchase/add", newPurchase)
      .then(() => {
        alert("Purchase Added");
        setShowConfirmation(false); // Hide confirmation box
        // Clear form fields
        setSupplier("");
        setProduct("");
        setInvoiceNumber("");
        setPurchaseDate("");
        setPaymentStatus("");
        setQty("");
        setUnitPrice("");
        setErrors({});
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          // Server returned an error message
          alert(err.response.data.error);
        } else {
          // Generic error message
          alert("An error occurred while adding the purchase.");
        }
      });
  }

  // Calculation for total cost
  const totalCost = qty * unitPrice;

  // Function to handle Enter key press
  function handleEnterKey(e, nextInputRef) {
    if (e.key === "Enter") {
      e.preventDefault();
      const fieldValue = e.target.value;
      const fieldName = e.target.id;

      const errors = {};

      if (fieldName === "supplier") {
        if (!fieldValue) {
          errors.supplier = "Supplier name is required";
        } else if (!/^[a-zA-Z ()]*[a-zA-Z][a-zA-Z ()]*$/.test(fieldValue)) {
          errors.supplier = "Please enter a valid supplier.";
        }
      } else if (fieldName === "product") {
        if (!fieldValue) {
          errors.product = "Product name is required";
        }
      } else if (fieldName === "invoiceNumber") {
        if (!fieldValue) {
          errors.invoiceNumber = "Invoice number is required";
        }
      } else if (fieldName === "purchaseDate") {
        if (!fieldValue) {
          errors.purchaseDate = "Purchase date is required";
        } else if (new Date(fieldValue) > new Date()) {
          errors.purchaseDate = "Purchase date cannot be in the future";
        }
      } else if (fieldName === "qty") {
        if (!fieldValue) {
          errors.qty = "Quantity is required";
        } else {
          if (isNaN(Number(fieldValue)) || Number(fieldValue) <= 0) {
            errors.qty = "Quantity must be a positive number";
          }
        }
      } else if (fieldName === "unitPrice") {
        if (!fieldValue) {
          errors.unitPrice = "Unit price is required";
        } else {
          if (isNaN(Number(fieldValue)) || Number(fieldValue) <= 0) {
            errors.unitPrice = "Unit price must be a positive number";
          }
        }
      } else if (fieldName === "paymentStatus") {
        // For radio button groups, focus on the first radio button
        const radioButtons = e.target.closest(".fertilizer-form-group").querySelectorAll("input[type=radio]");
        radioButtons[0].focus();
      }

      // If there are errors, set them in state
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        // If no errors, focus on the next input field
        nextInputRef.current.focus();
      }
    }
  }

  return (
    <div>
      {showConfirmation && (
        <div className="fertilizer-transparent-box">
          <div className="fertilizer-confirmation-box" style={{ width: "600px", marginTop: "40px", marginBottom: "40px", padding: "50px" }}>
            <h2>Confirm Purchase</h2>
            <p><strong>Supplier:</strong> {supplier}</p>
            <p><strong>Product:</strong> {product}</p>
            <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
            <p><strong>Purchase Date:</strong> {purchaseDate}</p>
            <p><strong>Payment Status:</strong> {paymentStatus}</p>
            <p><strong>Quantity:</strong> {qty} kg</p>
            <p><strong>Unit Price:</strong> LKR {unitPrice}</p>
            <p><strong>Total Cost:</strong> LKR {totalCost}</p>
            <button onClick={handleConfirm} className="fertilizer-btn-primary">Confirm</button>
            <button className="fertilizer-btn-warning" onClick={() => setShowConfirmation(false)}>Edit Entry</button>
          </div>
        </div>
      )}
      {!showConfirmation && (
        <div className="fertilizer-transparent-box">
          <div className="fertilizer-form-container">
            <div className="fertilizer-form-wrapper" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "2000px" }}>
              <form style={{ width: "100%", display: "flex", flexDirection: "column" }} onSubmit={sendData}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: '100% auto', padding: '40px 60px', width: "100%" }}>Record New Purchase Details</h2>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <div style={{ width: "50%", marginRight: "2%" }}>
                    <div className="fertilizer-form-group">
                      <label htmlFor="supplier">Supplier</label>
                      <input
                        type="text"
                        className="form-control"
                        id="supplier"
                        placeholder="Enter supplier"
                        value={supplier}
                        onChange={(e) => {
                          setSupplier(e.target.value);
                          // Clear supplier error when user starts typing
                          setErrors({ ...errors, supplier: "" });
                        }}
                        ref={productInputRef}
                        onKeyDown={(e) => handleEnterKey(e, invoiceNumberInputRef)}
                      />
                      {errors.supplier && <div className="fertilizer-text-danger">{errors.supplier}</div>}
                    </div>

                    <div className="fertilizer-form-group">
                      <label htmlFor="product">Product</label>
                      <input
                        type="text"
                        className="form-control"
                        id="product"
                        placeholder="Enter product"
                        value={product}
                        onChange={(e) => {
                          setProduct(e.target.value);
                          // Clear product error when user starts typing
                          setErrors({ ...errors, product: "" });
                        }}
                        ref={invoiceNumberInputRef}
                        onKeyDown={(e) => handleEnterKey(e, purchaseDateInputRef)}
                      />
                      {errors.product && <div className="fertilizer-text-danger">{errors.product}</div>}
                    </div>


                    <div className="fertilizer-form-group">
                      <label htmlFor="invoiceNumber">Invoice Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="invoiceNumber"
                        placeholder="Enter invoice number"
                        value={invoiceNumber}
                        onChange={(e) => {
                          setInvoiceNumber(e.target.value);
                          // Clear invoice number error when user starts typing
                          setErrors({ ...errors, invoiceNumber: "" });
                        }}
                        ref={purchaseDateInputRef}
                        onKeyDown={(e) => handleEnterKey(e, qtyInputRef)}
                      />
                      {errors.invoiceNumber && <div className="fertilizer-text-danger">{errors.invoiceNumber}</div>}
                    </div>
                    <div className="fertilizer-form-group">
                      <label htmlFor="purchaseDate">Purchase Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="purchaseDate"
                        value={purchaseDate}
                        onChange={(e) => {
                          setPurchaseDate(e.target.value);
                          // Clear purchase date error when user starts typing
                          setErrors({ ...errors, purchaseDate: "" });
                        }}
                        onBlur={(e) => {
                          if (new Date(e.target.value) > new Date()) {
                            setErrors({ ...errors, purchaseDate: "Purchase date cannot be in the future" });
                          }
                        }}
                        ref={qtyInputRef}
                        onKeyDown={(e) => handleEnterKey(e, unitPriceInputRef)}
                      />
                      {errors.purchaseDate && <div className="fertilizer-text-danger">{errors.purchaseDate}</div>}
                    </div>
                  </div>

                  <div style={{ width: "50%", marginLeft: "2%" }}>
                    <div className="fertilizer-form-group">
                      <label htmlFor="qty">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        id="qty"
                        placeholder="Enter quantity"
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                          // Clear quantity error when user starts typing
                          setErrors({ ...errors, qty: "" });
                        }}
                        ref={unitPriceInputRef}
                        onKeyDown={(e) => handleEnterKey(e, paymentStatusInputRef)}
                      />
                      {errors.qty && <div className="fertilizer-text-danger">{errors.qty}</div>}
                    </div>

                    <div className="fertilizer-form-group">
                      <label htmlFor="unitPrice">Unit Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="unitPrice"
                        placeholder="Enter unit price"
                        value={unitPrice}
                        onChange={(e) => {
                          setUnitPrice(e.target.value);
                          // Clear unit price error when user starts typing
                          setErrors({ ...errors, unitPrice: "" });
                        }}
                        ref={paymentStatusInputRef}
                      />
                      {errors.unitPrice && <div className="fertilizer-text-danger">{errors.unitPrice}</div>}
                    </div>
                    <div className="fertilizer-form-group" onKeyDown={(e) => handleEnterKey(e, paymentStatusInputRef)}>
                      <label>Payment Status</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="paymentStatus"
                            value="Paid"
                            checked={paymentStatus === "Paid"}
                            onChange={() => setPaymentStatus("Paid")}
                          />
                          Paid
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="paymentStatus"
                            value="Pending"
                            checked={paymentStatus === "Pending"}
                            onChange={() => setPaymentStatus("Pending")}
                          />
                          Pending
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="paymentStatus"
                            value="Unpaid"
                            checked={paymentStatus === "Unpaid"}
                            onChange={() => setPaymentStatus("Unpaid")}
                          />
                          Unpaid
                        </label>
                      </div>
                      {errors.paymentStatus && <div className="fertilizer-text-danger">{errors.paymentStatus}</div>}
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", marginLeft: "10%" }}>
                  <button type="submit" className="fertilizer-btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
