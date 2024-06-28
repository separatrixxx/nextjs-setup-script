#!/usr/bin/env ts-node
import { Command } from 'commander';
import * as shell from 'shelljs';
import ora from 'ora';
import path from 'path';
import { createProject } from './createProject';
import { installPackages } from './installPackages';
import { modifyFiles } from './modifyFiles';
import { createDirectories } from './createDirectories';
import { modifyPackageJson } from './modifyPackageJson';


const program = new Command();

program
  .version('1.0.1')
  .description('Next.js setup script')
  .arguments('<name>')
  .action(async (name: string) => {
    const spinner = ora();
    const projectPath = path.resolve(process.cwd(), name);

    try {
      spinner.start('Creating a new Next.js app...\n');
      createProject(name);
      spinner.succeed('Next.js app created');

      shell.cd(projectPath);

      spinner.start('Installing additional packages...\n');
      installPackages();
      spinner.succeed('Additional packages installed');

      spinner.start('Modifying files...\n');
      modifyFiles(name);
      spinner.succeed('Files modified');

      spinner.start('Creating directories and copying files...\n');
      createDirectories(name);
      spinner.succeed('Directories and files created');

      spinner.start('Modifying package.json...\n');
      modifyPackageJson();
      spinner.succeed('package.json modified');

      spinner.succeed('Project setup complete');
    } catch (error) {
      if (error instanceof Error) {
        spinner.fail(`Error: ${error.message}`);
      } else {
        spinner.fail('Unknown error occurred');
      }
      shell.exit(1);
    }
  });

program.parse(process.argv);
