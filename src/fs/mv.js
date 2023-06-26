import { rm } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import { copyFile } from './cp.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
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
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default mv;
