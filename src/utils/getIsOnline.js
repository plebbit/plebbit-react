import moment from 'moment';

const getIsOnline = (time) =>
  moment(time * 1000).isBetween(moment().subtract(1, 'hour').subtract(30, 'minutes'), undefined);

export default getIsOnline;
