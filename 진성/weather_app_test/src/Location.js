import { useState, useEffect } from "react";
import Weather from "./Weather";
import Conductor from "./Conductor";

function Location() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, [latitude, longitude]);

    return <Conductor latitude={latitude} longitude={longitude} />;
}

export default Location;
