const express = require('express');
const router = express.Router();
const Purchase = require("../models/Purchase");

// Add new purchase
router.route("/add").post(async (req, res) => {
    try {
        const { supplier, product, invoiceNumber, purchaseDate, paymentStatus, qty, unitPrice } = req.body;

        // Check if invoice number already exists
        const existingPurchase = await Purchase.findOne({ invoiceNumber });
        if (existingPurchase) {
            return res.status(400).json({ error: `${invoiceNumber} already exists. Please enter a unique invoice number` });
        }

        // Calculate totalPrice
        const totalPrice = qty * unitPrice;

        const newPurchase = new Purchase({
            supplier,
            product,
            invoiceNumber,
            purchaseDate,
            paymentStatus,
            qty,
            unitPrice,
            totalPrice // Automatically calculated
        });

        await newPurchase.save();

        res.json("Purchase Details Added");
    } catch (error) {
        console.error("Error adding purchase:", error);
        res.status(500).json({ error: "Error adding purchase details" });
    }
});

// Retrieve all purchase details
router.route("/").get((req, res) => {
    Purchase.find()
        .then((purchases) => {
            res.json(purchases);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving purchase details" });
        });
});

// Update payment status of a purchase
router.route("/update/:id/paymentStatus").put(async (req, res) => {
    const purchaseId = req.params.id;
    const { paymentStatus } = req.body; // Only update payment status

    try {
        const update = await Purchase.findByIdAndUpdate(purchaseId, { paymentStatus }, { new: true });
        res.status(200).send({ status: "Payment Status Updated", purchase: update });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating payment status", error: err.message });
    }
});


// Delete purchase
router.route("/delete/:id").delete(async (req, res) => {
    const purchaseId = req.params.id;

    try {
        await Purchase.findByIdAndDelete(purchaseId);
        res.status(200).send({ status: "Purchase records deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting purchase records", error: err.message });
    }
});

// Get details of one purchase
router.route("/get/:id").get(async (req, res) => {
    const purchaseId = req.params.id;

    try {
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).send({ status: "Error", error: "Purchase not found" });
        }
        res.status(200).send({ status: "Purchase fetched", purchase: purchase });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get purchase", error: err.message });
    }
});

// Generate purchase history report
router.route("/report").get(async (req, res) => {
    try {
        // Extract fromDate and toDate from query parameters
        const { fromDate, toDate } = req.query;

        // Define filter object for the date range
        const dateFilter = {};
        if (fromDate && toDate) {
            dateFilter.purchaseDate = {
                $gte: new Date(fromDate), // Greater than or equal to fromDate
                $lte: new Date(toDate)    // Less than or equal to toDate
            };
        } else if (fromDate) {
            dateFilter.purchaseDate = { $gte: new Date(fromDate) };
        } else if (toDate) {
            dateFilter.purchaseDate = { $lte: new Date(toDate) };
        }

        // Fetch purchases with optional date filtering
        const purchases = await Purchase.find(dateFilter);

        // Calculate total expense
        const totalExpense = purchases.reduce((total, purchase) => total + purchase.totalPrice, 0);

        // Format the data for the report
        const reportData = purchases.map(purchase => ({
            supplier: purchase.supplier,
            product: purchase.product,
            invoiceNumber: purchase.invoiceNumber,
            purchaseDate: purchase.purchaseDate,
            totalPrice: purchase.totalPrice,

            // Add any additional information here
        }));

        // Send the report data and total expense as a response
        res.json({ reportData, totalExpense });
    } catch (error) {
        console.error("Error generating purchase history report:", error);
        res.status(500).json({ error: "Error generating purchase history report" });
    }
});

module.exports = router;

