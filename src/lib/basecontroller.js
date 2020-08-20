'use strict';

import __ from './util';

module.exports = class BaseController {
    constructor(service, entity) {
        this.service = service
        this.entity = entity
    }

    exec(meta) {
        return (req, res, next) => {
            if (meta.validations)
                __._.keys(meta.validations, k => {
                    if (__.unDefined(__._.get(req, k)))
                        return res.status(404).send({
                            errCode: '000',
                            errMsg: (req[k] && req[k].errMsg) ? req[k].errMsg : ("Invalid value for path : " + k)
                        });
                })

            let inParams = [],
                logParams = {};
            if (meta.params) {
                __._.each(meta.params, k => {
                    console.log(k.path, __.jStr(__._.get(req, k.path)))
                    const v = k.path ? __._.get(req, k.path) : k.value
                    if (__.unDefined(v) && !k.optional)
                        return res.status(404).send({
                            errCode: '000',
                            errMsg: ("Invalid value for path : " + k.path)
                        });
                    inParams.push(k.type === 'array' ? (__._.isArray(v) ? v : [v]) : v)
                    logParams[k.path] = ((k.path === 'user') && v) ? v.email : v
                })
            }

            let p = meta.opName ? this.service[meta.opName](...inParams) : __.promise.resolve(true)
            p.then(result => {
                if (meta.callback) result = meta.callback(req, res, result)
                meta.log && __.logger.info("--- API success " + req.originalUrl + " : " + __.jStr({
                    op: meta.opName,
                    params: logParams
                }))
                return !result ? res.status(404).end() : res.json(result);
            }, err => {
                meta.log && __.logger.info("--- API fail " + req.originalUrl + " : " + __.jStr({
                    op: meta.opName,
                    params: logParams,
                    err: err
                }))
                console.log("returning error : ", err)
                return res.status(403).json(err);
            })
        }
    }
    findById() {
        return this.exec({
            params: [{ path: 'params.id' }],
            opName: 'findById'
        })
    }

    create() {
        return this.exec({
            params: [{ path: 'body' }],
            opName: 'create',
            log: true,
            callback: (req, res, result) => {
                res.set('Location', '/' + this.entity + '/' + result.id);
                return result;
            }
        })
    }

    search() {
        return this.exec({
            validations: {
                'body.query': {
                    errMsg: 'query criteria missing'
                }
            },
            params: [{ path: 'body' }],
            opName: 'search',
            log: true
        })
    }
}