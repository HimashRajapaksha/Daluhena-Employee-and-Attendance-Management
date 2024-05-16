const router = require("express").Router();
const Employee = require("../models/Employee");


// Route to add a new employee
router.route("/add").post((req, res) => {
    const { name, nic, email, contactNumber, gender, age, address, jobrole, qualifications } = req.body;

    const newEmployee = new Employee({
        name,
        nic,
        email: email || null,
        contactNumber,
        gender,
        age,
        address,
        jobrole,
        qualifications
    });

    newEmployee.save()
        .then(() => {
            res.json("New Employee added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to add new employee" });
        });
});

// Route to get all employees
router.route("/").get((req, res) => {
    Employee.find()
        .then((employees) => {
            res.json(employees);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch employees" });
        });
});

// Route to get count of all employees
router.route("/count").get(async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error('Error counting employees:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to get count of employees by job role
router.route("/jobrole-count").get(async (req, res) => {
    try {
        const jobRoles = await Employee.aggregate([
            { $group: { _id: "$jobrole", count: { $sum: 1 } } }
        ]);
        res.json(jobRoles);
    } catch (err) {
        console.error('Error counting employees by job role:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an employee
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { name, nic, email, contactNumber, gender, age, address, jobrole, qualifications } = req.body;

    const updateEmployee = {
        name,
        nic,
        email,
        contactNumber,
        gender,
        age,
        address,
        jobrole,
        qualifications
    };

    try {
        await Employee.findByIdAndUpdate(userId, updateEmployee);
        res.status(200).json({ status: "User updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with updating data" });
    }
});

// Route to delete an employee
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await Employee.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error with delete user" });
    }
});

// Route to get details of a specific employee
router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const employee = await Employee.findById(userId);
        res.status(200).json({ status: "User fetched", employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error with fetch user" });
    }
});


module.exports = router;