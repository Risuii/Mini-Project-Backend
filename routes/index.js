// import express router
const express = require('express');

const router = express.Router();

// import router
const auth = require('./auth');
const update = require('./edit');
const read = require('./read');
const delet = require('./delet');

// routes list
router.use('/', auth);
router.use('/', update);
router.use('/', read);
router.use('/', delet);

module.exports = router;
