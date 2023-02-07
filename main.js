#!/usr/bin/env node
import { extractAll, createPackage } from 'asar';
import chalk from 'chalk';
import { resolve } from 'path';
import { readFileSync, writeFileSync, rm, existsSync, mkdirSync } from 'fs';
import { Command } from 'commander';
const program = new Command();
program
  .version("1.0.0")
  .showHelpAfterError()
  .description("Ray License Patcher")
  .option("-p, --path  [value]", "Path of Ray binary (app.asar)")
  .option("-w, --wd <value>", "Working directory")
  .parse(process.argv);

const options = program.opts();

const extractedPath = resolve(options.wd ||  './extracted')
// assuming you are on mac
const asarPath = options.path || '/Applications/Ray.app/Contents/Resources/app.asar'

if (!existsSync(asarPath)) {
    console.log(chalk.yellow('ASAR file does not exist. ') + chalk.red('Quitting...'))
    // give some instructions to find the path
    console.log(chalk.yellowBright('You may find the path of the ASAR file by running ') + chalk.gray('find / -name app.asar'))
    process.exit(1)
}


if (!existsSync(extractedPath)) {
    console.log(chalk.yellow('Extracted folder does not exist. ') + chalk.red('Creating...'))
    mkdirSync(extractedPath)
}


extractAll(asarPath, extractedPath);
console.log('Extracted to ' + extractedPath)

const bin = `${extractedPath}/dist/main.js`;
console.log(chalk.yellow('Reading ') + chalk.gray(bin))
const buf = readFileSync(bin);
const str = buf.toString('utf8');
console.log(chalk.green('Source has been read. ') + chalk.yellow('Trying to patch...'))

const regex = new RegExp(`(return\\(0,z.verify\\).*?"base64"\\)\\))`, 'gm')
const subst = `return true`;
console.log(chalk.green('Patch drafted! ') + chalk.yellow('Writing back to ') + chalk.gray(bin))

// The substituted value will be contained in the result variable
const replacedStr = str.replace(regex, subst).replace('https://spatie.be/api', 'https://spatie.vercel.app/api');
const replacedBuf = Buffer.from(replacedStr, 'utf8');
writeFileSync(bin, replacedBuf);


createPackage(extractedPath, asarPath).then(() => {
    console.log(chalk.green('Patched! ') + chalk.yellow('Now removing extracted folder...'))
    rm(extractedPath, { recursive: true }, () => {
        console.log(chalk.green('Done!'))
    });
}).catch((err) => {
    console.log(chalk.red('Error:'), err)
});
