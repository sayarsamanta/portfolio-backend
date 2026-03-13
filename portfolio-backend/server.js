const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const projectRoutes = require("./routes/projectRoutes");
const expRoutes = require("./routes/expRoute");
const userRoute = require("./routes/userRoute");
const resumeRoutes = require("./routes/resumeRoutes");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", expRoutes);
app.use("/api/user", userRoute);
app.use("/api", resumeRoutes);
app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.listen(5174, () => {
  console.log(`Server running on port ${5174}`);
  console.log(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
});
