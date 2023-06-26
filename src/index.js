import * as readline from 'node:readline/promises';
import { homedir } from 'node:os';
import getUserName from './helpers/getUserName.js';
import executeCommand from './executeCommand.js';

const start = () => {
  const userName = getUserName(process.argv);
  let pathToWorkingDirectory = homedir();

  console.log('\x1b[35m%s\x1b[0m', `Welcome to the File Manager, ${userName}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const printNewLine = () => {
    console.log('\x1b[36m%s\x1b[0m', `You are currently in ${pathToWorkingDirectory}`);
    rl.prompt();
  };

  printNewLine();

  rl.on('line', async (input) => {
    pathToWorkingDirectory = await executeCommand(pathToWorkingDirectory, input, () => rl.close());
    printNewLine();
  });

  rl.on('close', () => {
    console.log('\x1b[35m%s\x1b[0m', `Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  });
};

start();
