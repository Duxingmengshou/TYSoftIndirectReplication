import { test, expect } from "vitest";
import { tyCopyTextFunction } from "../src/main"

test("默认测试", async () => {
    const escapedText = `
    你好世界
    我是你的你是我的谁
    2025123
    `;

    await tyCopyTextFunction(escapedText);
});
