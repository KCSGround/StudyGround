import React, { Component } from "react";
import axios from "axios";
import Converter1 from "./Converter1";

// const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours() - 3;

const base_time = `${today(hours)}00`;
const base_date = `${year}${today(month)}${today(day)}`;

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
            `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&dataType=JSON&numOfRows=10&pageNo=1&base_date=20210819&base_time=2000&nx=${x}&ny=${y}`
        );

        this.setState(item[0]);

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
    render() {
        const array = this.state;

        return (
            <div>
                <h1>TODAYS</h1>
                <h2>{this.state}</h2>
                {array.map((fcstValue) => {
                    return <div value={fcstValue}></div>;
                })}
            </div>
        );
    }
}
export default Weather;
