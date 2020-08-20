'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
    // connect to a database if needed, then pass it to `callback`:
    return _util2.default.mongoose.connect(_util2.default.cfg.dbUrl);
};
//# sourceMappingURL=db.js.map