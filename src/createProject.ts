import * as shell from 'shelljs';
import ora from 'ora';


const spinner = ora();

export const createProject = (name: string): void => { 
  if (shell.exec(`npx create-next-app ${name} --ts --eslint --src-dir --no-tailwind --no-app --import-alias @/*`).code !== 0) {
    spinner.fail('Error: Failed to create Next.js app');
    shell.exit(1);
  }
};
