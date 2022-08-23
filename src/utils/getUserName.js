import truncateString from './truncateString';

const getUserName = (author) => {
  let username = '';
  if (author?.displayName) {
    username += author?.displayName;
    if (username.length > 20) {
      username = username?.substring(0, 20);
    }
    username += ' ';
  }
  username += 'u/';
  if (author?.address?.includes('.')) {
    username += author?.address;
  } else {
    username += author?.address?.substring(0, 14);
  }
  return username;
};

export default getUserName;

export const getAddress = (add) => {
  if (add?.includes('.')) {
    return add;
  } else {
    return truncateString(add, 14);
  }
};
