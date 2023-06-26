import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import { INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE } from '../constants.js';

const hash = async (pathToWorkingDirectory, pathToFile) => {
  if (!pathToFile) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  try {
    const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
    const data = await readFile(absolutePathToFile);
    const hash = createHash('sha256').update(data).digest('hex');
    console.log(`Hash: ${hash}`);
  } catch {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default hash;
