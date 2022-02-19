const express = require('express');

const router = express.Router();
const restrict = require('../middlewares/restrict');

const update = require('../controller/edit');

router.put('/update', restrict, update.edit);

module.exports = router;
