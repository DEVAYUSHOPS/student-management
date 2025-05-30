const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Student = require("../models/Student");

// Get all students (admin only)
router.get("/", auth, role("admin"), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Get own students (user)
router.get("/my", auth, role("user"), async (req, res) => {
  const students = await Student.find({ createdBy: req.user.id });
  res.json(students);
});

// Create student (admin or user)
router.post("/", auth, async (req, res) => {
  const { name, roll, course, year } = req.body;
  const student = new Student({
    name,
    roll,
    course,
    year,
    createdBy: req.user.id,
  });
  await student.save();
  res.json(student);
});

// Update student (admin only)
router.put("/:id", auth, role("admin"), async (req, res) => {
  const { name, roll, course, year } = req.body;
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name, roll, course, year },
    { new: true }
  );
  res.json(student);
});

// Delete student (admin only)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Student deleted" });
});

module.exports = router;
