import React, { Component } from "react";
import axios from "axios";
import Converter1 from "./Converter1";

// const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

const date = new Date();
const past = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

const base_time = `${today(timeChecker()[3])}00`;
const base_date = `${timeChecker()[0]}${today(timeChecker()[1])}${today(timeChecker()[2])}`;

function timeChecker() {
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

    // 02 05 08 11 14 17 20 23
    // 10분 경과 필요
    // 현재 시간이 3시간 간격 안에서 ex 현재 03시다 0210 ~ 0509에 해당하므로 0200 처리를 해야돼.

    if (minutes > 10) {
        // eslint-disable-next-line default-case
        if (hours >= 2 && hours < 5) {
            fixTime = TWO;
        } else if (hours >= 5 && hours < 8) {
            fixTime = FIVE;
        } else if (hours >= 8 && hours < 11) {
            fixTime = EIGHT;
        } else if (hours >= 11 && hours < 14) {
            fixTime = ELEVEN;
        } else if (hours >= 14 && hours < 17) {
            fixTime = FOURTEEN;
        } else if (hours >= 17 && hours < 20) {
            fixTime = SEVENTEEN;
        } else if (hours >= 20 && hours < 23) {
            fixTime = TWENTY;
        } else if (hours >= 23 || hours < 2) {
            fixTime = TWENTYTHREE;
            if (hours >= 0) {
                past.setDate(past.getDate() - 1);
                fixYear = past.getFullYear();
                fixMonth = past.getMonth() + 1;
                fixDay = past.getDate();
            }
        }

        return [fixYear, fixMonth, fixDay, fixTime];
    } else {
        // eslint-disable-next-line default-case
        if (hours > 2 && hours <= 5) {
            fixTime = TWO;
        } else if (hours > 5 && hours <= 8) {
            fixTime = FIVE;
        } else if (hours > 8 && hours <= 11) {
            fixTime = EIGHT;
        } else if (hours > 11 && hours <= 14) {
            fixTime = ELEVEN;
        } else if (hours > 14 && hours <= 17) {
            fixTime = FOURTEEN;
        } else if (hours > 17 && hours <= 20) {
            fixTime = SEVENTEEN;
        } else if (hours > 20 && hours <= 23) {
            fixTime = TWENTY;
        } else if (hours > 23 || hours <= 2) {
            fixTime = TWENTYTHREE;
            if (hours >= 0) {
                fixYear = past.getFullYear();
                fixMonth = past.getMonth() + 1;
                fixDay = past.getDate();
            }
        }
        return [fixYear, fixMonth, fixDay, fixTime];
    }
}

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
                        items: { item },
                    },
                },
            },
        } = await axios.get(
            `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&dataType=JSON&numOfRows=10&pageNo=1&base_date=20210823&base_time=0500&nx=${x}&ny=${y}`
        );

        this.setState(item);

        console.log(this.state);
    };

    converter(latitude, longitude) {
        const location = Converter1(latitude, longitude);
        this.getData(location.x, location.y);
    }

    // getArray() {
    //     const array = this.state;
    //     return array;
    // }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.converter(position.coords.latitude, position.coords.longitude);
        });
    }
    make() {
        const arr = this.state;

        // console.log(arr);

        if (arr != null) {
            // sol1)
            // const lastArray = Object.entries(arr["0"]);
            // console.log(typeof lastArray);
            // console.log(lastArray);
            // console.log(lastArray["0"]["1"]);

            console.log(arr[0].category);

            const result = arr[0].baseDate;

            return result;
        }
    }

    render() {
        console.log(base_time);
        console.log(base_date);
        console.log(this.make());

        return (
            <div>
                <h1>TODAYS</h1>
                <h2>{this.make()}</h2>
            </div>
        );
    }
}
export default Weather;
