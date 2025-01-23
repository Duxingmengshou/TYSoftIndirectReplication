import * as child_process from 'child_process';
import exp from 'constants';
import * as fs from 'fs';
import * as path from 'path';


export async function tyCopyTextFunction(
    selectedText: string,
    infoLogFunc: Function = console.log,
    errorLogFunc: Function = console.error):
    Promise<boolean> {
    const escapedText = selectedText;
    const tempUtf_8File = path.join(__dirname, 'tempUtf_8File.TYSoftDecode');
    const tempLocalFile = path.join(__dirname, 'tempLocalFile.TYSoftDecode');
    fs.writeFileSync(tempUtf_8File, escapedText.trim(), 'utf8');
    const Utf8ToLocal = `powershell -Command "Get-Content -Path '${tempUtf_8File}' -Encoding UTF8 | Set-Content -Path '${tempLocalFile}' -Encoding Default "`;
    const FileToClipb = `powershell -Command "Get-Content -Path '${tempLocalFile}' | Set-Clipboard "`;
    try {
        await new Promise((resolve, reject) => {
            child_process.exec(Utf8ToLocal, (err) => {
                if (err) {
                    infoLogFunc(`以UTF8编码保存失败: ${err.message}`);
                    reject(err);
                } else {
                    resolve(null);
                }
            });
        });
        await new Promise((resolve, reject) => {
            child_process.exec(FileToClipb, (err) => {
                if (err) {
                    errorLogFunc(`复制到剪切板失败: ${err.message}`);
                    reject(err);
                } else {
                    infoLogFunc('已将选中的文本复制到剪贴板');
                    resolve(null);
                }
            });
        });

        fs.unlink(tempUtf_8File, (err) => {
            if (err) {
                errorLogFunc('删除临时文件错误');
            }
            // infoLogFunc('删除临时文件成功')
        });
        fs.unlink(tempLocalFile, (err) => {
            if (err) {
                errorLogFunc('删除临时文件错误');
            }
            // infoLogFunc('删除临时文件成功')
        });
        return true;
    } catch {
        return false;
    }
}


export async function tyCopyFileFunction(
    selectedFile: string,
    infoLogFunc: Function = console.log,
    errorLogFunc: Function = console.error):
    Promise<boolean> {
    

    
    return true;
}
