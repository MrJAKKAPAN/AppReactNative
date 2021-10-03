import { get, omitBy, isNil, sumBy } from "lodash";

import "moment/locale/th";
import moment from "moment";

import numeral from "numeral";

export const formatComma = (number = "") => numeral(number).format("0,0");

export const formatCommaDecimal = (number = "") =>
  numeral(number).format("0,0.00");
// parseFloat(number)
//   .toFixed(2)
//   .toString()
//   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const getThaiDay = (momentObj) => {
  const _momentObj = moment(momentObj).add(543, "year");
  return `${momentObj.format("DD MMMM")} ${_momentObj.format("YYYY")}`;
};

export const getRoundDateString = (_roundDate) => {
  if (_roundDate) {
    const momentObj = moment(
      `${_roundDate.slice(0, 5)}-25${_roundDate.slice(-2)}`,
      "DD-MM-YYYY"
    );
    return `${momentObj.format("DD MMMM YYYY")}`;
  }
  return "";
};
export const encrypt = (numbers) => {
  return parseInt(
    String(numbers)
      .slice(1)
      .split("")
      .map((x, i) => String(parseInt(x) + i).slice(-1))
      .reverse()
      .join("")
  ).toString(36);
};
export const decrypt = (numbers) => {
  return (
    "0" +
    String(parseInt(numbers, 36))
      .split("")
      .reverse()
      .map((x, i) => String(parseInt(x) + 10 - i).slice(-1))
      .join("")
  );
};
