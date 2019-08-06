'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

const version = '1.0.0';

//当前 package.json 的版本号
const VERSION = exports.VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

// 配置文件目录
const RC = exports.RC = `${HOME}/.libra`;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://api.github.com/${type}/${registry}/repos