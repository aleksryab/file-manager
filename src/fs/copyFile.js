import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, parse } from 'node:path';
import getAbsolutePath from '../helpers/getAbsolutePath.js';
import isPathExist from '../helpers/isPathExist.js';

const copyFile = async (pathToWorkingDirectory, pathToFile, pathToNewDir) => {
  const absolutePathToFile = getAbsolutePath(pathToWorkingDirectory, pathToFile);
  const absolutePathToNewDir = getAbsolutePath(pathToWorkingDirectory, pathToNewDir);
  const pathToCopyFile = join(absolutePathToNewDir, parse(pathToFile).base);

  if (!(await isPathExist(absolutePathToNewDir))) throw new Error('no such directory');
  if (!(await isPathExist(absolutePathToFile))) throw new Error('no such file');
  if (await isPathExist(pathToCopyFile)) throw new Error('file already exists');

  const inputStream = createReadStream(absolutePathToFile);
  const outputStream = createWriteStream(pathToCopyFile);
  await pipeline(inputStream, outputStream);

  return pathToCopyFile;
};

export default copyFile;
