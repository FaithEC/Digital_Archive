const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.updateProfile = async (req, res) => {
  console.log("Update request received for ID:", req.body.userId); // erorr for my terminal
  try {
    const { userId, fullName, email } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found in database for ID:", userId);
      return res.status(404).json({ message: 'User not found in database' });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    
    const updatedUser = await user.save();
    console.log("User updated successfully!");

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error); 
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


