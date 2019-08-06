import { downloadLocal } from './get';
import { getAll } from './rc';
import ora from 'ora'; // 下载进度条
import inquirer from 'inquirer'; // 命令行交互
import fs from 'fs';
import chalk from 'chalk';  // 彩色命令行
import symbol from 'log-symbols';   // 命令行工具


const updatePackage = function(projectName,answer){
    let {
        description,
        author,
        version
    } = answer;
    const fileName = `${projectName}/package.json`;
    if(fs.existsSync(fileName)){
        const data = fs.readFileSync(fileName).toString();
        let json = JSON.parse(data);
        json.name = projectName;
        version && (json.version = version);
        author && (json.author = author);
        description && (json.description = description);
        //修改项目文件夹中 package.json 文件
        fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
    }
}



let init = async (projectName) => {
    //没有输入项目名
    if(!projectName){
        console.log(symbol.error, chalk.red('you must input a project name'));
        return ;
    }
    //项目已存在
    if(fs.existsSync(projectName)){
        console.log(symbol.error, chalk.red('The project already exists'));
        return ;
    }
    let config = await getAll();
    let registries = config.git.registry.array;
    let registryStr = registries.map((i,index)=>`\n[${index}] : ${i}`).join('')
    //命令行交互
    inquirer.prompt([
        {
            name: 'description',
            message: 'Please enter the project description: '
        },
        {
            name: 'version',
            message: 'Please enter the project version: '
        },
        {
            name: 'author',
            message: 'Please enter the author name: '
        },
        {
            name: 'registry',
            message: `Has ${registries.length} registries:${registryStr}\nPlease select registry:`
        }
    ]).then(async (answer) => {
        let {registry = 0} = answer;
        let regIndex = Number(registry);
        if(regIndex < 0 || regIndex >= registries.length){
            console.log(symbol.error, chalk.red('Please input registry index'));
            return ;
        }
        //下载模板 选择模板
        //通过配置文件，获取模板信息
        let loading = ora('downloading template ...');
        loading.start();
        downloadLocal(registries[regIndex], projectName).then(() => {
            loading.succeed();
            updatePackage(projectName,answer)
            console.log(symbol.success, chalk.green('Project initialization finished!'));
        }, () => {
            loading.fail();
        });
    });
}

module.exports = init;