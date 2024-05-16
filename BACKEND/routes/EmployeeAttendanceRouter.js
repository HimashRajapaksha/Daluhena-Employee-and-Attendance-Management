const router = require("express").Router();
const EmployeeAttendance = require("../models/EmployeeAttendance");

// Add new attendance record
router.route("/add").post(async (req, res) => {
  try {
    const attendanceData = req.body.map(({ _id, ...rest }) => rest);
    await EmployeeAttendance.insertMany(attendanceData);
    res.json("Employee attendance added");
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Error saving attendance" });
  }
});

// Fetch all attendance records
router.route("/").get(async (req, res) => {
  try {
    const allAttendanceRecords = await EmployeeAttendance.find();
    res.json(allAttendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ error: "Error fetching attendance records" });
  }
});

// Generate employee attendance report
router.route("/report").get(async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const queryDate = new Date(date);

    const attendanceReport = await EmployeeAttendance.find({
      date: {
        $gte: queryDate,
        $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (attendanceReport.length === 0) {
      return res.json({ message: "No attendance records found for the specified date" });
    }

    res.json(attendanceReport);
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ error: "Error generating attendance report" });
  }
});

// Route to fetch attendance count for the current date
router.get('/attendance-count', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to beginning of the day

    const presentCount = await EmployeeAttendance.countDocuments({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
      attendance: 'present'
    });
    const absentCount = await EmployeeAttendance.countDocuments({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
      attendance: 'absent'
    });

    res.json({ presentCount, absentCount });
  } catch (error) {
    console.error('Error fetching attendance count:', error);
    res.status(500).json({ error: 'Error fetching attendance count' });
  }
});

// Fetch a specific attendance record by ID
router.route("/:id").get(async (req, res) => {
  const attendanceId = req.params.id;

  try {
    const attendanceRecord = await EmployeeAttendance.findById(attendanceId);
    res.json(attendanceRecord);
  } catch (error) {
    console.error("Error fetching attendance record:", error);
    res.status(500).json({ error: "Error fetching attendance record" });
  }
});

// Update a specific attendance record by ID
router.route("/update/:id").put(async (req, res) => {
  const attendanceId = req.params.id;
  const updatedData = req.body;

  try {
    await EmployeeAttendance.findByIdAndUpdate(attendanceId, updatedData);
    res.json("Attendance record updated");
  } catch (error) {
    console.error("Error updating attendance record:", error);
    res.status(500).json({ error: "Error updating attendance record" });
  }
});

// Delete a specific attendance record by ID
router.route("/delete/:id").delete(async (req, res) => {
  const attendanceId = req.params.id;

  try {
    await EmployeeAttendance.findByIdAndDelete(attendanceId);
    res.json("Attendance record deleted");
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res.status(500).json({ error: "Error deleting attendance record" });
  }
});

module.exports = router;
