# TYSoftIndirectReplication README
## Features
通过nodejs+powershell命令的方式间接的把文件内容复制出来。

## Extension Settings
扩展命令为tycp，可以自行添加vscode快捷键

## Known Issues
暂无

## Release Notes
1、使用临时文件解决多行文本复制问题

2、解决系统编码问题（有些系统默认UFT8）

3、解决前一次使用系统快捷键复制加密内容之后，系统剪切板被禁用问题（先调用vscode的方式清空一遍剪切板）


## Future Features
1、剪切文本

2、复制、剪切文件（file2clip、复制的时候进行解密）

3、复制文件名（自动识别当前聚焦文件）

4、复制文件的绝对路径、相对路径（自动识别）

5、清空当前剪切板（内部方法暴露）

6、复制文件夹（递归处理）



**Enjoy!**
