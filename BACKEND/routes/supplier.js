//const router = require("express").Router;

const express = require('express');
const router = express.Router();

let Supplier = require("../models/Supplier");

//add new supplier

    router.route("/add").post((req,res) => {
        
        const supplierName = req.body.supplierName;
        const contactPerson = req.body.contactPerson;
        const phone = req.body.phone;
        const email = req.body.email;
        const address = req.body.address;
        const productTypes = req.body.productTypes;

        const newSupplier = new Supplier({

            supplierName,
            contactPerson,
            phone,
            email,
            address,
            productTypes

        })

        newSupplier.save().then(()=>{
            res.json("Supplier Added")
        }).catch((err)=>{
            console.log(err);
        })

    })

    //retrieve supplier details

    router.route("/").get((req,res) =>{

        Supplier.find().then((suppliers)=>{
            res.json(suppliers)
        }).catch((err)=>{
            console.log(err)
        })

    })


    //update supplier details
    router.route("/update/:id").put(async (req, res) => {
        try {
            const supplierId = req.params.id;
            const { supplierName, contactPerson, phone, email, address, productTypes } = req.body;
    
            const updateSupplier = {
                supplierName,
                contactPerson,
                phone,
                email,
                address,
                productTypes,
            }
    
            const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, updateSupplier, { new: true });
    
            if (!updatedSupplier) {
                return res.status(404).send({ status: "Error", message: "Supplier not found" });
            }
    
            res.status(200).send({ status: "Supplier Details Updated", supplier: updatedSupplier });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        }
    });
    

//delete supplier

router.route("/delete/:id").delete(async (req,res) => {
    let supplierId = req.params.id;

    await Supplier.findByIdAndDelete(supplierId).then(() => {
        res.status(200).send({status: "Supplier records deleted"});
    }).catch((err) => {
        console.log(err.message);
        req.status(500).send({status: "Error with deleting supplier", error: err.message});
    })
})


//get details of one supplier

router.route("/get/:id").get(async (req, res) => {
    try {
        let supplierId = req.params.id;

        const supplier = await Supplier.findById(supplierId);

        if (!supplier) {
            return res.status(404).send({ status: "Error", message: "Supplier not found" });
        }

        res.status(200).send({ status: "Supplier fetched", supplier: supplier });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get supplier", error: err.message });
    }
});
    module.exports = router;