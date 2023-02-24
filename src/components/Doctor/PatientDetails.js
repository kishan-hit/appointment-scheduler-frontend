import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useLocation} from "react-router-dom"

const PatientDetails = () => {
    const [patient, setpatient] = useState({})
    const location = useLocation()
    useEffect(() => {
        console.log(location.state.email)
      async function getData(){
        const res = await axios.post("http://localhost:8000/user/userDetail",{email : location.state.email})
        if(res.data){
            setpatient(res.data.user)
        }
      }
      getData()
    }, [])
    
  return (
    <div>
        <div>Patient Email : {patient.email}</div>
        <div>Patient Gender : {patient.gender}</div>
        <div>Patient Mobile : {patient.mobile}</div>
        <div>Patient Address : {patient.address}</div>
    </div>
  )
}

export default PatientDetails