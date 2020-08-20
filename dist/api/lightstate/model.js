'use strict';

var _util = require('../../lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ltSchema = _util2.default.modelFactory.createModel({
    struct: {
        tstamp: {
            type: _util2.default.mongoose.Schema.Types.Number,
            unique: true,
            required: true,
            index: true
        },
        lId: {
            type: _util2.default.mongoose.Schema.Types.Number,
            required: true,
            index: true
        },
        newState: {
            type: _util2.default.mongoose.Schema.Types.Number,
            required: true
        },
        mdata: {
            type: _util2.default.mongoose.Schema.Types.Object,
            id: false,
            _id: false
        }
    },
    type: 'lightstate'
});

module.exports = _util2.default.mongoose.model('Lightstate', ltSchema);
//# sourceMappingURL=model.js.map