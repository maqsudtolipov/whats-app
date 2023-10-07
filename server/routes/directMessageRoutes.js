const express = require('express');
const directMessageController = require('../controllers/directMessageController');

const router = express.Router();

router.post('/:id', directMessageController.sendDM);

module.exports = router;
