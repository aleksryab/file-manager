import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, parse } from 'node:path';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
} from '../constants.js';
import isFileExist from '../helpers/isFileExist.js';

export const copyFile = async (pathToWorkingDirectory, pathToFile, pathToNewDir) => {
  const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
  const absolutePathToNewDir = getAbsolutePath(pathToWorkingDirectory, pathToNewDir);
  const pathToCopyFile = join(absolutePathToNewDir, parse(pathToFile).base);

  if (!(await isFileExist(absolutePathToFile))) throw new Error('No such file');
  if (await isFileExist(pathToCopyFile)) throw new Error('File already exists');

  const inputStream = createReadStream(absolutePathToFile);
  const outputStream = createWriteStream(pathToCopyFile);
  await pipeline(inputStream, outputStream);

  return pathToCopyFile;
};

const cp = async (pathToWorkingDirectory, pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const pathToCopyFile = await copyFile(pathToWorkingDirectory, pathToFile, pathToNewDir);
    console.log(SUCCESS_COLOR_TEMPLATE, `File copied: ${pathToCopyFile}`);
  } catch (err) {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default cp;
