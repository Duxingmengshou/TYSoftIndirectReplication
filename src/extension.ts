import * as vscode from 'vscode';
import { tyCopyTextFunction } from './main';
import path from 'path'

export function activate(context: vscode.ExtensionContext) {
	const tyCopyDisposable = vscode.commands.registerCommand('TYSoftIndirectReplication.tycp', async () => {
		// 如果打开编辑器且选中文字，将选中的文字解密复制到系统剪切板
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				if (process.platform === 'win32') {
					// 清空当前的剪切板
					await vscode.env.clipboard.writeText(" ");

					// 调用 tycpFunction 进行处理
					await tyCopyTextFunction(selectedText, vscode.window.showInformationMessage, vscode.window.showErrorMessage);
				} else {
					vscode.window.showWarningMessage('暂不支持Win32以外的平台');
				}
			} else {
				vscode.window.showWarningMessage('未选中任何文本');
			}
		} else {
			vscode.window.showWarningMessage('没有打开的编辑器');
		}
	});

	const tyCutDisposable = vscode.commands.registerCommand('TYSoftIndirectReplication.tycut', async () => {
		// 如果打开编辑器且选中文字，将选中的文字剪切到系统剪切板
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				if (process.platform === 'win32') {
					// 清空当前的剪切板
					await vscode.env.clipboard.writeText(" ");

					// 调用 tycpFunction 进行处理
					const cpRes = await tyCopyTextFunction(selectedText, vscode.window.showInformationMessage, vscode.window.showErrorMessage);

					if (cpRes) {
						await editor.edit(editBuilder => {
							editBuilder.delete(selection);
						});
					}
				} else {
					vscode.window.showWarningMessage('暂不支持Win32以外的平台');
				}
			} else {
				vscode.window.showWarningMessage('未选中任何文本');
			}
		} else {
			vscode.window.showWarningMessage('没有打开的编辑器');
		}
	});

	const tyCopyCurrentFileNameDisposable = vscode.commands.registerCommand('TYSoftIndirectReplication.tycpfn', async () => {
		// 如果打开编辑器且选中文字，将选中的文字剪切到系统剪切板
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const fileName = editor.document.fileName; // 获取文件的完整路径
			const baseName = path.basename(fileName); // 获取文件名（不带路径）

			if (baseName) {
				if (process.platform === 'win32') {
					// 清空当前的剪切板
					await vscode.env.clipboard.writeText(" ");
					await tyCopyTextFunction(baseName, vscode.window.showInformationMessage, vscode.window.showErrorMessage);

				} else {
					vscode.window.showWarningMessage('暂不支持Win32以外的平台');
				}
			} else {
				vscode.window.showWarningMessage('获取文件名失败');
			}
			vscode.window.showInformationMessage(`已复制文件名: ${baseName}`);
		} else {
			vscode.window.showWarningMessage('没有打开的编辑器');
		}
	});

	const tyCopyCurrentFileRelativePathDisposable = vscode.commands.registerCommand('TYSoftIndirectReplication.tycpfrp', async () => {
		// 如果打开编辑器且选中文字，将选中的文字剪切到系统剪切板
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const filePath = editor.document.fileName; // 获取文件的完整路径
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (workspaceFolders) {
				// 假设我们使用第一个工作区文件夹作为基准
				const workspaceFolder = workspaceFolders[0].uri.fsPath;
				const relativePath = path.relative(workspaceFolder, filePath); // 计算相对路径
				if (process.platform === 'win32') {
					// 清空当前的剪切板
					await vscode.env.clipboard.writeText(" ");
					await tyCopyTextFunction(relativePath, vscode.window.showInformationMessage, vscode.window.showErrorMessage);
				} else {
					vscode.window.showWarningMessage('暂不支持Win32以外的平台');
				}
				vscode.window.showInformationMessage(`已复制相对路径: ${relativePath}`);
			} else {
				vscode.window.showWarningMessage('没有打开工作区');
			}
		} else {
			vscode.window.showWarningMessage('没有打开的编辑器');
		}
	});


	context.subscriptions.push(tyCopyDisposable);
	context.subscriptions.push(tyCutDisposable);
	context.subscriptions.push(tyCopyCurrentFileNameDisposable);
	context.subscriptions.push(tyCopyCurrentFileRelativePathDisposable);
}
