import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, parse } from 'node:path';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import isFileExist from '../helpers/isFileExist.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
  BROTLI_EXT,
} from '../constants.js';

const decompress = async (pathToWorkingDirectory, pathToFile, pathToDestination = '.') => {
  if (!pathToFile) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    const absolutePathToDestination = getAbsolutePath(pathToWorkingDirectory, pathToDestination);

    const pathToDestinationObj = parse(pathToDestination);
    let targetPath = absolutePathToDestination;

    if (!pathToDestinationObj.ext) {
      const targetFileName = parse(pathToFile).base.replace(BROTLI_EXT, '');
      targetPath = join(absolutePathToDestination, targetFileName);
    } else {
      targetPath = targetPath.replace(BROTLI_EXT, '');
    }

    if (!(await isFileExist(absolutePathToFile))) throw new Error('No such file');
    if (await isFileExist(targetPath)) throw new Error('File already exists');

    await pipeline(
      createReadStream(absolutePathToFile),
      createBrotliDecompress(),
      createWriteStream(targetPath)
    );

    console.log(SUCCESS_COLOR_TEMPLATE, `Decompression done: ${targetPath}`);
  } catch (err) {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default decompress;
