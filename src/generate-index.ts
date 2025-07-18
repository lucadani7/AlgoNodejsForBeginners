import * as fs from "fs";
import * as path from "path";

const dir = ".";
const files = fs.readdirSync(dir);

const exportLines = files
    .filter(file => file.endsWith(".ts") && file !== "index.ts")
    .map(file => `export * from "./${path.basename(file, ".ts")}";`)
    .join("\n");

fs.writeFileSync(path.join(dir, "index.ts"), exportLines);
console.log("✅ index.ts generated!");
