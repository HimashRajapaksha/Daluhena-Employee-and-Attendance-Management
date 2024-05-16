// models/EmployeeAttendance.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeAttendanceSchema = new Schema({

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
    dayType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    attendance: {
        type: String,
        required: true
    }
  
});

const EmployeeAttendance = mongoose.model("EmployeeAttendance",EmployeeAttendanceSchema);

module.exports = EmployeeAttendance;
