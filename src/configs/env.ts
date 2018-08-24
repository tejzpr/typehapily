import * as Dotenv from 'dotenv';
// Need to put relative path because module resolver has not loaded yet
import logger from '../utilities/logger';
import chalk from 'chalk';
import process from 'process';
import crypto from 'crypto';

//This should be before anything else
Dotenv.config();

if (require.main && require.main.filename && require.main.filename.endsWith('.js')) {
    // Required for module resolution
    require('module-alias/register');
}

if (process.env.NODE_ENV === 'development') {
    console.log(chalk.bgBlack(chalk.cyan(`
==========================================
    O~~~~~    O~~~~~~~~O~~         O~~
    O~~   O~~ O~~       O~~       O~~
    O~~    O~~O~~        O~~     O~~
    O~~    O~~O~~~~~~     O~~   O~~
    O~~    O~~O~~          O~~ O~~
    O~~   O~~ O~~           O~~~~
    O~~~~~    O~~~~~~~~      O~~
==========================================
Server is running in development mode,
therefore cannot not use compiled JS files
If you want to use compiled JS files from
"dist" then Set NODE_ENV to a value other
than "development"
==========================================
    `)));
}


// Create deployment version
let tmp_version: string = crypto.randomBytes(20).toString('hex');
if (process.env.STATIC_FILES_VERSION) {
    tmp_version = process.env.STATIC_FILES_VERSION;
}

if (!process.env.HOST) {
    throw new Error(`Please specify server HOST environment variable`);
} else {
    logger.info(`Using HOST from Environment variable`);
}

if (!process.env.PORT) {
    throw new Error(`Please specify server PORT environment variable`);
} else {
    logger.info(`Using PORT from Environment variable`);
}

export const NODE_ENV:any = process.env.NODE_ENV;
export const PORT:any = process.env.PORT;
export const HOST:any = process.env.HOST;
export const GLOBAL:any = process.env;
// Deployment version
export const DEPLOYMENT_VERSION: string = tmp_version;