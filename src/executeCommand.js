import parseCommandLine from './helpers/parseCommandLine.js';
import cd from './cd.js';
import list from './list.js';
import up from './up.js';
import { add, cat, cp, mv, rm, rn } from './fs/index.js';
import os from './os/index.js';
import hash from './crypto/hash.js';
import { compress } from './zip/index.js';
import { INVALID_INPUT_MESSAGE } from './constants.js';

const executeCommand = async (pathToWorkingDirectory, commandLine, exitCallBack) => {
  const { command, args } = parseCommandLine(commandLine);
  console.log(command, args);

  switch (command) {
    case '.exit':
      exitCallBack();
      break;
    case 'ls':
      await list(pathToWorkingDirectory);
      break;
    case 'cd':
      pathToWorkingDirectory = await cd(pathToWorkingDirectory, args[0]);
      break;
    case 'up':
      pathToWorkingDirectory = up(pathToWorkingDirectory);
      break;
    case 'cat':
      await cat(pathToWorkingDirectory, args[0]);
      break;
    case 'add':
      await add(pathToWorkingDirectory, args[0]);
      break;
    case 'rn':
      await rn(pathToWorkingDirectory, args[0], args[1]);
      break;
    case 'cp':
      await cp(pathToWorkingDirectory, args[0], args[1]);
      break;
    case 'mv':
      await mv(pathToWorkingDirectory, args[0], args[1]);
      break;
    case 'rm':
      await rm(pathToWorkingDirectory, args[0]);
      break;
    case 'os':
      os(args[0]);
      break;
    case 'hash':
      await hash(pathToWorkingDirectory, args[0]);
      break;
    case 'compress':
      await compress(pathToWorkingDirectory, args[0], args[1]);
      break;
    case null:
      break;
    default:
      console.log(INVALID_INPUT_MESSAGE);
      break;
  }
  return pathToWorkingDirectory;
};

export default executeCommand;
