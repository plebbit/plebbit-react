import Logger from '@plebbit/plebbit-logger';

export const logger = (name, data, type) => {
  const log = Logger(`plebbit-react:${name?.replace(/ /g, '')}`);
  return type === 'trace' ? log.trace(data) : type === 'error' ? log.error(data) : log(data);
};

export default logger;
