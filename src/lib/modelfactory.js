'use strict';
import __ from './util';

module.exports.createModel = (ctx) => {
    let mSchema = new __.mongoose.Schema(ctx.struct, {
        minimize: __._.isNull(ctx.minimize) ? true : false
    });

    // To avoid conflic with elasticsearch _id
    mSchema.virtual('id').get(function() {
        return this._id.toHexString();
    });

    mSchema.options.toObject = ctx.toObject || {
        virtuals: true
    };
    mSchema.options.toJSON = ctx.toJSON || {
        virtuals: true
    };

    /** NOTE : findById will be from DB **/
    mSchema.statics.findById = id => {
        return this.findAsync({ _id: id }).then(result => {
            if (result && result.length > 0) return result;
            else return null;
        }, err => {
            __.logErr("DB fetch errored :" + __.jStr(query), err)
            throw err;
        });
    }

    mSchema.statics.create = entJ => {
        return entJ.saveAsync().then(entry => {
            return entry;
        }, err => {
            __.logErr("Entity save threw error, id : " + (entJ.id || entJ._id), err);
            throw err;
        });
    }

    return mSchema;
}