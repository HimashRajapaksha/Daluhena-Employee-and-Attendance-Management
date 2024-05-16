const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    supplier: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,  // Ensure each invoice number is unique
        validate: {
            validator: async function(value) {
                const existingPurchase = await this.constructor.findOne({ invoiceNumber: value });
                if (existingPurchase) {
                    return false; // Return false if the invoice number already exists
                }
                return true; // Return true if the invoice number is unique
            },
            message: props => `${props.value} already exists. Please enter a unique invoice number`
        }
    },     
    purchaseDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date(); // Ensure the purchase date is not in the future
            },
            message: 'Purchase date cannot be in the future.'
        }
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Unpaid'],
        validate: {
            validator: function(value) {
                return ['Paid', 'Pending', 'Unpaid'].includes(value);
            },
            message: 'Invalid payment status.'
        }
    },
    qty: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0; // Quantity must be greater than 0
            },
            message: 'Quantity must be a positive number.'
        }
    },
    unitPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0; // Unit price must be greater than 0
            },
            message: 'Unit price must be a positive number.'
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Total price must be a non-negative number.'
        }
    }
});

// Define a pre-save hook to calculate and update totalPrice before saving the document
purchaseSchema.pre('save', function(next) {
    this.totalPrice = this.qty * this.unitPrice;
    next();
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
