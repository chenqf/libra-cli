'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAll = undefined;

var _constants = require('./constants');

var _ini = require('ini');

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exits = (0, _util.promisify)(_fs2.default.exists);
const readFile = (0, _util.promisify)(_fs2.default.readFile);

const getAll = exports.getAll = async () => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        return opts;
    }
    return {
        git: {
            registry: {
                array: ['chenqf/vue-design']
            }
        }
    };
};