// @ts-check

/**
 *
 * @param {Number} number
 * @returns 변환된 숫자 : 한 자리 숫자는 앞에 0 을 붙인다.
 */
const Formatter = (number) => {
  // 만약 2자리 밑이라면
  if (String(number).length < 2) {
    const formattedNumber = '0' + String(number);

    return formattedNumber;
  } else {
    // 만약 2자리면 그대로 리턴
    return String(number);
  }
};

export default Formatter;
