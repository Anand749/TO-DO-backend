import todo from "../models/todo.js";

export const  createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTodo = new todo({ title, description });  
    await newTodo.save();
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await todo.find();
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTodo = async (req, res) => {
try {
  const { id } = req.params;
  const { title, description } = req.body;  
  const updatedTodo = await todo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  if (!updatedTodo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    todo: updatedTodo,
  });
} catch (error) {
  console.log("error:", error);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
} 