'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function BaseService(model) {
        _classCallCheck(this, BaseService);

        this.model = model;
    }

    _createClass(BaseService, [{
        key: 'search',
        value: function search(_search) {
            _search.sort = {
                tstamp: -1
            };
            return this._search(_search);
        }
    }, {
        key: '_search',
        value: function _search(search) {
            return this.model.search(search).then(function (res) {
                return res && res.records ? res.records : res;
            });
        }
    }, {
        key: 'findById',
        value: function findById(id) {
            return this.model.findById({ _id: id }).then(function (resp) {
                return _util2.default._.isArray(resp) ? resp[0] : resp;
            });
        }
    }, {
        key: 'create',
        value: function create(json) {
            json.createTime = json.createTime || Date.now();
            return this._create(json);
        }
    }, {
        key: '_create',
        value: function _create(json) {
            return this.model.create(new this.model(json));
        }
    }]);

    return BaseService;
}();
//# sourceMappingURL=baseservice.js.map