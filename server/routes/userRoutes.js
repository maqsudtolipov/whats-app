const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/isLoggedIn', authController.protect, authController.isLoggedIn);
router.get('/logOut', authController.logOut);

router.get('/', authController.protect, userController.getUsers);

module.exports = router;
