import parseCommandLine from './helpers/parseCommandLine.js';
import cd from './cd.js';
import list from './list.js';
import up from './up.js';
import { ERROR_COLOR_TEMPLATE, INVALID_INPUT_MESSAGE } from './constants.js';

const executeCommand = async (pathToWorkingDirectory, commandLine, exitCallBack) => {
  const { command, args } = parseCommandLine(commandLine);
  console.log(command, args);

  switch (command) {
    case '.exit':
      exitCallBack();
      return pathToWorkingDirectory;
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
  return pathToWorkingDirectory;
};

export default executeCommand;
