import Debug from 'debug';

export const logger = (name, ...data) => {
  const log = Debug(`plebbit-react:${name}`);
  return log(...data);
};

export default logger;
