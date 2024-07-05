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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPackageJson = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ora_1 = __importDefault(require("ora"));
const spinner = (0, ora_1.default)();
const modifyPackageJson = () => {
    const packageJsonPath = path.resolve('package.json');
    if (fs.existsSync(packageJsonPath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            if (packageJson.scripts && packageJson.scripts.lint === "next lint") {
                packageJson.scripts.stylelint = 'stylelint "**/*.css" --fix';
                packageJson.scripts.check = 'stylelint "**/*.css" --fix && next lint && next build';
                fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            }
            else {
                spinner.fail('Error: "lint": "next lint" not found in package.json.');
            }
        }
        catch (err) {
            spinner.fail(`Error reading or parsing package.json: ${err}`);
        }
    }
    else {
        spinner.fail(`Error: ${packageJsonPath} does not exist.`);
        process.exit(1);
    }
};
exports.modifyPackageJson = modifyPackageJson;
