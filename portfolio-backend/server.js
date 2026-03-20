const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const projectRoutes = require("./routes/projectRoutes");
const expRoutes = require("./routes/expRoute");
const userRoute = require("./routes/userRoute");
const resumeRoutes = require("./routes/resumeRoutes");
const contactRouter = require("./controllers/contact");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message:
    "Too many contact form submissions from this IP, please try again later.",
});
connectDB();

const app = express();

const allowedOrigins = [
  "https://sayarsamanta.dev",
  "https://www.sayarsamanta.dev",
  "http://localhost:5173",
];
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, local dev)
      if (!origin) return callback(null, true);

      // Allow localhost ports automatically
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(limiter);
app.disable("x-powered-by");
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", expRoutes);
app.use("/api/user", userRoute);
app.use("/api", resumeRoutes);
app.use("/api/contact", limiter, contactRouter);
app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.listen(PORT, () => {
  console.debug("running");
});
