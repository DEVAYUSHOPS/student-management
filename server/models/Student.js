const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  course: String,
  year: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Student", StudentSchema);
