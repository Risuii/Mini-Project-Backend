const express = require('express');

const router = express.Router();
const restrict = require('../middlewares/restrict');

const update = require('../controller/edit');

router.post('/update', restrict, update.edit);

module.exports = router;
