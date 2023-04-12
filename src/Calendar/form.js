import React, { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";

function BasicForm(props) {
    const [user, setUser] = useState({
        // date:"",
        stime: "",
        etime: "",
        duration: ""
    });

    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        console.log(user)
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    useEffect(() => {

    }, []);
    async function getData() {
        // axios.post(``)
        //     .then(console.log("Data saved"))
        //     .catch();
        let stimehr = user.stime.split(":")[0]
        let stimemin = user.stime.split(":")[1]
        let etimehr = user.etime.split(":")[0]
        let etimemin = user.etime.split(":")[1]
        let dateday = props.selectedDay.split("-")[0]
        let datemonth = props.selectedDay.split("-")[1]
        let dateyear = props.selectedDay.split("-")[2]

        if (stimehr == etimehr) {
            if (stimemin >= etimemin) {
                alert("start time can not be greater than end time")
            }
        } else if (stimehr > etimehr) {
            alert("start time can not be greater than end time")
        } else {

            let stdate = new Date(dateyear, datemonth, dateday, stimehr, stimemin, 0, 0);
            let endate = new Date(dateyear, datemonth, dateday, etimehr, etimemin, 0, 0);

            let uid = "634e63c022fe7ed6151489dd"
            const data = {
                user_id: uid,
                start_time: stdate,
                end_time: endate
            }
            const res = await axios.post(`http://localhost:8000/doctorAvailability/${user.duration}`, data)

            if (res.data) {
                props.togglePageShow(null)
            }
        }
    }
    return (
        <div className="main">
            <div className="sub-main">
                <div onClick={() => { props.togglePageShow(null) }} className="cross">X</div>
                <div>
                    <div className="input-text">
                        <input value={props.selectedDay} name="date" type="text" placeholder="date" className="name" />
                    </div>
                    <div className="input-text">
                        <input value={user.stime} onChange={handleInputs} type="time" name="stime" placeholder="start time" className="name" />
                    </div>
                    <div className="input-text">
                        <input value={user.etime} onChange={handleInputs} type="time" name="etime" placeholder="end time" className="name" />
                    </div>
                    <div className="input-text">
                        <input value={user.duration} onChange={handleInputs} type="text" name="duration" placeholder="duration" className="name" />
                    </div>
                    <button onClick={() => getData()}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default BasicForm;