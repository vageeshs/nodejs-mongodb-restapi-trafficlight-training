'use strict';

import __ from '../../lib/util';

let ltSchema = __.modelFactory.createModel({
    struct: {
        tStamp: {
            type: __.mongoose.Schema.Types.Number,
            unique: true,
            required: true,
            index: true
        },
        lightId: {
            type: __.mongoose.Schema.Types.String,
            required: true,
            index: true,
            min: 1,
            max: 4
        },
        newState: {
            type: __.mongoose.Schema.Types.String,
            required: true,
            min: 0,
            max: 1
        },
        meta: {
            type: __.mongoose.Schema.Types.Object,
            id: false,
            _id: false
        }
    },
    type: 'lightstate'
});

ltSchema.statics.lastLog = async() => {
    return this.find().sort({ tStamp: -1 })
}
module.exports = __.mongoose.model('Lightstate', ltSchema);