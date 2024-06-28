import * as shell from 'shelljs';
import ora from 'ora';


const spinner = ora();

export const installPackages = (): void => {
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
