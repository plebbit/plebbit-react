import moment from 'moment';

function dateToFromNowDaily(myDate) {
  // get from-now for this date
  // console.log('date', myDate);
  const fromNow = moment(myDate).fromNow();
  // var fromNow = <Moment fromNow>{myDate}</Moment>

  return fromNow;
}

export default dateToFromNowDaily;

export function dateToNow(myDate) {
  // get from-now for this date
  // console.log('date', myDate);

  const toNow = moment(myDate).toNow(true);
  // var fromNow = <Moment fromNow>{myDate}</Moment>

  return toNow;
}

export function dateFormater(date) {
  return moment(date).format('LL');
}
