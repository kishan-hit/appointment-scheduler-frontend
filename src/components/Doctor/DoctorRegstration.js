import React, { useState,useEffect } from 'react'
import "../register/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorRegstration = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        specialist: "",
        degree: "",
        address: "",
        experience: "",
        mobile: "",
        fee: ""
    })
    const [data, setdata] = useState({})

    useEffect(() => {
        const udata = JSON.parse(localStorage.getItem('user'));
        setUser({
            ...user,
            email : udata.email,
            name : udata.name
        })
    }, [])
    

    const handleChange = e => {
        const { name, value, type } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        axios.post("http://localhost:8000/doctor/register-doctor", user)
            .then(res => {
                alert(res.data.message);
                window.location.href = "/booking"
            }).error((err) => {
                console.log(err);
            })
        console.log(user)
    }

return (
    <div className='register'>
        <h1>Registrtion Form</h1>
        <input type="text" name="specialist" value={user.specialist} placeholder="Specialist" onChange={handleChange}></input>
        <input type="text" name="degree" value={user.degree} placeholder="Degree" onChange={handleChange}></input>
        <input type="text" name="address" value={user.address} placeholder="Address" onChange={handleChange}></input>
        <input type="number" name="experience" value={user.experience} placeholder="Year Of Experience" onChange={handleChange}></input>
        <input type="number" name="mobile" value={user.mobile} placeholder="Mobile Number" onChange={handleChange}></input>
        <input type="number" name="fee" value={user.fee} placeholder="Fee" onChange={handleChange}></input>
        <div className="button" onClick={register}>Register</div>
    </div>
)
}

export default DoctorRegstration