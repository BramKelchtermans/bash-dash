const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { systemService } = require('../services');
const { Op } = require('sequelize');
const SystemInformation = require('../database/models').SystemInformation;

const getInfo = catchAsync(async (req, res) => {
    const result = await systemService.getSystemInfo();
    res.json(result);
});

const getCPUInfo = catchAsync(async (req, res) => {
    const result = await systemService.getCPUInfo();
    res.json(result);
});

const getSystemInfoHistory = catchAsync(async (req, res) => {
    console.log("Here we go")
    const moment = require('moment');
    const result = await SystemInformation.findAndCountAll({
        where: {
            createdAt: {
                [Op.gte]: moment().subtract(2, 'hours').toDate()
            }
        }
    })

    res.json(result);
});

module.exports = {
    getInfo,
    getCPUInfo,
    getSystemInfoHistory,
} 