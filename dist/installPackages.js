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
exports.installPackages = void 0;
const shell = __importStar(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const spinner = (0, ora_1.default)();
const installPackages = () => {
    const packages = [
        '@reduxjs/toolkit',
        '@svgr/webpack',
        '@types/classnames',
        'axios',
        'date-fns',
        'framer-motion',
        'next-redux-wrapper',
        'react-hot-toast',
        'stylelint@13.0.0',
        'stylelint-config-standard@19.0.0',
        'stylelint-order@4.0.0',
        'stylelint-order-config-standard@0.1.3'
    ];
    if (shell.exec(`npm i -D ${packages.join(' ')}`).code !== 0) {
        spinner.fail('Error: Failed to install packages');
        shell.exit(1);
    }
};
exports.installPackages = installPackages;
