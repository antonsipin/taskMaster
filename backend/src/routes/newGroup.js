const express = require('express');

const router = express.Router();
const newGroupController = require('../controllers/newGroup-controller');

router.post('/', newGroupController.addNewGroup);

module.exports = router;
