import React,{useState,useEffect} from 'react'
import "../register/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        address: "",
        age: "",
        mobile: "",
        gender: ""
    })
    const [data, setdata] = useState({})

    useEffect(() => {
        const udata = JSON.parse(localStorage.getItem('user'));
        setUser({
            ...user,
            email : udata.email
        })
        setdata(udata)
    }, [])
    

    const handleChange = e => {
        const { name, value, type } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        axios.post("http://localhost:8000/user/register-user", user)
            .then(res => {
                alert(res.data.message);
                window.location.href = "/user-home"
            }).error((err) => {
                console.log(err);
            })
        console.log(user)
    }

  return (
    <div className='register'>
        <h1>Registration Form</h1>
        <input type="text" value={data.name} disabled placeholder="Name" onChange={handleChange}></input>
        <input type="text" name="address" value={user.address} placeholder="Address" onChange={handleChange}></input>
        <input type="number" name="age" value={user.age} placeholder="Age" onChange={handleChange}></input>
        <input type="number" name="mobile" value={user.mobile} placeholder="Mobile Number" onChange={handleChange}></input>
        <div className="radio-div" onChange={handleChange}>Gender : 
            <input type="radio" name="gender" value="male" className="radiobtn"/>Male
            <input type="radio" name="gender" value="female" className="radiobtn"/>Female
        </div>
        <div className="button" onClick={register}>Register</div>
    </div>
  )
}

export default UserRegistration