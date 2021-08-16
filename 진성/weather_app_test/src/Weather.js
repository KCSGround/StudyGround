import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherEndpoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
const API_KEY = "ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D";

function Weather(latitude, longitude) {
    const [data, setData] = useState([]);
    const returnData = [];

    // const onClick = () => {
    //     axios
    //         .get(
    //             "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ZMRzv1q2%2BYzORg2CS1IZhYglrlF1WoYDe6dzK9UPGDA59kO5GgN2V9NEniLd0bvLIVmgW6WOiooTcUSLX%2FJ16Q%3D%3D&dataType=JSON&numOfRows=10&pageNo=1&base_date=20210815&base_time=0500&nx=73&ny=1"
    //         )
    //         .then((response) => {
    //             setData(response.data);
    //         });
    // };
}

export default Weather;
