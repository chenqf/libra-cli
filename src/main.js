import program from 'commander';
import {
    VERSION
} from './constants';

import initApply from './init';

import chalk from 'chalk'; // 修改控制台输出内容样式


// 一个实际例子：https://github.com/YvetteLau/Blog/tree/master/eos-cli


program.command('init')
    .description('generate a new project from a template')
    .alias('i') //别名
    .action(()=>{
        initApply(...process.argv.slice(3));
    })

program.command('config')
    .description('config .libra')
    .alias('cfg') //别名
    .action(()=>{
        apply('config', ...process.argv.slice(3));
    })

function help() {
    console.log('\r\nUsage:');
    console.log('  - ' + 'libra init templateName projectName');
    console.log('\r');
}


program.usage('<command> [options]');

program.on('-h', help);
program.on('--help', help);

program.version(VERSION, '-V --version').parse(process.argv);


// libra 不带参数时
if (!process.argv.slice(2).length) {
    program.outputHelp(function(txt){
        return chalk.green(txt);
    });
}