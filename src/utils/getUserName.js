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
  if (author?.address.endsWith('.eth')) {
    username += author?.address;
  } else {
    username += author?.address.substring(0, 14);
  }
  return username;
};

export default getUserName;
