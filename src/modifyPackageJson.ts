import * as fs from 'fs';
import * as path from 'path';
import ora from 'ora';


const spinner = ora();

export const modifyPackageJson = (): void => {
  const packageJsonPath = path.resolve('package.json');

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      if (packageJson.scripts && packageJson.scripts.lint === "next lint") {
        packageJson.scripts.stylelint = 'stylelint "**/*.css" --fix';
        packageJson.scripts.check = 'stylelint "**/*.css" --fix && next lint && next build';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      } else {
        spinner.fail('Error: "lint": "next lint" not found in package.json.');
      }
    } catch (err) {
      spinner.fail(`Error reading or parsing package.json: ${err}`);
    }
  } else {
    spinner.fail(`Error: ${packageJsonPath} does not exist.`);
    process.exit(1);
  }
};
