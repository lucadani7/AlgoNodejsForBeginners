"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var dir = "./src";
var files = fs.readdirSync(dir);
var exports = files
    .filter(function (file) { return file.endsWith(".ts") && file !== "index.ts"; })
    .map(function (file) { return "export * from \"./".concat(path.basename(file, ".ts"), "\";"); })
    .join("\n");
fs.writeFileSync(path.join(dir, "index.ts"), exports);
console.log("index.ts generated!");
