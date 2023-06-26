import { join, isAbsolute, normalize, parse, sep } from 'node:path';

const getAbsolutePath = (pathToWorkingDir, pathToTargetDir) => {
  let absoluteTargetPath;

  if (isAbsolute(pathToTargetDir)) {
    const targetPathObj = parse(normalize(pathToTargetDir));
    let targetRoot = targetPathObj.root.toUpperCase();

    if (targetRoot === sep) {
      const currentRoot = parse(pathToWorkingDir).root.toUpperCase();
      absoluteTargetPath = join(currentRoot, pathToTargetDir);
    } else {
      absoluteTargetPath = join(
        targetRoot,
        targetPathObj.dir.replace(targetPathObj.root, ''),
        targetPathObj.base
      );
    }
  } else {
    absoluteTargetPath = join(pathToWorkingDir, pathToTargetDir);
  }

  return absoluteTargetPath;
};

export default getAbsolutePath;
