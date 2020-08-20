'use strict';

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.createModel = function (ctx) {
    var mSchema = new _util2.default.mongoose.Schema(ctx.struct, {
        minimize: _util2.default._.isNull(ctx.minimize) ? true : false
    });

    // To avoid conflic with elasticsearch _id
    mSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    mSchema.options.toObject = ctx.toObject || {
        virtuals: true
    };
    mSchema.options.toJSON = ctx.toJSON || {
        virtuals: true
    };

    /** NOTE : findById will be from DB **/
    mSchema.statics.findById = function (id) {
        return this.findAsync({ _id: id }).then(function (result) {
            if (result && result.length > 0) return result;else return null;
        }, function (err) {
            _util2.default.logErr("DB fetch errored :" + _util2.default.jStr(query), err);
            throw err;
        });
    };

    mSchema.statics.create = function (entJ) {
        return undefined.saveAsync().then(function (entJ) {
            return entJ;
        }, function (err) {
            _util2.default.logErr("Entity save threw error, id : " + (model.id || model._id), err);
            throw err;
        });
    };

    return mSchema;
};
//# sourceMappingURL=modelfactory.js.map