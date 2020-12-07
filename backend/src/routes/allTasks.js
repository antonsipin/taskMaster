const express = require('express');

const router = express.Router();
const allTasksController = require('../controllers/allTasks-cosntroller');

router.post('/', allTasksController.allTasks);


module.exports = router;
