import { rm } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import copyFile from './copyFile.js';
import {
  ERROR_COLOR_TEMPLATE,
  INVALID_INPUT_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const mv = async (pathToWorkingDirectory, pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const pathToCopyFile = await copyFile(pathToWorkingDirectory, pathToFile, pathToNewDir);
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    await rm(absolutePathToFile);
    console.log(SUCCESS_COLOR_TEMPLATE, `File moved: ${pathToCopyFile}`);
  } catch (err) {
    console.log(ERROR_COLOR_TEMPLATE, `Operation failed: ${err.message}`);
  }
};

export default mv;
