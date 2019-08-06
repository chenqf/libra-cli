'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./constants');

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 修改控制台输出内容样式


// 一个实际例子：https://github.com/YvetteLau/Blog/tree/master/eos-cli


_commander2.default.command('init').description('generate a new project from a template').alias('i') //别名
.action(() => {
    (0, _init2.default)(...process.argv.slice(3));
});

_commander2.default.command('config').description('config .libra').alias('cfg') //别名
.action(() => {
    apply('config', ...process.argv.slice(3));
});

function help() {
    console.log('\r\nUsage:');
    console.log('  - ' + 'libra init templateName projectName');
    console.log('\r');
}

_commander2.default.usage('<command> [options]');

_commander2.default.on('-h', help);
_commander2.default.on('--help', help);

_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv);

// libra 不带参数时
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp(function (txt) {
        return _chalk2.default.green(txt);
    });
}