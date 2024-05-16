const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
    fertilizerName: {
        type: String,
        required: true
    },
    fertilizerType: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a non-negative number.'] // Set minimum value for quantity
    },
    manufacturedDate: {
        type: Date,
        required: true
    },
    expiredDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(expiredDate) {
                return expiredDate > this.manufacturedDate; // Ensure expired date is after manufactured date
            },
            message: 'Expired date must be after manufactured date.'
        }
    }
});

// Custom validation for quantity
fertilizerSchema.path('quantity').validate(function(value) {
    return value >= 0;
}, 'Quantity must be a non-negative number.');

const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);

module.exports = Fertilizer;

