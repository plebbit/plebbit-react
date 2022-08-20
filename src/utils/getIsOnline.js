import moment from 'moment';

const getIsOnline = (time) =>
  moment(time * 1000).isBetween(moment().subtract(1, 'hour'), undefined);

export default getIsOnline;
