'use strict';

import __ from '../../lib/util';

const validLights = ['north', 'east', 'south', 'west'],
    validState = ['red', 'green']
module.exports = class LightStateService extends __.baseService {
    constructor(model) {
        super(model);
    }

    async _create(json) {
        const lId = __._.toLower(__._.trim(json.lightId)),
            nState = __._.toLower(__._.trim(json.newState))
        if (!validLights.includes(lId) || !validState.includes(nState))
            return __.promise.reject({ err: 'Invalid lightId or newState : ' + __.jStr(json) })

        json.tStamp = __.momentTZ().tz("America/Los_Angeles").valueOf();
        json.newState = __._.findIndex(validState, o => o === nState)
        json.lightId = __._.findIndex(validLights, o => o === lId)

        const lastLg = await this.model.find().sort({ tStamp: -1 }).limit(1) || {}
        console.log("lastLog : ", __.jStr(lastLg))
        if (!__._.isEmpty(lastLg)) {
            __._.set(json, 'meta.currState', __._.get(lastLg[0], 'meta.currState', {}));
            json.meta.currState[__._.parseInt(lastLg[0].lightId)] = __._.parseInt(lastLg[0].newState);
        }
        return this.model.create(new this.model(json)).then(entry => {
            return entry;
        })
    }

    async search(json) {
        let qType = __._.toLower(json.query.type)
        switch (qType) {
            case 'malfunction':
                {
                    if (!__._.get(json, 'query.startTime'))
                        return __.promise.reject({ err: 'query.startTime missing' })
                    if (!__._.get(json, 'query.endTime'))
                        return __.promise.reject({ err: 'query.endTime missing' })
                    const tStart = __.momentTZ(json.query.startTime).tz("America/Los_Angeles").valueOf(),
                        tEnd = __.momentTZ(json.query.endTime).tz("America/Los_Angeles").valueOf()

                    const logs = await this.model.find({ tStamp: { $gte: tStart, $lte: tEnd } }).sort({ tStamp: 1 }) || {}
                    let result = { 0: [], 1: [], 2: [], 3: [] }
                    for (let l of logs) {
                        let cS = __._.get(l, 'meta.currState', {}),
                            wStates = [], //wrong states
                            cStates = [] // states fixed
                        cS[l.lightId] = __._.parseInt(l.newState)
                        if (__._.isNil(cS["0"]) || __._.isNil(cS["2"]) || (cS["0"] !== (cS["2"] | 0))) {
                            if (!__._.isNil(cS["1"]) && !__._.isNil(cS["3"]) && (cS["1"] === cS["3"])) {
                                if (!__._.isNil(cS["0"]) && (cS["0"] === (!cS["1"] | 0))) wStates.push(2)
                                else wStates.push(0)
                            } else wStates.push(...[0, 2])
                        } else if (!__._.isNil(cS["2"]) && (cS["1"] === cS["2"]) && (cS["1"] === cS["3"])) // same state for all
                            wStates.push(...[0, 2])
                        else cStates.push(...[0, 2])

                        if (__._.isNil(cS["1"]) || __._.isNil(cS["3"]) || (cS["1"] !== (cS["3"] | 0))) {
                            if (!__._.isNil(cS["0"]) && !__._.isNil(cS["2"]) && (cS["0"] === cS["2"])) {
                                if (!__._.isNil(cS["1"]) && (cS["1"] === (!cS["0"] | 0))) wStates.push(3)
                                else wStates.push(1)
                            } else wStates.push(...[1, 3])
                        } else cStates.push(...[1, 3])

                        for (let i of wStates) {
                            if (!__._.last(result[i]) || __._.last(result[i]).endTime)
                                result[i].push({
                                    startTime: l.tStamp,
                                    invalidState: validState[cS['' + i]]
                                })
                        }

                        for (let i of cStates) {
                            if (__._.last(result[i]) && !__._.last(result[i]).endTime)
                                __._.last(result[i]).endTime = l.tStamp
                        }
                    }

                    let fResult = {} // Pretty print
                    for (let k in result) {
                        fResult[validLights[__._.parseInt(k)]] = []
                        for (let lg of result[k]) {
                            let fLg = {}
                            if (lg.startTime) fLg.startTime = __.momentTZ(lg.startTime).tz("America/Los_Angeles").format();
                            if (lg.endTime) fLg.endTime = __.momentTZ(lg.endTime).tz("America/Los_Angeles").format();
                            fLg.invalidState = lg.invalidState
                            fResult[validLights[__._.parseInt(k)]].push(fLg)
                        }
                    }
                    return fResult
                        //return result
                    break;
                }
            default:
                {
                    __.promise.reject({ err: 'Only "' + qType + '" query type is supported' })
                    break;
                }
        }
    }

}