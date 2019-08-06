'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = exports.downloadLocal = async (registry, projectName) => {
    let api = `github:${registry}`;
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(api, projectName, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

/**
 * 
 * 
    [git]
    user = dbuser
    password = dbpassword

    [git.registry]
    array[] = chenqf/vue-design
    array[] = chenqf/2
    array[] = chenqf/3
 * 
 */