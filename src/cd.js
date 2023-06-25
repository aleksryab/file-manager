import { stat } from 'node:fs/promises';
import { join, isAbsolute, normalize, parse, sep } from 'node:path';
import { ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE } from './constants.js';

const cd = async (currentPathToWorkingDir, pathToTargetDir) => {
  if (!pathToTargetDir) return currentPathToWorkingDir;
  let fullTargetPath;

  if (isAbsolute(pathToTargetDir)) {
    const targetPathObj = parse(normalize(pathToTargetDir));
    let targetRoot = targetPathObj.root.toUpperCase();

    if (targetRoot === sep) {
      const currentRoot = parse(currentPathToWorkingDir).root.toUpperCase();
      fullTargetPath = join(currentRoot, pathToTargetDir);
    } else {
      fullTargetPath = join(
        targetRoot,
        targetPathObj.dir.replace(targetPathObj.root, ''),
        targetPathObj.base
      );
    }
  } else {
    fullTargetPath = join(currentPathToWorkingDir, pathToTargetDir);
  }

  try {
    const stats = await stat(fullTargetPath);
    if (!stats.isDirectory()) throw new Error(OPERATION_FAILED_MESSAGE);
    return fullTargetPath;
  } catch {
    console.log(ERROR_COLOR_TEMPLATE, OPERATION_FAILED_MESSAGE);
    return currentPathToWorkingDir;
  }
};

export default cd;
