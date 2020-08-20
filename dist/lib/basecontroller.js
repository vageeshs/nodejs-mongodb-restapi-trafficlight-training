'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function BaseController(service, entity) {
        _classCallCheck(this, BaseController);

        this.service = service;
        this.entity = entity;
    }

    _createClass(BaseController, [{
        key: 'exec',
        value: function exec(meta) {
            var _this = this;

            return function (req, res, next) {
                var _service;

                if (meta.validations) _util2.default._.keys(meta.validations, function (k) {
                    if (_util2.default.unDefined(_util2.default._.get(req, k))) return res.status(404).send({
                        errCode: '000',
                        errMsg: req[k] && req[k].errMsg ? req[k].errMsg : "Invalid value for path : " + k
                    });
                });

                var inParams = [],
                    logParams = {};
                if (meta.params) {
                    _util2.default._.each(meta.params, function (k) {
                        var v = k.path ? _util2.default._.get(req, k.path) : k.value;
                        if (_util2.default.unDefined(v) && !k.optional) return res.status(404).send({
                            errCode: '000',
                            errMsg: "Invalid value for path : " + k.path
                        });
                        inParams.push(k.type === 'array' ? _util2.default._.isArray(v) ? v : [v] : v);
                        logParams[k.path] = k.path === 'user' && v ? v.email : v;
                    });
                }

                var p = meta.opName ? (_service = _this.service)[meta.opName].apply(_service, inParams) : _util2.default.promise.resolve(true);
                p.then(function (result) {
                    if (meta.callback) result = meta.callback(req, res, result);
                    meta.log && _util2.default.logger.info("--- API success " + req.originalUrl + " : " + _util2.default.jStr({
                        op: meta.opName,
                        params: logParams
                    }));
                    return !result ? res.status(404).end() : res.json(result);
                }, function (err) {
                    meta.log && _util2.default.logger.info("--- API fail " + req.originalUrl + " : " + _util2.default.jStr({
                        op: meta.opName,
                        params: logParams,
                        err: err
                    }));
                    return next(err);
                });
            };
        }
    }, {
        key: 'findById',
        value: function findById() {
            return this.exec({
                params: [{ path: 'params.id' }],
                opName: 'findById'
            });
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            return this.exec({
                params: [{ path: 'body' }],
                opName: 'create',
                log: true,
                callback: function callback(req, res, result) {
                    res.set('Location', '/' + _this2.entity + '/' + result.id);
                    return result;
                }
            });
        }
    }, {
        key: 'search',
        value: function search() {
            return this.exec({
                validations: {
                    'body.query': {
                        errMsg: 'query criteria missing'
                    }
                },
                params: [{ path: 'body' }],
                opName: 'search',
                log: true
            });
        }
    }]);

    return BaseController;
}();
//# sourceMappingURL=basecontroller.js.map