const express = require('express');
const directMessageController = require('../controllers/directMessageController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/:id', authController.protect, directMessageController.sendDM);

module.exports = router;
