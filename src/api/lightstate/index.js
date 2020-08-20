'use strict';

import __ from '../../lib/util';

let router = __.routerInstance()
let srvc = new(require('./service'))(require('./model'));

let ctrl = new __.baseController(srvc, 'lightstates')

router.post('/logs',
    ctrl.exec({
        params: [{ path: 'body' }],
        validations: [{
            path: 'body.lightId'
        }, {
            path: 'body.newState'
        }],
        opName: 'create'
    }));

router.post('/logs/search', ctrl.exec({
    params: [{
        path: 'body'
    }],
    validations: [{
        path: 'body.query.type'
    }],
    opName: 'search'
}));

router.get('/logs/:id', ctrl.findById());

module.exports = router;