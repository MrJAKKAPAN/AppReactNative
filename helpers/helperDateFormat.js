import react from 'react'
import 'moment/locale/th';
import moment from 'moment';
import numeral from 'numeral'



export const formatComma = (number = '') => numeral(number).format('0,0');

export const formatCommaDecimal = (number = '') => numeral(number).format('0,0.00');

export const getThaiDay = (momentObj) => {
  const _momentObj = moment(momentObj).add(543, 'year');
  return `${momentObj.format('DD MMMM')} ${_momentObj.format('YYYY')}`;
};

export const getRoundDateString = (_roundDate) => {
  if (_roundDate) {
    const momentObj = moment(`${_roundDate.slice(0, 5)}-25${_roundDate.slice(-2)}`, 'DD-MM-YYYY');
    return `${momentObj.format('DD MMMM YYYY')}`;
  }
  return '';
};