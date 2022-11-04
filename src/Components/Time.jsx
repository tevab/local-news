import { useState, useEffect } from 'react';
import moment from "moment";

function Time(props) {

    useEffect(() => {
        const showTime = setInterval(() => {
            document.getElementById("time").innerHTML = moment().tz(props.timezone).format("dddd MM/DD/yyyy h:mm A");
        }, 1000);
        props.setCurrentTime(moment().tz(props.timezone).format('H'))
        return () => clearInterval(showTime);
      }, [props.timezone]);

    return(
        <div className={props.className} id='time'></div>
    )
}

export default Time;