'use strict';

var _get = require('./get');

var _rc = require('./rc');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 命令行工具


// 下载进度条
const updatePackage = function (projectName, answer) {
    let {
        description,
        author,
        version
    } = answer;
    const fileName = `${projectName}/package.json`;
    if (_fs2.default.existsSync(fileName)) {
        const data = _fs2.default.readFileSync(fileName).toString();
        let json = JSON.parse(data);
        json.name = projectName;
        version && (json.version = version);
        author && (json.author = author);
        description && (json.description = description);
        //修改项目文件夹中 package.json 文件
        _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
    }
}; // 彩色命令行
// 命令行交互


let init = async projectName => {
    //没有输入项目名
    if (!projectName) {
        console.log(_logSymbols2.default.error, _chalk2.default.red('you must input a project name'));
        return;
    }
    //项目已存在
    if (_fs2.default.existsSync(projectName)) {
        console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
        return;
    }
    let config = await (0, _rc.getAll)();
    let registries = config.git.registry.array;
    let registryStr = registries.map((i, index) => `\n[${index}] : ${i}`).join('');
    //命令行交互
    _inquirer2.default.prompt([{
        name: 'description',
        message: 'Please enter the project description: '
    }, {
        name: 'version',
        message: 'Please enter the project version: '
    }, {
        name: 'author',
        message: 'Please enter the author name: '
    }, {
        name: 'registry',
        message: `Has ${registries.length} registries:${registryStr}\nPlease select registry:`
    }]).then(async answer => {
        let { registry = 0 } = answer;
        let regIndex = Number(registry);
        if (regIndex < 0 || regIndex >= registries.length) {
            console.log(_logSymbols2.default.error, _chalk2.default.red('Please input registry index'));
            return;
        }
        //下载模板 选择模板
        //通过配置文件，获取模板信息
        let loading = (0, _ora2.default)('downloading template ...');
        loading.start();
        (0, _get.downloadLocal)(registries[regIndex], projectName).then(() => {
            loading.succeed();
            updatePackage(projectName, answer);
            console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
        }, () => {
            loading.fail();
        });
    });
};

module.exports = init;