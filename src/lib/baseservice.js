'use strict';

import __ from './util';

module.exports = class BaseService {
    constructor(model) {
        this.model = model
    }
    search(search) {
        search.sort = {
            tStamp: -1
        }
        return this._search(search)
    }

    _search(search) {
        return this.model.search(search).then(res => {
            return res && res.records ? res.records : res
        })
    }

    findById(id) {
        return this.model.findById({ _id: id }).then(resp => {
            return __._.isArray(resp) ? resp[0] : resp;
        })
    }

    create(json) {
        json = __._.isString(json) ? JSON.parse(json) : json;
        return this._create(json)
    }

    _create(json) {
        return this.model.create(new this.model(json))
    }
}