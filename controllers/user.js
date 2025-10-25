import User from '../models/user.js'; 

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });  
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });  
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { name, email, password },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const ispassMatch = password === user.password;
    if (!ispassMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
