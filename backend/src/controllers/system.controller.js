const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { systemService } = require('../services');

const getInfo = catchAsync(async (req, res) => {
    const result = {
        'cpu': await systemService.getCPUInfo(),
        'memory': await systemService.getMemoryInfo(),
        'disks': await systemService.getDisksInfo(),
        'network': await systemService.getNetworkInfo()
    }
    res.json(result);
});

const getCPUInfo = catchAsync(async (req, res) => {
    const result = await systemService.getCPUInfo();
    res.json(result);
});

module.exports = {
    getInfo,
    getCPUInfo,
} 