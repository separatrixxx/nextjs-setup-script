import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import { replaceInFiles, copyRecursiveSync } from './helpers';
import ora from 'ora';


const sourceDir = path.resolve(__dirname, '..', 'source');

const spinner = ora();

export const modifyFiles = (name: string): void => {
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
      replaceInFiles(modification.path, name);
    } else {
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
  } else {
    spinner.fail(`Error: ${globalCSSPath} does not exist.`);
    shell.exit(1);
  }

  const robotsPath = path.join(sourceDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');

    fs.writeFileSync('public/robots.txt', robotsContent);
  } else {
    spinner.fail(`Error: ${robotsPath} does not exist.`);
    shell.exit(1);
  }

  const pagesSourceDir = path.join(sourceDir, 'pages');
  const destinationPagesDir = 'src/pages';

  if (fs.existsSync(pagesSourceDir)) {
    copyRecursiveSync(pagesSourceDir, destinationPagesDir);
    replaceInFiles(destinationPagesDir, name);
  } else {
    spinner.fail(`Error: ${pagesSourceDir} does not exist.`);
    shell.exit(1);
  }
};
