import copyFile from './copyFile.js';
import {
  ERROR_COLOR_TEMPLATE,
  INVALID_INPUT_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const cp = async (pathToWorkingDirectory, pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const pathToCopyFile = await copyFile(pathToWorkingDirectory, pathToFile, pathToNewDir);
    console.log(SUCCESS_COLOR_TEMPLATE, `File copied: ${pathToCopyFile}`);
  } catch (err) {
    console.log(ERROR_COLOR_TEMPLATE, `Operation failed: ${err.message}`);
  }
};

export default cp;
