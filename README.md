

## 用到的第三方库

+ babel-cli/babel-env: 语法转换
+ commander: 命令行工具
+ download-git-repo: 用来下载远程模板
+ ini: 格式转换
+ inquirer: 交互式命令行工具
+ ora: 显示loading动画
+ chalk: 修改控制台输出内容样式
+ log-symbols: 显示出 √ 或 × 等的图标


## 配置文件

用户根目录创建文件：.libra

用于指定用到的模板路径

文件内容：

```shell
[git.registry]
array[] = chenqf/vue-design
array[] = chenqf/2
array[] = chenqf/3
```