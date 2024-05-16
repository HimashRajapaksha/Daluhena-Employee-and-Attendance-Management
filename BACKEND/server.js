const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})

const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

const fertilizerRouter = require("./routes/fertilizer.js");
app.use("/fertilizer", fertilizerRouter);

const supplierRouter = require("./routes/supplier.js");
app.use("/supplier", supplierRouter);

const purchaseRouter = require("./routes/purchase.js");
app.use("/purchase", purchaseRouter); 

const employeeRouter= require("./routes/employees.js");
app.use("/employee",employeeRouter)


const EmployeeLeavesRouter= require("./routes/EmployeeLeaveRouter.js");
app.use("/EmployeeLeave",EmployeeLeavesRouter)


const EmployeeAttendancesRouter= require("./routes/EmployeeAttendanceRouter.js");
app.use("/EmployeeAttendance",EmployeeAttendancesRouter)



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})



