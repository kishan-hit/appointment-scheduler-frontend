import React, { useState,useEffect } from "react"
import {useLocation} from 'react-router-dom'
import { MONTHS } from "./conts"
import { CalendarBody, CalendarHead, HeadDay, SevenColGrid, StyledDay, Wrappper } from "./style"
import { areDatesTheSame, getDateObj, getDaysInMonth, getSortedDays, range } from "./utils"
import "./index.css"
import BasicForm from "./form";
import axios from "axios"
import UserBooking from "./UserBooking"

const Calendar = ({ startingDate }) => {

    const location = useLocation()

    const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

    const [showResults, setShowResults] = useState(false)
    const [showUserForm, setshowUserForm] = useState(false)
    const [selectedDay,setSelectedDay] = useState(null)
    const [doctor, setdoctor] = useState(null)
    const [user, setuser] = useState({})

    useEffect(() => {
        const udata = JSON.parse(localStorage.getItem('user'));
        setuser(udata)
        if(udata.role=="user"){
            async function getData(){
                const data = {
                    email : location.state.email
                }
                console.log(data)
                const res = await axios.get(`http://localhost:8000/doctor/doctorDetail?email=${location.state.email}`)
                if(res.data){
                    setdoctor(res.data.doctor)
                }
            } 
            getData()
        }
    }, [])
    
    

    const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear);
    // const [isAvailablePage, setisAvailablePage] = useState(false)
    const nextMonth = () => {
        if (currentMonth < 11) {
            setCurrentMonth((prev) => prev + 1)
        }
        else {
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        }
    };
    const prevMonth = () => {
        if (currentMonth > 0) {
            setCurrentMonth((prev) => prev - 1)
        }
        else {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        }
    };
    // const dateClicked = (day, month, year) => {
    //     console.log(e.target.value)
    //     console.log(day)
    //     console.log(month)
    //     console.log(year)
    //     setisAvailablePage(true)
    // }
    const togglePageShow=(day)=>{
        setSelectedDay(day)
        if(user.role=="doctor"){
            setShowResults(!showResults)
        }else{
            setshowUserForm(!showUserForm)
        }
    }
    return (
        <Wrappper >
            <CalendarHead>
                <ion-icon
                    onClick={prevMonth}
                    style={{ cursor: 'pointer' }}
                    name="arrow-back-circle-outline"></ion-icon>
                <p>{MONTHS[currentMonth]} {currentYear}</p>
                <ion-icon
                    onClick={nextMonth}
                    style={{ cursor: 'pointer' }}
                    name="arrow-forward-circle-outline"></ion-icon>
            </CalendarHead>
            <SevenColGrid>
                {getSortedDays(currentMonth, currentYear).map((day) => (
                    <HeadDay>{day}</HeadDay>
                ))}
            </SevenColGrid>
            <CalendarBody fourCol={DAYSINMONTH === 28}>
                {range(getDaysInMonth(currentMonth, currentYear)).map((day) => (
                    <StyledDay
                        // onClick={() => { dateClicked(day, currentMonth, currentYear) }}
                        onClick={()=>{togglePageShow(day+"-"+currentMonth+"-"+currentYear)}}
                        style={{ cursor: 'pointer' }}
                        active={areDatesTheSame(
                            new Date(),
                            getDateObj(day, currentMonth, currentYear)
                        )}
                    >{day}
                    </StyledDay>
                ))}
                

                {
                    showResults && 
                    // <div style={{position: "fixed"}}>
                        <BasicForm togglePageShow={togglePageShow} selectedDay={selectedDay}/>
                    // </div>
                }
                {
                    showUserForm &&
                        <UserBooking togglePageShow={togglePageShow} selectedDay={selectedDay} doctor={doctor}/>
                }
            </CalendarBody>
        </Wrappper>
    )
}
export default Calendar;