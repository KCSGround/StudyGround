import React, { useState, useEffect } from "react";
import axios from "axios";
import Converter from "./Converter";

// const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

function Weather() {
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
    const [data, setData] = useState();
    const x = Converter().x;
    const y = Converter().y;
    const getData = async (x, y) => {
        const {
            data: {
                response: { body: items },
            },
        } = await axios.get(
            `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&dataType=JSON&numOfRows=10&pageNo=1&base_date=20210817&base_time=0500&nx=${x}&ny=${y}`
        );
        setData(items);
    };

    useEffect(() => {
        getData(x, y);
    }, [x, y]);
    console.log(data);
    return <div>rd</div>;
}

export default Weather;
