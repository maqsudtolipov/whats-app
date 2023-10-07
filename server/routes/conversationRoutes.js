const express = require('express');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.post('/', conversationController.createConversation);

module.exports = router;
