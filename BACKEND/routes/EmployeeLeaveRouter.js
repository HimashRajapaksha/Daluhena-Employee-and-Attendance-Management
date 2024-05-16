const router = require("express").Router();
const EmployeeLeave = require("../models/EmployeeLeave");
const Employee = require("../models/Employee");

// Route to add new employee leave
router.route("/add").post(async (req, res) => {
    const { name, nic, jobrole, leaveType, leaveFrom, leaveTo, leaveStatus } = req.body;

    try {
        // Check if employee with given name and NIC exists
        const employee = await Employee.findOne({ name, nic });
        if (!employee) {
            return res.status(400).json({ error: "No employee found with the provided name and NIC" });
        }

        const newEmployeeLeave = new EmployeeLeave({
            name,
            nic,
            jobrole,
            leaveType,
            leaveFrom,
            leaveTo,
            leaveStatus
        });

        await newEmployeeLeave.save();
        res.json("New Employee Leave added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add new employee leave" });
    }
});

// Route to fetch all employee leave data
router.route("/").get((req, res) => {
    EmployeeLeave.find()
        .then((employeeLeave) => {
            res.json(employeeLeave);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch employee leave data" });
        });
});

// Route to update employee leave by ID
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { name, nic, jobrole, leaveType, leaveFrom, leaveTo, leaveStatus } = req.body;

    const updateEmployeeLeave = {
        name,
        nic,
        jobrole,
        leaveType,
        leaveFrom,
        leaveTo,
        leaveStatus
    };

    try {
        await EmployeeLeave.findByIdAndUpdate(userId, updateEmployeeLeave);
        res.status(200).send({ status: "Leave updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating Leave data" });
    }
});

// Route to delete employee leave by ID
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await EmployeeLeave.findByIdAndDelete(userId);
        res.status(200).send({ status: "Leave deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete leave", error: err.message });
    }
});

// Route to fetch employee leave by ID
router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const employeeLeave = await EmployeeLeave.findById(userId);
        res.status(200).send({ status: "Leave fetched", employeeLeave });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetch Leave", error: err.message });
    }
});

// Route to generate employee leave report
router.route("/report").get(async (req, res) => {
    try {
        const { leaveFrom, leaveTo, leaveType } = req.query;

        // Perform any necessary validation
        let query = {
            leaveFrom: { $gte: new Date(leaveFrom) },
            leaveTo: { $lte: new Date(leaveTo) }
        };

        if (leaveType && leaveType !== '') {
            query.leaveType = leaveType;
        }

        const leaveData = await EmployeeLeave.find(query);

        res.json(leaveData);
    } catch (error) {
        console.error('Error generating leave report:', error);
        res.status(500).json({ error: 'Error generating leave report' });
    }
});


module.exports = router;
