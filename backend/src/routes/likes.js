const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes-controller');

router.post('/', likesController.addLike);

module.exports = router;
