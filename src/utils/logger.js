import Debug from 'debug';

export const logger = (name, data, type) => {
  const log = Debug(`plebbit-react:${name}`);
  return type === 'trace' ? log.trace(data) : type === 'error' ? log.error(data) : log(data);
};

export default logger;
