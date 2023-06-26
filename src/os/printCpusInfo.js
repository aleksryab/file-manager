import { cpus } from 'node:os';

const printCpusInfo = () => {
  const cpusInfo = cpus();
  const tabulaData = cpusInfo.map((cpu) => ({
    ['Model']: cpu.model,
    ['Speed(GHz)']: cpu.speed / 1000,
  }));
  console.table(tabulaData);
};

export default printCpusInfo;
