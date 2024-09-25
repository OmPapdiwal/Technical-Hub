require('dotenv').config();
// console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);

const express = require('express');
const app = express();
const cors = require('cors');
const connectdb = require('./utils/db');
const contactRoute = require('./router/contact-router');
const authRoute = require('./router/auth-router');
const serviceRoute = require('./router/service-router');
const router = require('./router/admin-router');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5002;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/", authRoute);
app.use("/",contactRoute);

app.use("/admin", router);


// Error handling middleware
app.use(errorMiddleware);

// Connect to database and start server
connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
});
