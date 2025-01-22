import { test, expect } from "vitest";
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

test("默认测试", async () => {
    const escapedText = `
    你好世界
    我是你的你是我的谁
    `;

    // 创建一个临时文件
    const tempFilePath = path.join(__dirname, 'temp.txt');

    // 将内容写入临时文件
    fs.writeFileSync(tempFilePath, escapedText.trim(), 'utf8');

    // 使用 PowerShell 命令从临时文件读取内容并复制到剪贴板
    const command = `powershell -Command "Get-Content -Path '${tempFilePath}' | Set-Clipboard"`;

    // 使用 Promise 包装 exec 以便等待它完成
    await new Promise((resolve, reject) => {
        child_process.exec(command, (err) => {
            if (err) {
                console.error(`复制失败: ${err.message}`);
                reject(err); // 失败时拒绝 Promise
            } else {
                console.log('已将选中的文本复制到剪贴板');
                resolve(null);
            }
        });
    });

    // 清理临时文件
    fs.unlinkSync(tempFilePath);
});
