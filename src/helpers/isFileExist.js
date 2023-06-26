import { access } from 'node:fs/promises';

const isFileExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export default isFileExist;
