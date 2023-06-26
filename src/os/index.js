import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { INVALID_INPUT_MESSAGE } from '../constants.js';
import printCpusInfo from './printCpusInfo.js';

const os = (param) => {
  if (!param) {
    console.log(INVALID_INPUT_MESSAGE);
    return;
  }

  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      printCpusInfo();
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      console.log(INVALID_INPUT_MESSAGE);
      break;
  }
};

export default os;
