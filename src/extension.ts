import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('TYSoftIndirectReplication.tycp', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				if (process.platform === 'win32') {



					await vscode.env.clipboard.writeText(" ");

					const escapedText = selectedText;
					const tempUtf_8File = path.join(__dirname, 'tempUtf_8File.TYSoftDecode');
					const tempLocalFile = path.join(__dirname, 'tempLocalFile.TYSoftDecode');
					fs.writeFileSync(tempUtf_8File, escapedText.trim(), 'utf8');
					const Utf8ToLocal = `powershell -Command "Get-Content -Path '${tempUtf_8File}' -Encoding UTF8 | Set-Content -Path '${tempLocalFile}' -Encoding Default "`;
					const FileToClipb = `powershell -Command "Get-Content -Path '${tempLocalFile}' | Set-Clipboard "`;
					await new Promise((resolve, reject) => {
						child_process.exec(Utf8ToLocal, (err) => {
							if (err) {
								vscode.window.showErrorMessage(`以UTF8编码保存失败: ${err.message}`);
								reject(err);
							} else {
								resolve(null);
							}
						});
					});
					await new Promise((resolve, reject) => {
						child_process.exec(FileToClipb, (err) => {
							if (err) {
								vscode.window.showErrorMessage(`复制到剪切板失败: ${err.message}`);
								reject(err);
							} else {
								vscode.window.showInformationMessage('已将选中的文本复制到剪贴板');
								resolve(null);
							}
						});
					});
				}
			} else {
				vscode.window.showWarningMessage('未选中任何文本');
			}
		} else {
			vscode.window.showWarningMessage('没有打开的编辑器');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('成功退出插件')
}
