const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require('../controllers/authController');

// Define the routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', updateProfile); 

module.exports = router;
