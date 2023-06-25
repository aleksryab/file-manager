import * as readline from 'node:readline/promises';
import { homedir } from 'node:os';
import getUserName from './helpers/getUserName.js';
import list from './list.js';
import { INVALID_INPUT_MESSAGE } from './constants.js';

const EXIT_COMMAND = '.exit';

const start = () => {
  const userName = getUserName(process.argv);
  const pathToWorkingDirectory = homedir();

  console.log(`Welcome to the File Manager, ${userName}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`You are currently in ${pathToWorkingDirectory}`);
  rl.prompt();

  rl.on('line', async (input) => {
    const command = input.trim();
    if (command === EXIT_COMMAND) {
      rl.close();
    } else {
      switch (command) {
        case 'ls':
          await list(pathToWorkingDirectory);
          break;

        default:
          console.log(INVALID_INPUT_MESSAGE);
          break;
      }

      console.log(`You are currently in ${pathToWorkingDirectory}`);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  });
};

start();
