//@ts-check

import Formatter from './Formatter';

const date = new Date(); //현재 시간 객체

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

let fixYear = 0;
let fixMonth = 0;
let fixDay = 0;
let fixTime = 0;

// api 갱신시간에 따라 요청하는 basetime, basedate를 변경한다.
const UpdateTime = () => {
  const past = new Date();

  const TWO = 2;
  const FIVE = 5;
  const EIGHT = 8;
  const ELEVEN = 11;
  const FOURTEEN = 14;
  const SEVENTEEN = 17;
  const TWENTY = 20;
  const TWENTYTHREE = 23;

  // 02 05 08 11 14 17 20 23 => api 갱신 대상 시간
  // 위의 시간에 10분 뒤에 api가 업데이트가 되므로 10분을 기준으로 구성한다.
  // 현재 시간이 3시간 간격 안에서 ex 현재 03시다 0210 ~ 0509에 해당하므로 0200 처리를 해야한다.

  if (minutes > 10) {
    // eslint-disable-next-line default-case
    if (hours >= 2 && hours < 5) {
      saveFixedData(year, month, day, TWO);
    } else if (hours >= 5 && hours < 8) {
      saveFixedData(year, month, day, FIVE);
    } else if (hours >= 8 && hours < 11) {
      saveFixedData(year, month, day, EIGHT);
    } else if (hours >= 11 && hours < 14) {
      saveFixedData(year, month, day, ELEVEN);
    } else if (hours >= 14 && hours < 17) {
      saveFixedData(year, month, day, FOURTEEN);
    } else if (hours >= 17 && hours < 20) {
      saveFixedData(year, month, day, SEVENTEEN);
    } else if (hours >= 20 && hours < 23) {
      saveFixedData(year, month, day, TWENTY);
    } else if (hours >= 23 || hours < 2) {
      fixTime = TWENTYTHREE;
      if (hours >= 0 && hours < 2) {
        past.setDate(past.getDate() - 1);
        fixYear = past.getFullYear();
        fixMonth = past.getMonth() + 1;
        fixDay = past.getDate();
      } else {
        saveFixedData(year, month, day, TWENTYTHREE);
      }
    }

    const resultArray = [
      `${fixYear}${Formatter(fixMonth)}${Formatter(fixDay)}`,
      `${Formatter(fixTime)}00`,
    ];

    console.log(resultArray);

    return resultArray;
  } else {
    // eslint-disable-next-line default-case
    if (hours > 2 && hours <= 5) {
      saveFixedData(year, month, day, TWO);
    } else if (hours > 5 && hours <= 8) {
      saveFixedData(year, month, day, FIVE);
    } else if (hours > 8 && hours <= 11) {
      saveFixedData(year, month, day, EIGHT);
    } else if (hours > 11 && hours <= 14) {
      saveFixedData(year, month, day, ELEVEN);
    } else if (hours > 14 && hours <= 17) {
      saveFixedData(year, month, day, FOURTEEN);
    } else if (hours > 17 && hours <= 20) {
      saveFixedData(year, month, day, SEVENTEEN);
    } else if (hours > 20 && hours <= 23) {
      saveFixedData(year, month, day, TWENTY);
    } else if (hours > 23 || hours <= 2) {
      fixTime = TWENTYTHREE;
      if (hours >= 0 && hours <= 2) {
        past.setDate(past.getDate() - 1);
        fixYear = past.getFullYear();
        fixMonth = past.getMonth() + 1;
        fixDay = past.getDate();
      } else {
        saveFixedData(year, month, day, TWENTYTHREE);
      }
    }
    const resultArray = [
      `${fixYear}${Formatter(fixMonth)}${Formatter(fixDay)}`,
      `${Formatter(fixTime)}00`,
    ];

    console.log(resultArray);

    return resultArray;
  }
};

function saveFixedData(year, month, day, time) {
  fixYear = year;
  fixMonth = month;
  fixDay = day;
  fixTime = time;
}

export default UpdateTime;
