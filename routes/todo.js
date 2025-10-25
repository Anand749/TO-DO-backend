import express from "express";
import { createTodo,getTodos,updateTodo,deleteTodo} from "../controllers/todo.js";

const router = express.Router();

router.post("/create", createTodo);
router.get("/getall", getTodos);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
