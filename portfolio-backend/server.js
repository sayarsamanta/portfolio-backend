const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const projectRoutes = require("./routes/projectRoutes");
const expRoutes = require("./routes/expRoute");
const userRoute = require("./routes/userRoute");
const resumeRoutes = require("./routes/resumeRoutes");
const contactRouter = require("./controllers/contact");
connectDB();

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", expRoutes);
app.use("/api/user", userRoute);
app.use("/api", resumeRoutes);
app.use("/api/contact", contactRouter);
app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.listen(PORT, () => {
  console.debug("running");
});
