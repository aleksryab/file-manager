import { stat } from 'node:fs/promises';
import { ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE } from '../constants.js';
import getAbsolutePath from '../helpers/getAbsolutePath.js';

const cd = async (currentPathToWorkingDir, pathToTargetDir) => {
  if (!pathToTargetDir) return currentPathToWorkingDir;

  const absoluteTargetPath = getAbsolutePath(currentPathToWorkingDir, pathToTargetDir);

  try {
    const stats = await stat(absoluteTargetPath);
    if (!stats.isDirectory()) throw new Error(OPERATION_FAILED_MESSAGE);
    return absoluteTargetPath;
  } catch {
    console.log(ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE);
    return currentPathToWorkingDir;
  }
};

export default cd;
