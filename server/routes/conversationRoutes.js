const express = require('express');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.route('/').post(conversationController.createConversation);

router.route('/:id').get(conversationController.getConversation);

module.exports = router;
