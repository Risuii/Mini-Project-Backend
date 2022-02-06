const express = require('express');

const router = express.Router();
const restrict = require('../middlewares/restrict');

const delet = require('../controller/delet');

router.get('/delet', restrict, delet.delet);

module.exports = router;
