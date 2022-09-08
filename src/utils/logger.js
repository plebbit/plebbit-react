import Debug from 'debug';

export const logger = (name, data, type) => {
  const log = Debug(`plebbit-react:${name}`);
  return type ? log[type](data) : log(data);
};

export default logger;
