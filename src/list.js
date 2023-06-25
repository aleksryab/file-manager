import { readdir } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from './constants.js';

const list = async (pathToDir) => {
  try {
    const dirInfo = await readdir(pathToDir, { withFileTypes: true });

    const tabulaData = dirInfo.map((item) => {
      const type = item.isFile() ? 'file' : 'directory';
      return { Name: item.name, Type: type };
    });

    tabulaData.sort((a, b) => (a.Type > b.Type ? 1 : b.Type > a.Type ? -1 : 0));

    console.table(tabulaData);
  } catch {
    console.log(OPERATION_FAILED_MESSAGE);
  }
};

export default list;
