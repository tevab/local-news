import { useState, useEffect } from 'react';
import moment from "moment";

function Time(props) {

    return(
        <div className={props.className}>
            {/* {currentDate} */}
            {/* {date.toLocaleDateString()} {date.toLocaleTimeString()} */}
        </div>
    )
}

export default Time;