import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 characters!"],
    maxLength: [30, "Title cannot exceed 30 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
    minLength: [30, "Description must contain at least 30 characters!"],
    maxLength: [500, "Description cannot exceed 500 characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [10, "Location must contain at least 10 characters!"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
