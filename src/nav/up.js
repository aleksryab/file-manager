import { join } from 'node:path';

const up = (currentPathToWorkingDir) => {
  return join(currentPathToWorkingDir, '..');
};

export default up;
