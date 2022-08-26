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

export const getSubName = (sub) => {
  let username = '';
  if (sub?.title) {
    username += sub?.title;
    if (username.length > 20) {
      username = username?.substring(0, 20);
    }
    username += ' ';
  }
  username += 'p/';
  if (sub?.address?.includes('.')) {
    username += sub?.address ? sub?.address : '';
  } else {
    username += sub?.address?.substring(0, 14);
  }
  return username;
};

export const getAddress = (add) => {
  if (add?.includes('.')) {
    return add;
  } else {
    return truncateString(add, 14);
  }
};
