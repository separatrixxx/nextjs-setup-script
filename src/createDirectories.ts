import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';
import { replaceInFiles, copyRecursiveSync } from './helpers';
import ora from 'ora';


const sourceDir = path.resolve(__dirname, '..', 'source');

const spinner = ora();

export const createDirectories = (name: string): void => {
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
    copyRecursiveSync(hooksSourceDir, destinationHooksDir);
  } else {
    spinner.fail(`Error: ${hooksSourceDir} does not exist.`);
    shell.exit(1);
  }

  const localeHelperPath = path.join(sourceDir, 'locale.helper.tsx');

  if (fs.existsSync(localeHelperPath)) {
    const localeHelperContent = fs.readFileSync(localeHelperPath, 'utf8');
    fs.writeFileSync('helpers/locale.helper.tsx', localeHelperContent);
  } else {
    spinner.fail(`Error: ${localeHelperPath} does not exist.`);
    shell.exit(1);
  }

  const storePath = path.join(sourceDir, 'store.ts');

  if (fs.existsSync(storePath)) {
    const storeContent = fs.readFileSync(storePath, 'utf8');
    fs.writeFileSync('features/store/store.ts', storeContent);
  } else {
    spinner.fail(`Error: ${storePath} does not exist.`);
    shell.exit(1);
  }

  const localesSourceDir = path.join(sourceDir, 'locales');
  const destinationLocalesDir = 'locales';

  if (fs.existsSync(localesSourceDir)) {
    copyRecursiveSync(localesSourceDir, destinationLocalesDir);
    replaceInFiles(destinationLocalesDir, name);
  } else {
    spinner.fail(`Error: ${localesSourceDir} does not exist.`);
    shell.exit(1);
  }

  const pageComponentsSourceDir = path.join(sourceDir, 'page_components');
  const pageComponentsDestinationDir = 'page_components';

  if (fs.existsSync(pageComponentsSourceDir)) {
    copyRecursiveSync(pageComponentsSourceDir, pageComponentsDestinationDir);
  } else {
    spinner.fail(`Error: ${pageComponentsSourceDir} does not exist.`);
    shell.exit(1);
  }

  const componentsSourceDir = path.join(sourceDir, 'Common');
  const componentsDestinationDir = 'components/Common';

  if (fs.existsSync(componentsSourceDir)) {
    copyRecursiveSync(componentsSourceDir, componentsDestinationDir);
  } else {
    spinner.fail(`Error: ${componentsSourceDir} does not exist.`);
    shell.exit(1);
  }
};
