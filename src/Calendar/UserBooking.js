import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./index.css"
import "./form.css"

const UserBooking = (props) => {

    const [doctordata, setdoctordata] = useState([])
    const [user, setuser] = useState({})

    useEffect(() => {
        const udata = JSON.parse(localStorage.getItem('user'));
        setuser(udata)
        const data = {
            email: props.doctor.email,
            date: props.selectedDay
        }
        async function getData() {
            const res = await axios.post("http://localhost:8000/doctorAvailability", data)
            if (res.data) {
                setdoctordata(res.data.availability)
            }
        }
        getData()
    }, [])

    const getHourVal = (data) => {
        const dateObj = new Date(data.start_time);
        return dateObj.toLocaleTimeString()
    }
    const getDateVal = (data) => {
        const dateObj = new Date(data.start_time);
        return dateObj.toLocaleDateString()
    }
    const bookappointmentUser = async(data) => {
        console.log(data)
        const sdata = {
            userEmail : user.email,
            doctorEmail : props.doctor.email,
            start_time : data.start_time,
            end_time : data.end_time
        }
        const res = await axios.post("http://localhost:8000/doctorAppointment/book-appointment",sdata)
        if(res.data){
            alert("Appointment Booked")
            props.togglePageShow(null)
        }
    }
    return (
        <div className='userbooking'>
            <div className="cross" onClick={() => { props.togglePageShow(null) }}>X</div>
            {
                doctordata.length > 0 ?
                    <div>{
                        doctordata.map((edata) => {
                            return <div className='bookapouterdiv'>
                                Date : {getDateVal(edata)},Appointment Time : {getHourVal(edata)}&nbsp;&nbsp;&nbsp;<span className='bookapdiv' onClick={() => { bookappointmentUser(edata) }}>Book Appointment</span>
                            </div>
                        })
                    }</div>
                    :
                    <div>Slot Not Available for this Date.Please Choose another date</div>
        }
        </div>
    )
}

export default UserBooking