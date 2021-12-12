/**
 * 數字轉換成2位數 ex. 1 => 01
 *
 * @param number {String} 數字
 * @return {String}
 */
const toDoubleDigit = (number) => {
  return number < 10 && number > 0 ? `0${number}` : `${number}`;
};

/**
 * 日期轉換成 yyyy/mm/dd
 *
 * @param date {String || Date Object} 日期
 * @return {String}
 */
const convertToDateString = (date = new Date()) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${toDoubleDigit(
    dateObj.getMonth() + 1
  )}/${toDoubleDigit(dateObj.getDate())}`;
};
export { toDoubleDigit, convertToDateString };
