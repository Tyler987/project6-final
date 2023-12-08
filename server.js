const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const path = require("path"); // Added the path module
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect("mongodb+srv://tylerkorth12:Harpswell0!@tyler.mfrtbgb.mongodb.net/")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const reviewSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: { type: Date, default: Date.now }

});

const Review = mongoose.model("Review", reviewSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/classes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "classes.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/membership", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "membership.html"));
});

app.get("/qa", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "qa.html"));
});

app.get("/review", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "review.html"));
});

app.get("/trainers", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "trainers.html"));
});

app.get("/training", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "training.html"));
});

app.get("/api/reviews", (req, res) => {
  getLatestReview(res);
});

const getLatestReview = async (res) => {
  const review = await Review.findOne().sort({ date: -1 });
  res.send(review);
};

app.post("/api/reviews", (req, res) => {
  const result = validateReview(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const review = new Review({
    name: req.body.name,
    description: req.body.description
  });

  createReview(res, review);
});

const createReview = async (res, review) => {
  await Review.deleteMany(); // Remove all existing reviews
  const result = await review.save();
  res.send(review);
};

const validateReview = (review) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(review);
};

app.listen(3000, () => {
  console.log("I'm listening");
});