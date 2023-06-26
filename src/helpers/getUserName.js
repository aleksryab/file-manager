const USER_NAME_ARG_KEY = '--username=';
const DEFAULT_USER_NAME = 'Anonymous';

const getUserName = (cliArgs) => {
  const userNameArg = cliArgs.find((arg) => arg.startsWith(USER_NAME_ARG_KEY));
  if (!userNameArg) return DEFAULT_USER_NAME;

  const userName = userNameArg.split('=')[1];
  return userName ? userName : DEFAULT_USER_NAME;
};

export default getUserName;
