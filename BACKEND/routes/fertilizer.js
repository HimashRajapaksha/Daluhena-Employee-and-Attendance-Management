const express = require('express');
const router = express.Router();
const Fertilizer = require("../models/Fertilizer");

// Add new fertilizer
router.post("/add", async (req, res) => {
    const { fertilizerName, fertilizerType, manufacturer, quantity, manufacturedDate, expiredDate } = req.body;

    try {
        const newFertilizer = new Fertilizer({
            fertilizerName,
            fertilizerType,
            manufacturer,
            quantity,
            manufacturedDate,
            expiredDate
        });

        await newFertilizer.save();
        res.json("Fertilizer Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error adding fertilizer" });
    }
});

// Retrieve all fertilizer details
router.get("/", async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        res.json(fertilizers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error retrieving fertilizer details" });
    }
});

// Update fertilizer details
router.put("/update/:id", async (req, res) => {
    const fertilizerId = req.params.id;
    const { fertilizerName, fertilizerType, manufacturer, quantity, manufacturedDate, expiredDate } = req.body;

    const updateFertilizer = {
        fertilizerName,
        fertilizerType,
        manufacturer,
        quantity,
        manufacturedDate,
        expiredDate
    };

    try {
        const update = await Fertilizer.findByIdAndUpdate(fertilizerId, updateFertilizer);
        res.status(200).send({ status: "Fertilizer Details Updated", fertilizer: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating fertilizer", error: err.message });
    }
});

// Delete fertilizer
router.delete("/delete/:id", async (req, res) => {
    const fertilizerId = req.params.id;

    try {
        await Fertilizer.findByIdAndDelete(fertilizerId);
        res.status(200).send({ status: "Fertilizer records deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting fertilizer", error: err.message });
    }
});

// Get details of one fertilizer
router.get("/get/:id", async (req, res) => {
    const fertilizerId = req.params.id;

    try {
        const fertilizer = await Fertilizer.findById(fertilizerId);
        if (!fertilizer) {
            return res.status(404).send({ status: "Error", error: "Fertilizer not found" });
        }
        res.status(200).send({ status: "Fertilizer fetched", fertilizer: fertilizer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get fertilizer", error: err.message });
    }
});

module.exports = router;
