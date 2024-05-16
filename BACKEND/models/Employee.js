const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String, // Changed type to String for NIC
        required: true,
        minlength: 10, // Example: NIC must have a minimum length of 10 characters
        maxlength: 12, // Example: NIC must have a maximum length of 12 characters
        

    },
    email: {
        type: String,
       
        sparse: true, // Allow null or empty values without causing a duplicate key error
       
    },
    contactNumber: {
        type: String,
        required: true,
        minlength: 10, // Example: Assuming a minimum length of 10 digits for a contact number
        maxlength: 15, // Example: Assuming a maximum length of 15 digits for a contact number
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'male', 'Female', 'female', 'Other', 'other'] // Ensures that gender is one of the specified values
    },
    age: {
        type: Number,
        required: true,
        min: 18, // Example: Minimum age requirement
        max: 100 // Example: Maximum age requirement
    },
    address: {
        type: String,
        required: true
    },
    jobrole: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
