import React, { useState, useEffect } from 'react';

import Converter from './functions/Converter';
import nConverter from './functions/nConverter';
import UpdateTime from './functions/UpdateTime';

import wdata from './json/wdata.json';

import { weatherApi } from './api';

let x;
let y;

const base_date = UpdateTime()[0];
const base_time = UpdateTime()[1];

//api에 요청할 때 필요한 연도, 월, 일 조건

function Weather() {
  const [tdata, setTdata] = useState();
  const [
    data = {
      baseTime: 'null',
      TMP: 'null',

      WSD: 'null',
      SKY: 'null',
      PTY: 'null',
      POP: 'null',
      PCP: 'null',
      REH: 'null',
    },
    setData,
  ] = useState();

  /**api items array 
    [0] = tmp 1시간 기온
    [1] = UUU 풍속(동서성분)
    [2] = VVV 풍속(남북성분)
    [3] = VEC 풍향
    [4] = WSD 풍속
    [5] = SKY 하늘 상태
    [6] = PTY 강수 형태
    [7] = POP 강수확률
    [8] = PCP 1시간 강수량
    [9] = REH 습도 */

  const getData = async (x, y) => {
    console.log('getData');
    const {
      data: {
        response: {
          body: {
            items: { item }, //item은 해당 시간의 기상 상태를 obj arr로 받은 값이다.
          },
        },
      },
    } = await weatherApi.getWeather(base_date, base_time, x, y);
    setTdata(item);
  };

  // 격자 좌표를 받아 API를 호출하여 해당 시간의 데이터를 받는다.
  const converter = (latitude, longitude) => {
    console.log('convertered');
    const location = Converter(latitude, longitude);
    getData(location.x, location.y);
    x = location.x;
    y = location.y;

    // console.log(typeof x, typeof y); 좌표 타입 체크
  };

  useEffect(() => {
    // 현재 위치를 받고, 기상청식 격자 좌표를 converter로 변환한다.
    navigator.geolocation.getCurrentPosition((position) => {
      converter(position.coords.latitude, position.coords.longitude);
    });
    console.log('mounted');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //state의 데이터가 arr에 들어오기까지 기다리고 데이터를 추출한다.
  function make() {
    if (tdata != null) {
      //state의 obj arr에서 원하는 데이터 추출
      const data = {
        baseTime: tdata[0].baseTime, //현재 시간
        TMP: tdata[0].fcstValue, // 기온s
        WSD: tdata[4].fcstValue, // 풍속
        SKY: tdata[5].fcstValue, // 하늘 상태
        PTY: tdata[6].fcstValue, //  기후 상태
        POP: tdata[7].fcstValue, // 강수 확률
        PCP: tdata[8].fcstValue, // 시간당 강수량
        REH: tdata[9].fcstValue, // 습도
      };

      //         //추출한 데이터를 가공
      const result = {
        baseTime: tdata[0].baseTime,
        tmp: data.TMP, // 기온
        wsd: data.WSD, // 풍속 m/s
        sky: nConverter('SKY', data.SKY),
        pty: nConverter('PTY', data.PTY),
        pop: data.POP, // 강수 확률 %
        pcp: nConverter('PCP', data.PCP),
        reh: data.REH,
      };

      return result;
    } else {
      const result = {
        baseTime: 'null',
        tmp: 'null',
        wsd: 'null',
        sky: 'null',
        pty: 'null',
        pop: 'null',
        pcp: 'null',
        reh: 'null',
      };

      return result;
    }
  }

  let arr = [];

  Object.keys(wdata.location).map(function (index) {
    if (
      x === wdata.location[index]['격자 X'] &&
      y === wdata.location[index]['격자 Y']
    ) {
      arr.push({
        Province: wdata.location[index]['1단계'],
        City: wdata.location[index]['2단계'],
        Town: wdata.location[index]['3단계'],
      });
    }
    return arr;
  });

  useEffect(() => {
    if (tdata != null) {
      setData({
        baseTime: tdata[0].baseTime, //현재 시간
        TMP: tdata[0].fcstValue, // 기온s
        WSD: tdata[4].fcstValue, // 풍속
        SKY: tdata[5].fcstValue, // 하늘 상태
        PTY: tdata[6].fcstValue, //  기후 상태
        POP: tdata[7].fcstValue, // 강수 확률
        PCP: tdata[8].fcstValue, // 시간당 강수량
        REH: tdata[9].fcstValue, // 습도
      });
    }
    console.log(data);
  }, [setTdata]);

  return (
    <div>
      <h1>TODAYS</h1>
      <h2>업데이트 시간 : {make().baseTime}</h2>
      <h2>기온 : {make().tmp}도</h2>
      <h2>풍속 : {make().wsd}m/s</h2>
      <h2>기후 상태 : {make().pty}</h2>
      <h2>하늘 상태 : {make().sky}</h2>
      <h2>강수 확률 : {make().pop}%</h2>
      <h2>시간 당 강수량 : {make().pcp}</h2>
      <h2>습도 : {make().reh}%</h2>
      {data.baseTime}
    </div>
  );
}
export default Weather;
