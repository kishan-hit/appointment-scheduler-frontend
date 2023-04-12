import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import "./doctor.css"

const DoctorHome = () => {
    const udata = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const [patient, setpatient] = useState([])
    useEffect(() => {
      async function getData(){
        const res = await axios.post("http://localhost:8000/doctorAppointment/get-all-appointment",{email : udata.email})
        if(res.data){
            setpatient(res.data.appointments)
        }
      }
      getData()
    }, [])

    const getHourVal = (data) => {
        const dateObj = new Date(data);
        return dateObj.toLocaleTimeString()
    }
    const getDateVal = (data) => {
        const dateObj = new Date(data);
        return dateObj.toLocaleDateString()
    }
    const getPDetails = (email) =>{
        navigate("/patient-detail",{
            state : {
                email : email
            }
        })
    }
    
  return (
    <div>
    {
        patient.length > 0 ? <div>
        {
            patient.map((epatient)=>{
                return <div className='patientdiv'>
                    <div>Patient Mail Id : {epatient.user_email}</div>
                    <div>Patient AppointMent Date : {getDateVal(epatient.start_time)}</div>
                    <div>Patient Appointment Time : {getHourVal(epatient.start_time)}</div>
                    <div onClick={()=>{getPDetails(epatient.user_email)}} className='patientdetaildiv'>More Detils About Patient</div>
                </div>
            })
        }
        </div> : 
        <div>No available Patient</div>
    }
        <div>Please Add your Availability From here </div>
        <Link to={"/booking"}>Add</Link>
    </div>
  )
}

export default DoctorHome