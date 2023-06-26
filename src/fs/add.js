import { open } from 'node:fs/promises';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import {
  ERROR_COLOR_TEMPLATE,
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';

const add = async (pathToWorkingDirectory, newFileName) => {
  if (!newFileName) {
    console.log(ERROR_COLOR_TEMPLATE, INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const pathTofFile = getAbsolutePath(pathToWorkingDirectory, newFileName);
    await open(pathTofFile, 'wx');
    console.log(SUCCESS_COLOR_TEMPLATE, `File created: ${pathTofFile}`);
  } catch (err) {
    console.log(ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE);
  }
};
export default add;
