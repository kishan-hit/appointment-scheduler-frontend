import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./userStyle.css"
import { useNavigate } from 'react-router-dom'

const UserHome = () => {
    const [doctors, setdoctors] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function getDoctor() {
            const res = await axios.get("http://localhost:8000/doctor/get-doctor")
            if(res.data){
                setdoctors(res.data.doctors)
            }else{
                alert("server error")
            }
        }
        getDoctor()
    }, [])
    const bookAppointment = (email)=>{
        navigate("/booking",{
            state : {
                email : email
            }
        })
    }
    return (
        <div>
            {
                doctors.map((doctor)=>{
                    return <div className='doctor-div'>
                        <div>Name : {doctor.name}</div>
                        <div>Specialist : {doctor.specialist}</div>
                        <div>Degree : {doctor.degree}</div>
                        <div>Experience : {doctor.experience}</div>
                        <div>Adress : {doctor.address}</div>
                        <div className='booking-btn' onClick={()=>{bookAppointment(doctor.email)}}>Book Apointment</div>
                    </div>
                })
            }
        </div>
    )
}

export default UserHome