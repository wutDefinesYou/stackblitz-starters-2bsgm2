const express = require('express');
const router = express.Router();
const { join, resolve } = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
