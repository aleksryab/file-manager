import * as readline from 'node:readline/promises';
import getUserName from './helpers/getUserName.js';

const EXIT_COMMAND = '.exit';

const start = () => {
  const userName = getUserName(process.argv);
  console.log(`Welcome to the File Manager, ${userName}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();
  rl.on('line', (input) => {
    const command = input.trim();
    if (command === EXIT_COMMAND) {
      rl.close();
    } else {
      console.log('Command');
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  });
};

start();
