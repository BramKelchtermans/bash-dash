const express = require('express');
const systemController = require('../controllers/system.controller')
const router = express.Router();

const HistoryRoutes = () => {
    const _router = express.Router();

    _router
        .route('/')
        .get(systemController.getSystemInfoHistory);
    
    return _router;
}


router
    .route('/')
    .get(systemController.getInfo);

router
    .route('/cpu')
    .get(systemController.getCPUInfo);

router
    .route('/history')
    .get(systemController.getSystemInfoHistory);

// router.use('/history', HistoryRoutes);


module.exports = router;
