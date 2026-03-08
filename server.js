const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/logger");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(cors());
app.use(express.json());

// logger middleware
app.use(logger);

// routes
app.use("/", courseRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});