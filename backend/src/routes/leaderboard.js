const express = require('express');

const router = express.Router();
const leaderboardController = require('../controllers/leaderboard-controller');

router.post('/', leaderboardController.leaderboard);


module.exports = router;
