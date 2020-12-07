const express = require('express');

const router = express.Router();
const getTasksController = require('../controllers/getTasks-controller');

router.post('/', getTasksController.groupTasks);


module.exports = router;
