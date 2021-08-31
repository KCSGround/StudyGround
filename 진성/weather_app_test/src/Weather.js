import React, { Component } from "react";
import axios from "axios";
import Converter from "./Converter";
import nConverter from "./nConverter";
import wdata from "./wdata";

const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

let x;
let y;

const date = new Date(); //현재 시간 객체

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

const base_time = `${today(timeChecker()[3])}00`; //api에 요청할 때 필요한 시간 조건
const base_date = `${timeChecker()[0]}${today(timeChecker()[1])}${today(timeChecker()[2])}`; //api에 요청할 때 필요한 연도, 월, 일 조건

// api 갱신시간에 따라 요청하는 basetime, basedate를 변경한다.
function timeChecker() {
    const past = new Date();

    const TWO = 2;
    const FIVE = 5;
    const EIGHT = 8;
    const ELEVEN = 11;
    const FOURTEEN = 14;
    const SEVENTEEN = 17;
    const TWENTY = 20;
    const TWENTYTHREE = 23;

    let fixYear = 0;
    let fixMonth = 0;
    let fixDay = 0;
    let fixTime = 0;

    // 02 05 08 11 14 17 20 23 => api 갱신 대상 시간
    // 위의 시간에 10분 뒤에 api가 업데이트가 되므로 10분을 기준으로 구성한다.
    // 현재 시간이 3시간 간격 안에서 ex 현재 03시다 0210 ~ 0509에 해당하므로 0200 처리를 해야한다.

    if (minutes > 10) {
        // eslint-disable-next-line default-case
        if (hours >= 2 && hours < 5) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = TWO;
        } else if (hours >= 5 && hours < 8) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = FIVE;
        } else if (hours >= 8 && hours < 11) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = EIGHT;
        } else if (hours >= 11 && hours < 14) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = ELEVEN;
        } else if (hours >= 14 && hours < 17) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = FOURTEEN;
        } else if (hours >= 17 && hours < 20) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = SEVENTEEN;
        } else if (hours >= 20 && hours < 23) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = TWENTY;
        } else if (hours >= 23 || hours < 2) {
            fixTime = TWENTYTHREE;
            if (hours >= 0 && hours < 2) {
                past.setDate(past.getDate() - 1);
                fixYear = past.getFullYear();
                fixMonth = past.getMonth() + 1;
                fixDay = past.getDate();
            } else {
                fixYear = year;
                fixMonth = month;
                fixDay = day;
            }
        }

        return [fixYear, fixMonth, fixDay, fixTime];
    } else {
        // eslint-disable-next-line default-case
        if (hours > 2 && hours <= 5) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = TWO;
        } else if (hours > 5 && hours <= 8) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = FIVE;
        } else if (hours > 8 && hours <= 11) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = EIGHT;
        } else if (hours > 11 && hours <= 14) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = ELEVEN;
        } else if (hours > 14 && hours <= 17) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = FOURTEEN;
        } else if (hours > 17 && hours <= 20) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = SEVENTEEN;
        } else if (hours > 20 && hours <= 23) {
            fixYear = year;
            fixMonth = month;
            fixDay = day;
            fixTime = TWENTY;
        } else if (hours > 23 || hours <= 2) {
            fixTime = TWENTYTHREE;
            if (hours >= 0 && hours <= 2) {
                past.setDate(past.getDate() - 1);
                fixYear = past.getFullYear();
                fixMonth = past.getMonth() + 1;
                fixDay = past.getDate();
            } else {
                fixYear = year;
                fixMonth = month;
                fixDay = day;
            }
        }
        return [fixYear, fixMonth, fixDay, fixTime];
    }
}

// 요청하는 baseitme, basedate의 형식에 맞추기 위한 함수
function today(number) {
    if (String(number).length < 2) {
        return (number = "0" + String(number));
    } else {
        return number;
    }
}
class Weather extends Component {
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

    getData = async (x, y) => {
        const {
            data: {
                response: {
                    body: {
                        items: { item }, //item은 해당 시간의 기상 상태를 obj arr로 받은 값이다.
                    },
                },
            },
        } = await axios.get(`${WeatherEndpoint}?serviceKey=${API_KEY}&dataType=JSON&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${x}&ny=${y}`);

        this.setState(item);

        console.log(this.state);
    };

    // 격자 좌표를 받아 API를 호출하여 해당 시간의 데이터를 받는다.
    converter(latitude, longitude) {
        const location = Converter(latitude, longitude);
        this.getData(location.x, location.y);
        x = location.x;
        y = location.y;
    }

    componentDidMount() {
        // 현재 위치를 받고, 기상청식 격자 좌표를 converter로 변환한다.
        navigator.geolocation.getCurrentPosition((position) => {
            this.converter(position.coords.latitude, position.coords.longitude);
        });
        console.log("mounted");
    }

    //state의 데이터가 arr에 들어오기까지 기다리고 데이터를 추출한다.
    make() {
        const arr = this.state;

        if (arr != null) {
            //state의 obj arr에서 원하는 데이터 추출
            const data = {
                baseTime: arr[0].baseTime, //현재 시간
                TMP: arr[0].fcstValue, // 기온
                WSD: arr[4].fcstValue, // 풍속
                SKY: arr[5].fcstValue, // 하늘 상태
                PTY: arr[6].fcstValue, //  기후 상태
                POP: arr[7].fcstValue, // 강수 확률
                PCP: arr[8].fcstValue, // 시간당 강수량
                REH: arr[9].fcstValue, // 습도
            };

            //추출한 데이터를 가공
            const result = {
                baseTime: arr[0].baseTime,
                tmp: data.TMP, // 기온
                wsd: data.WSD, // 풍속 m/s
                sky: nConverter("SKY", data.SKY),
                pty: nConverter("PTY", data.PTY),
                pop: data.POP, // 강수 확률 %
                pcp: nConverter("PCP", data.PCP),
                reh: data.REH,
            };

            return result;
        }
    }

    render() {
        let result;
        //렌더링부분의 리턴값에 들어가는 props에 실제 데이터가 들어가기까지 딜레이가 걸리므로 그 전에 렌더링할 초기값을 설정.
        if (this.make() != null) {
            result = this.make();
            console.log(result);
        } else
            result = {
                baseTime: "null",
                tmp: "null",
                wsd: "null",
                sky: "null",
                pty: "null",
                pop: "null",
                pcp: "null",
                reh: "null",
            };

        let arr = [];

        Object.keys(wdata.location).map(function (index) {
            if (x === wdata.location[index]["격자 X"] && y === wdata.location[index]["격자 Y"]) {
                arr.push({
                    Province: wdata.location[index]["1단계"],
                    City: wdata.location[index]["2단계"],
                    Town: wdata.location[index]["3단계"],
                });
            }
            return arr;
        });

        return (
            <div>
                <h1>TODAYS</h1>
                <h2>업데이트 시간 : {result.baseTime}</h2>
                <h2>기온 : {result.tmp}도</h2>
                <h2>풍속 : {result.wsd}m/s</h2>
                <h2>기후 상태 : {result.pty}</h2>
                <h2>하늘 상태 : {result.sky}</h2>
                <h2>강수 확률 : {result.pop}%</h2>
                <h2>시간 당 강수량 : {result.pcp}</h2>
                <h2>습도 : {result.reh}%</h2>
                <h2>{arr != null ? arr[0].Province : "null"}</h2>
            </div>
        );
    }
}
export default Weather;
