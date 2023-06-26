import { createReadStream } from 'node:fs';
import { finished } from 'node:stream/promises';
import { EOL } from 'node:os';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import {
  ERROR_COLOR_TEMPLATE,
  INVALID_INPUT_MESSAGE,
  OPERATION_FAILED_MESSAGE,
} from '../constants.js';

const cat = async (pathToWorkingDirectory, pathToFile) => {
  if (!pathToFile) {
    console.log(ERROR_COLOR_TEMPLATE, INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    const readableStream = createReadStream(absolutePathToFile, { encoding: 'utf8' });
    readableStream.on('data', (chunk) => process.stdout.write(chunk));

    await finished(readableStream);
    process.stdout.write(EOL);
  } catch {
    console.log(ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE);
  }
};

export default cat;
