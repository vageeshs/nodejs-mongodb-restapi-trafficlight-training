'use strict';

import cfg from '../config.json';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const lgr = winston.createLogger({
    level: 'info',
    transports: [new DailyRotateFile({
            level: 'info',
            filename: 'srvr-',
            dirname: cfg.logDir,
            datePattern: cfg.logRotateDateFormat + ".log",
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            // maxsize: 5242880, //5MB
            // maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            // handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

const promise = require('bluebird');
let util = {
    m: require('moment'),
    momentTZ: require('moment-timezone'),
    promise: promise,
    unDefined: (val) => { return (!val || (val == 'undefined')); },
    mongoose: promise.promisifyAll(require('mongoose')),
    _: require('lodash'),
    routerInstance: () => {
        return new require('express').Router()
    },
    jStr: JSON.stringify,
    cfg: cfg,
    logger: lgr,
    logErr: (msg, err) => { lgr.error(msg, err) },
    logInf: (m, d) => { lgr.info(m, d) },
    baseController: require('./basecontroller'),
    modelFactory: require('./modelfactory'),
    baseService: require('./baseservice')
}

export default util;