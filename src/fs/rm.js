import { rm as removeFile } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const rm = async (pathToWorkingDirectory, pathToFile) => {
  if (!pathToFile) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    await removeFile(absolutePathToFile);
    console.log(SUCCESS_COLOR_TEMPLATE, 'File removed');
  } catch {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default rm;
