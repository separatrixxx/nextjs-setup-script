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
exports.createDirectories = void 0;
const shell = __importStar(require("shelljs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const helpers_1 = require("./helpers");
const ora_1 = __importDefault(require("ora"));
const sourceDir = path.resolve(__dirname, '..', 'source');
const spinner = (0, ora_1.default)();
const createDirectories = (name) => {
    shell.mkdir('-p', [
        'page_components/ErrorPage',
        'page_components/MainPage',
        'locales',
        'interfaces',
        'hooks',
        'helpers',
        'features/store',
        'components/Common/Toast',
        'components/Common/LocaleChange',
        'components/Common/Htag',
        'components/Common/Modal'
    ]);
    const hooksSourceDir = path.join(sourceDir, 'hooks');
    const destinationHooksDir = 'hooks';
    if (fs.existsSync(hooksSourceDir)) {
        (0, helpers_1.copyRecursiveSync)(hooksSourceDir, destinationHooksDir);
    }
    else {
        spinner.fail(`Error: ${hooksSourceDir} does not exist.`);
        shell.exit(1);
    }
    const localeHelperPath = path.join(sourceDir, 'locale.helper.tsx');
    if (fs.existsSync(localeHelperPath)) {
        const localeHelperContent = fs.readFileSync(localeHelperPath, 'utf8');
        fs.writeFileSync('helpers/locale.helper.tsx', localeHelperContent);
    }
    else {
        spinner.fail(`Error: ${localeHelperPath} does not exist.`);
        shell.exit(1);
    }
    const storePath = path.join(sourceDir, 'store.ts');
    if (fs.existsSync(storePath)) {
        const storeContent = fs.readFileSync(storePath, 'utf8');
        fs.writeFileSync('features/store/store.ts', storeContent);
    }
    else {
        spinner.fail(`Error: ${storePath} does not exist.`);
        shell.exit(1);
    }
    const localesSourceDir = path.join(sourceDir, 'locales');
    const destinationLocalesDir = 'locales';
    if (fs.existsSync(localesSourceDir)) {
        (0, helpers_1.copyRecursiveSync)(localesSourceDir, destinationLocalesDir);
        (0, helpers_1.replaceInFiles)(destinationLocalesDir, name);
    }
    else {
        spinner.fail(`Error: ${localesSourceDir} does not exist.`);
        shell.exit(1);
    }
    const pageComponentsSourceDir = path.join(sourceDir, 'page_components');
    const pageComponentsDestinationDir = 'page_components';
    if (fs.existsSync(pageComponentsSourceDir)) {
        (0, helpers_1.copyRecursiveSync)(pageComponentsSourceDir, pageComponentsDestinationDir);
    }
    else {
        spinner.fail(`Error: ${pageComponentsSourceDir} does not exist.`);
        shell.exit(1);
    }
    const componentsSourceDir = path.join(sourceDir, 'Common');
    const componentsDestinationDir = 'components/Common';
    if (fs.existsSync(componentsSourceDir)) {
        (0, helpers_1.copyRecursiveSync)(componentsSourceDir, componentsDestinationDir);
    }
    else {
        spinner.fail(`Error: ${componentsSourceDir} does not exist.`);
        shell.exit(1);
    }
};
exports.createDirectories = createDirectories;
