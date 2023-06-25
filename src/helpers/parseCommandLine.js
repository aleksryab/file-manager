const parseCommandLine = (commandLine) => {
  const cleanedCommandLine = commandLine.trim().replace(/\s\s+/g, ' ');
  if (!cleanedCommandLine) return { command: '', args: [] };

  const commandSlices = cleanedCommandLine
    .match(/[^\s"']+|["'][^"']+["']/g)
    .map((slice) => slice.replace(/['"]/g, ''));

  const command = commandSlices[0];
  const args = commandSlices.splice(1);
  return { command, args };
};

export default parseCommandLine;
