import { rename } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import isPathExist from '../helpers/isPathExist.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const rn = async (pathToWorkingDirectory, pathToFile, newFileName) => {
  if (!pathToFile || !newFileName) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const oldPathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    const newPathToFile = getAbsolutePath(pathToWorkingDirectory, newFileName);

    if (await isPathExist(newPathToFile)) throw new Error(OPERATION_FAILED_MESSAGE);

    await rename(oldPathToFile, newPathToFile);
    console.log(SUCCESS_COLOR_TEMPLATE, `File renamed: ${newPathToFile}`);
  } catch {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default rn;
