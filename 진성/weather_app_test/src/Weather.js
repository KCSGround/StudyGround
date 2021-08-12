import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationData from "./LocationData.json";

const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

function Weather(latitude, longitude) {
    const [data, setData] = useState([]);
    const returnData = [];

    const currentLocationData = LocationData.map(function (element, index) {
        const key = { index };
        if (element["경도"] === latitude && element["위도"] === longitude) {
            return returnData.push(key, element["1단계"], element["2단계"], element["3단계"], element["격자 X"], element["격자 Y"]);
        }
        console.log(returnData);
        return returnData;
    });

    // const onClick = () => {
    //     axios
    //         .get(
    //             "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D&dataType=JSON&numOfRows=10&pageNo=1&base_date=20210812&base_time=0500&nx=55&ny=127"
    //         )
    //         .then((response) => {
    //             setData(response.data);
    //         });
    // };

    return <div>hi{currentLocationData}</div>;
}

export default Weather;
