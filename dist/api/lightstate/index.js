'use strict';

var _util = require('../../lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _util2.default.routerInstance();
var srvc = new (require('./service'))(require('./model'));

var ctrl = new _util2.default.baseController(srvc, 'lightstates');

router.post('/', ctrl.create());

router.post('/search', ctrl.search());

router.get('/:id', ctrl.findById());

module.exports = router;
//# sourceMappingURL=index.js.map