import { open } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const add = async (pathToWorkingDirectory, newFileName) => {
  if (!newFileName) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const pathToFile = getAbsolutePath(pathToWorkingDirectory, newFileName);
    await open(pathToFile, 'wx');
    console.log(SUCCESS_COLOR_TEMPLATE, `File created: ${pathToFile}`);
  } catch (err) {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};
export default add;
