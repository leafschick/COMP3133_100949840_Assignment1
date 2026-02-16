const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  salary: { type: Number, required: true },
  designation: { type: String },
  department: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
