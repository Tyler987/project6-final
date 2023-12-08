const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const path = require("path");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect("mongodb+srv://tylerkorth12:Harpswell0!@tyler.mfrtbgb.mongodb.net/")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const reviewSchema = new mongoose.Schema({
  name: String,
  description: String,
  complaints: [String],
  img: String,
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
app.get("/api/Reviews", (req, res) => {
    getReviews(res);
  });
const getReviews = async (res, id) => {
    // const workout = Workout.findOne({_id: id });
    const reviews = await Review.find();
    res.send(reviews);
};

app.post("/api/Reviews", upload.single("img"), (req, res) => {
    const result = validateReview(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const review = new Review({
        name: req.body.name,
        description: req.body.description,
        complaints: req.body.complaints.split(","),
      });
    
      if (req.file) {
        review.img = "images/" + req.file.filename;
      }
    
      createReview(res, review);
    });
const createReview = async (res, review) => {
    const result = await review.save();
    res.send(review);
};

app.put("/api/reviews/:id", upload.single("img"), (req, res) => {
        const result = validateReview(req.body);
      
        if (result.error) {
          res.status(400).send(result.error.details[0].message);
          return;
        }
      
        updateReview(req, res);
      });

      const updateReview = async (req, res) => {
        let fieldsToUpdate = {
          name: req.body.name,
          description: req.body.description,
          complaints: req.body.complaints.split(","),
        };
      
        if (req.file) {
          fieldsToUpdate.img = "images/" + req.file.filename;
        }
      
        const result = await Review.updateOne({ _id: req.params.id }, fieldsToUpdate);
        const review = await Review.findById(req.params.id);
        res.send(review);
      };
      
      app.delete("/api/reviews/:id", upload.single("img"), (req, res) => {
        removeReview(res, req.params.id);
      });
      
      const removeReview = async (res, id) => {
        const review = await Review.findByIdAndDelete(id);
        res.send(review);
      };
      
      const validateReview = (review) => {
        const schema = Joi.object({
          _id: Joi.allow(""),
          complaints: Joi.allow(""),
          name: Joi.string().min(3).required(),
          description: Joi.string().min(3).required(),
        });
      
        return schema.validate(review);
      };
      
      app.listen(3000, () => {
        console.log("I'm listening");
      });