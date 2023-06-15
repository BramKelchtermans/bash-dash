const express = require('express');
const systemController = require('../controllers/system.controller')
const router = express.Router();

router
    .route('/')
    .get(systemController.getInfo);

router
    .route('/disks')
    .get(systemController.getCPUInfo);

module.exports = router;