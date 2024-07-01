const express = require('express');
const router = express.Router();
const { handleLogIn } = require('../../controllers/authController');

router.post('/', handleLogIn);

module.exports = router;
