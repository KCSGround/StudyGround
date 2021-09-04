// @ts-check

import axios from 'axios';

// 공공데이터 기상청 API를 받아오기 위한 serviceKey
const serviceKey = `ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D`;

// serviceKey 가 axios 를 거치면서 주소값이 변하기 때문에 decode 해준다.
const DECODE_KEY = decodeURI(serviceKey);

// axios create 를 통해서 baseURL, 파라미터로 들어가는 공통 값을 가져오는 레퍼런스 초기화
const api = axios.create({
  baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0',
  params: {
    dataType: 'JSON', // JSON Type 으로 AJAX 처리를 해준다.
    numOfRows: '10', // 페이지 당 받아오는 행의 수, default 10 으로 준다.
    pageNo: '1', // 페이지 번호
  },
});

// api.get() 을 통해서 공공데이터를 통해서 가져오는 REST 처리
export const weatherApi = {
  /**
   *
   * @param {String} baseDate  정보를 가져오는 날짜
   * @param {String} baseTime  정보를 가져오는 시간(업데이트 된 시간)
   * @param {String} x 격자 좌표 변환
   * @param {String} y 격자 좌표 변환
   * @returns
   */
  getWeather: (baseDate, baseTime, x, y) =>
    // serviceKey 가 위에 params 로 들어가면 URL 이 변경되는 오류가 있음.
    api.get(`getVilageFcst?serviceKey=${DECODE_KEY}`, {
      params: {
        base_date: baseDate,
        base_time: baseTime,
        nx: x,
        ny: y,
      },
    }),
};
