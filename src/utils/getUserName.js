import truncateString from './truncateString';

const getUserName = (author) => {
  let username = '';
  if (author?.displayName) {
    username += author?.displayName;
    if (username.length > 20) {
      username = username ? username?.substring(0, 20) : '';
    }
    username += ' ';
  }
  username += 'u/';

  username += author?.shortAddress ? author?.shortAddress : author?.address?.substring(0, 20);

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

  username += sub?.shortAddress ? sub?.shortAddress : sub?.address?.substring(0, 20);

  return username;
};

export const getAddress = (add) => {
  if (add?.includes('.')) {
    return add;
  } else {
    return truncateString(add, 20);
  }
};
