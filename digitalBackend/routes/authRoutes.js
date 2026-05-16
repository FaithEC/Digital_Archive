const express = require('express');
const router = express.Router();
// Import the functions from your controller
const { registerUser, loginUser, updateProfile } = require('../controllers/authController');

// Define the routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', updateProfile); // <--- Add this line

module.exports = router;
