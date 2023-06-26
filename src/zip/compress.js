import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, parse } from 'node:path';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import isPathExist from '../helpers/isPathExist.js';
import {
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
  SUCCESS_COLOR_TEMPLATE,
  BROTLI_EXT,
} from '../constants.js';

const compress = async (pathToWorkingDirectory, pathToFile, pathToDestination = '.') => {
  if (!pathToFile) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    const absolutePathToDestination = getAbsolutePath(pathToWorkingDirectory, pathToDestination);

    const pathToDestinationObj = parse(pathToDestination);
    let archivePath = absolutePathToDestination;

    if (!pathToDestinationObj.ext) {
      const archiveName = parse(pathToFile).base + BROTLI_EXT;
      archivePath = join(absolutePathToDestination, archiveName);
    } else {
      const archiveExt = pathToDestinationObj.ext === BROTLI_EXT ? '' : BROTLI_EXT;
      archivePath += archiveExt;
    }

    if (!(await isPathExist(absolutePathToFile))) throw new Error('No such file');
    if (await isPathExist(archivePath)) throw new Error('File already exists');

    await pipeline(
      createReadStream(absolutePathToFile),
      createBrotliCompress(),
      createWriteStream(archivePath)
    );
    console.log(SUCCESS_COLOR_TEMPLATE, `Compression done: ${archivePath}`);
  } catch (err) {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default compress;
