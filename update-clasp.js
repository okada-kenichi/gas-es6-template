const fs = require("fs");

const claspFilePath = "./.clasp.json";

// `.clasp.json` を読み込む
fs.readFile(claspFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading .clasp.json:", err);
        return;
    }

    // JSON をパースする
    const claspConfig = JSON.parse(data);

    // `rootDir` を `dist` に設定
    claspConfig.rootDir = "dist";

    // 更新された JSON を書き戻す
    fs.writeFile(claspFilePath, JSON.stringify(claspConfig, null, 2), "utf8", (err) => {
        if (err) {
            console.error("Error writing .clasp.json:", err);
            return;
        }
        console.log("Successfully updated .clasp.json");
    });
});
