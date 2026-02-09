require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/recipebox")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/recipes", require("./routes/recipe"));
app.use("/api/comments", require("./routes/comment"));
app.use("/api/users", require("./routes/user"));
app.use("/api/ingredients", require("./routes/ingredient"));
app.use("/api/recipesteps", require("./routes/recipestep"));

app.listen(5555, () => {
  console.log("Server running at http://localhost:5555");
});
