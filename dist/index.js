'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _lightstate = require('./api/lightstate');

var _lightstate2 = _interopRequireDefault(_lightstate);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import morgan from 'morgan';

app.server = _http2.default.createServer(app);

// logger
// app.use(morgan('dev'));

// 3rd party middleware
app.use((0, _cors2.default)({
    exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyLimit
}));

// connect to db
(0, _db2.default)(function (db) {
    // api router
    app.use('/api/lightstates/', (0, _lightstate2.default)());

    app.server.listen(process.env.PORT || _config2.default.port, function () {
        console.log('Started on port ' + app.server.address().port);
    });
});

exports.default = app;
//# sourceMappingURL=index.js.map