const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account-controller');

router.post('/', accountController.account);

module.exports = router;
