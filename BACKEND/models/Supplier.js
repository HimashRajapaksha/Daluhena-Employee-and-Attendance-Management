const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    contactPerson: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{3}\d{3}\d{4}/.test(v); // Example format: 123-456-7890
            },
            message: props => `${props.value} is not a valid phone number! Please use the format: XXX-XXX-XXXX`
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v); // Basic email format validation
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    address: {
        type: String,
        required: true
    },
    productTypes: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0; // Ensure there's at least one product type
            },
            message: props => `At least one product type must be provided.`
        }
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;