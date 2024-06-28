"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyRecursiveSync = exports.replaceInFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const replaceInFiles = (filePath, name) => {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
        const items = fs.readdirSync(filePath);
        items.forEach(item => {
            (0, exports.replaceInFiles)(path.join(filePath, item), name);
        });
    }
    else if (stats.isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace(/\$spec\$/g, name);
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
};
exports.replaceInFiles = replaceInFiles;
const copyRecursiveSync = (src, dest) => {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            (0, exports.copyRecursiveSync)(path.join(src, childItemName), path.join(dest, childItemName));
        });
    }
    else if (stats.isFile()) {
        fs.copyFileSync(src, dest);
    }
};
exports.copyRecursiveSync = copyRecursiveSync;
