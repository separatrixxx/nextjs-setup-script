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
exports.modifyFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const shell = __importStar(require("shelljs"));
const helpers_1 = require("./helpers");
const ora_1 = __importDefault(require("ora"));
const sourceDir = path.resolve(__dirname, '..', 'source');
const spinner = (0, ora_1.default)();
const modifyFiles = (name) => {
    const modifications = [
        { path: 'tsconfig.json', description: 'Modifying tsconfig.json' },
        { path: 'README.md', description: 'Modifying README.md' },
        { path: 'next.config.js', description: 'Modifying next.config.js' },
        { path: 'next-env-custom.d.ts', description: 'Creating next-env-custom.d.ts' },
        { path: 'images.d.ts', description: 'Creating images.d.ts' },
        { path: '.stylelintrc.json', description: 'Creating .stylelintrc.json' },
        { path: '.env', description: 'Creating .env' },
        { path: 'globals.css', description: 'Modifying src and public directories' }
    ];
    modifications.forEach(modification => {
        const filePath = path.join(sourceDir, modification.path);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(modification.path, content);
            (0, helpers_1.replaceInFiles)(modification.path, name);
        }
        else {
            spinner.fail(`Error: ${filePath} does not exist.`);
            shell.exit(1);
        }
    });
    shell.rm('-rf', 'src/*');
    shell.rm('-rf', 'public/*');
    const files = [
        'public/robots.txt',
        'src/pages/_app.tsx',
        'src/pages/_document.tsx',
        'src/pages/index.tsx',
        'src/pages/404.tsx',
        'src/pages/500.tsx',
        'src/styles/globals.css',
    ];
    files.forEach(filePath => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.closeSync(fs.openSync(filePath, 'w'));
    });
    const globalCSSPath = path.join(sourceDir, 'globals.css');
    if (fs.existsSync(globalCSSPath)) {
        const globalCSSContent = fs.readFileSync(globalCSSPath, 'utf8');
        fs.writeFileSync('src/styles/globals.css', globalCSSContent);
    }
    else {
        spinner.fail(`Error: ${globalCSSPath} does not exist.`);
        shell.exit(1);
    }
    const robotsPath = path.join(sourceDir, 'robots.txt');
    if (fs.existsSync(robotsPath)) {
        const robotsContent = fs.readFileSync(robotsPath, 'utf8');
        fs.writeFileSync('public/robots.txt', robotsContent);
    }
    else {
        spinner.fail(`Error: ${robotsPath} does not exist.`);
        shell.exit(1);
    }
    const pagesSourceDir = path.join(sourceDir, 'pages');
    const destinationPagesDir = 'src/pages';
    if (fs.existsSync(pagesSourceDir)) {
        (0, helpers_1.copyRecursiveSync)(pagesSourceDir, destinationPagesDir);
        (0, helpers_1.replaceInFiles)(destinationPagesDir, name);
    }
    else {
        spinner.fail(`Error: ${pagesSourceDir} does not exist.`);
        shell.exit(1);
    }
};
exports.modifyFiles = modifyFiles;
