import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';
import bodyParser from 'body-parser';
const app = express();

dotenv.config({ path: './config.env' });
connectDb();

//midddleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);  // http://localhost:8080/api/v1/todo/create   /todos

const port= process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});