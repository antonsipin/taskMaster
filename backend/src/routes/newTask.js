const express = require('express');

const router = express.Router();
const newTaskController = require('../controllers/newTask-controller');

router.post('/', newTaskController.addNewTask);

module.exports = router;
