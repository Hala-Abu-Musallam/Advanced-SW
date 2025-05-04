const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/signup
// @desc    Register user and return token
// @access  Public
router.post('/signup', authController.signup);

module.exports = router;
