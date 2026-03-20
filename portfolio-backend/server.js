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

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, local dev)
      if (!origin) return callback(null, true);

      // Allow localhost ports automatically
      if (origin.startsWith("http://localhost")) return callback(null, true);

      // Allow production frontend
      if (origin === process.env.CLIENT_URL) return callback(null, true);

      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// app.use(cors());
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
