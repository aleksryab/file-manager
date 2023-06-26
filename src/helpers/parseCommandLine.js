const parseCommandLine = (commandLine) => {
  const cleanedCommandLine = commandLine.trim().replace(/\s\s+/g, ' ');
  const commandSlices = cleanedCommandLine.match(/[^\s"']+|["'][^"']+["']/g);

  if (!commandSlices) return { command: null, args: [] };

  const command = commandSlices[0];
  const args = commandSlices.splice(1).map((slice) => slice.replace(/['"]/g, ''));
  return { command, args };
};

export default parseCommandLine;
