

## 用到的第三方库

+ babel-cli/babel-env: 语法转换
+ commander: 命令行工具
+ download-git-repo: 用来下载远程模板
+ ini: 格式转换
+ inquirer: 交互式命令行工具
+ ora: 显示loading动画
+ chalk: 修改控制台输出内容样式
+ log-symbols: 显示出 √ 或 × 等的图标



## 目录结构

```javascript
├── bin
│   └── www             //可执行文件
├── dist
    ├── ...             //生成文件
└── src
    ├── config.js       //管理eos配置文件
    ├── index.js        //主流程入口文件
    ├── init.js         //init command
    ├── main.js         //入口文件
    └── utils
        ├── constants.js //定义常量
        ├── get.js       //获取模板
        └── rc.js        //配置文件
├── .babelrc             //babel配置文件
├── package.json
├── README.md
```