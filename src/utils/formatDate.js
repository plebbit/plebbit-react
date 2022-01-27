import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

function dateToFromNowDaily(myDate) {
  // get from-now for this date
  // console.log('date', myDate);
  const fromNow = moment(myDate).fromNow();
  // var fromNow = <Moment fromNow>{myDate}</Moment>

  const calendarStrings = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: () => `[ ${fromNow} ]`,
  };

  return <Moment calendar={calendarStrings}>{myDate}</Moment>;
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
  const formatedDate = `${moment(`${date}`).format('Do MMM, yyyy')} at ${moment(`${date}`).format(
    'LT'
  )}
  `;
  return formatedDate;
}
