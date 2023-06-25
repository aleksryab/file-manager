import * as readline from 'node:readline/promises';
import { homedir } from 'node:os';
import getUserName from './helpers/getUserName.js';
import parseCommandLine from './helpers/parseCommandLine.js';
import up from './up.js';
import cd from './cd.js';
import list from './list.js';
import { ERROR_COLOR_TEMPLATE, INVALID_INPUT_MESSAGE } from './constants.js';

const start = () => {
  const userName = getUserName(process.argv);
  let pathToWorkingDirectory = homedir();

  console.log(`Welcome to the File Manager, ${userName}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`You are currently in ${pathToWorkingDirectory}`);
  rl.prompt();

  rl.on('line', async (input) => {
    const { command, args } = parseCommandLine(input);
    console.log(command, args);

    switch (command) {
      case '.exit':
        rl.close();
        return;
      case 'ls':
        await list(pathToWorkingDirectory);
        break;
      case 'cd':
        pathToWorkingDirectory = await cd(pathToWorkingDirectory, args[0]);
        break;
      case 'up':
        pathToWorkingDirectory = up(pathToWorkingDirectory);
      case '':
        break;
      default:
        console.log(ERROR_COLOR_TEMPLATE, INVALID_INPUT_MESSAGE);
        break;
    }

    console.log(`You are currently in ${pathToWorkingDirectory}`);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  });
};

start();
