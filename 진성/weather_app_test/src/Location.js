import { useState, useEffect } from "react";
import Weather from "./Weather";

function Location() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, [latitude, longitude]);

    return <Weather latitude={latitude.toFixed(1)} longitude={longitude.toFixed(1)} />;
}

export default Location;
