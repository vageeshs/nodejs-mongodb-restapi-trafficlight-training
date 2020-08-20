'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file');

var logger = winston.createLogger({
    level: 'info',
    transports: [new DailyRotateFile({
        level: 'info',
        filename: 'srvr-',
        dirname: _config2.default.logDir,
        datePattern: _config2.default.logRotateDateFormat + ".log",
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        // maxsize: 5242880, //5MB
        // maxFiles: 5,
        colorize: false
    }), new winston.transports.Console({
        level: 'debug',
        // handleExceptions: true,
        json: false,
        colorize: true
    })]
});

var promise = require('bluebird');
var util = {
    m: require('moment'),
    momentTZ: require('moment-timezone'),
    promise: promise,
    unDefined: function unDefined(val) {
        return !val || val == 'undefined';
    },
    mongoose: promise.promisifyAll(require('mongoose')),
    _: require('lodash'),
    routerInstance: function routerInstance() {
        return new require('express').Router();
    },
    cfg: _config2.default,
    logger: logger,
    baseController: require('./basecontroller'),
    modelFactory: require('./modelfactory'),
    baseService: require('./baseservice')
};

exports.default = util;
//# sourceMappingURL=util.js.map