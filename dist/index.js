#!/usr/bin/env ts-node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const shell = __importStar(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const createProject_1 = require("./createProject");
const installPackages_1 = require("./installPackages");
const modifyFiles_1 = require("./modifyFiles");
const createDirectories_1 = require("./createDirectories");
const modifyPackageJson_1 = require("./modifyPackageJson");
const program = new commander_1.Command();
program
    .version('1.0.1')
    .description('Next.js setup script')
    .arguments('<name>')
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = (0, ora_1.default)();
    const projectPath = path_1.default.resolve(process.cwd(), name);
    try {
        spinner.start('Creating a new Next.js app...\n');
        (0, createProject_1.createProject)(name);
        spinner.succeed('Next.js app created');
        shell.cd(projectPath);
        spinner.start('Installing additional packages...\n');
        (0, installPackages_1.installPackages)();
        spinner.succeed('Additional packages installed');
        spinner.start('Modifying files...\n');
        (0, modifyFiles_1.modifyFiles)(name);
        spinner.succeed('Files modified');
        spinner.start('Creating directories and copying files...\n');
        (0, createDirectories_1.createDirectories)(name);
        spinner.succeed('Directories and files created');
        spinner.start('Modifying package.json...\n');
        (0, modifyPackageJson_1.modifyPackageJson)();
        spinner.succeed('package.json modified');
        spinner.succeed('Project setup complete');
    }
    catch (error) {
        if (error instanceof Error) {
            spinner.fail(`Error: ${error.message}`);
        }
        else {
            spinner.fail('Unknown error occurred');
        }
        shell.exit(1);
    }
}));
program.parse(process.argv);
