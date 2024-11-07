import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { pool } from './config/db.js';


dotenv.config();  // Load environment variables from .env

// Create Express app
const app = express();

// Use middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Define routes
app.use("/api/v1", testRoutes);
app.use("/api/v1/user",userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send('<h1>Hello, welcome!</h1>');
});

// Start the server
const PORT = process.env.PORT || 8080;  // Use PORT from environment variables or default to 8080

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.bgCyan.white);
});
