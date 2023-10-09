const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

router.get('/', userController.getUsers);

module.exports = router;
