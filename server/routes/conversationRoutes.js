const express = require('express');
const conversationController = require('../controllers/conversationController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, conversationController.createConversation);

router.route('/:id').get(conversationController.getConversation);

module.exports = router;
