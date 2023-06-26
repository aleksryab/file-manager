import { readdir } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, WARNING_COLOR_TEMPLATE } from '../constants.js';

const ls = async (pathToDir) => {
  try {
    const dirInfo = await readdir(pathToDir, { withFileTypes: true });

    const tabulaData = dirInfo.map((item) => {
      let type = 'unknown';
      if (item.isFile()) type = 'file';
      if (item.isDirectory()) type = 'directory';
      if (item.isSymbolicLink()) type = 'symbolic link';
      return { Name: item.name, Type: type };
    });

    tabulaData.sort((a, b) => (a.Type > b.Type ? 1 : b.Type > a.Type ? -1 : 0));

    if (tabulaData.length) {
      console.table(tabulaData);
    } else {
      console.log(WARNING_COLOR_TEMPLATE, 'Directory is empty');
    }
  } catch {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default ls;
