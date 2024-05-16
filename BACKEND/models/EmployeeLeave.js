const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeLeaveSchema = new Schema({

    name: {
        type : String,
        required: true

    },
    nic:{
        type : Number,
        required: true

    },
    jobrole:{
        type:String, 
        require:true
    },
    leaveType: {
        type: String,
        required: true
    },
    leaveFrom: {
        type: Date,
        required: true
    },
    leaveTo: {
        type: Date,
        required: true
    },
    leaveStatus: {
        type: String,
        required: true
    }
});

const EmployeeLeave = mongoose.model("EmployeeLeave",EmployeeLeaveSchema);

module.exports = EmployeeLeave;