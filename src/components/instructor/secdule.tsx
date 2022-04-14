import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, RootStateOrAny } from 'react-redux';
import axios from 'axios'
import moment from 'moment'
import {useRouter } from 'next/router';
const Secdule = ({ course_id }: any) => {
    // const [date, setdate] = useState(new Date());
    // const [from_time, setfrom_time] = useState(new Date());

    let router = useRouter()
    const [loading, setLoading] = useState(false);
    let currentDate = new Date()
    const [dateTime, setDateTime] = useState([{ date: moment(currentDate).toDate(), from_time: new Date(), to_time: new Date() }])

    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });


    // const handleDateChange = (date: any) => {
    //     setdate(date)
    // }

    const handleDateChange = (name: string, i: number, date: any) => {
        debugger
        let formValues: any = [...dateTime];
        formValues[i][name] = date;
        setDateTime(formValues)

      
    }




    const addFormFields = () => {

        setDateTime([...dateTime, { date: new Date(), from_time: new Date(), to_time: new Date() }])
    }



    const SaveLiveClasses = async () => {

        let arr = [];
        for (let i = 0; i < dateTime.length; i++) {
            const element = dateTime[i];
            let value = { date: moment(element.date).format('YYYY-MM-DD'), from_time: moment(element.from_time).format('HH:mm'), to_time: moment(element.to_time).format('HH:mm') }
            arr.push(value)

        }

        let values = {
            course_id: course_id,
            schedule: arr
        }

        try {
            setLoading(true)
            let res = await AxInstance.post('api//instructor/courses/schedule/store', values)
            if (res.data.success === true) {
                setLoading(false)
                console.log("res" , res.data )
                router.push(`/en/instructor/quiz?id=${res.data.response.course.id}`)
            }
        } catch (error) {

        }
    }


    const DelSedule = (i: number) => {
        debugger
        const rows = [...dateTime];
        rows.splice(i, 1);
        setDateTime(rows);
    }



    return (
        <div>
            <div className=" mb-3">
                <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas">
                        <h6>Add live classes Sedule</h6>

                    </div>
                    {/* <Icons name="i26" /> */}
                </div>
                {dateTime.map((dat, i) => {
                    return (
                        <div style={{ border: '1pt solid lightgray', marginBottom: '10px', padding: '10px', borderRadius: '10px' }} key={i}>
                            <div className="p-field mt-2 ">
                                <p>Sedule no {i + 1}</p>
                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                    <div>
                                        {/* <Icons name="i24" /> */}
                                        <label>Date</label>
                                    </div>
                                    {(dateTime.length !== 1) ?
                                        <div onClick={() => DelSedule(i)}>
                                            <i className='fa fa-trash'></i>
                                        </div>
                                        : null}

                                </div>
                                <DatePicker
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    selected={dat.date}
                                    onChange={(date) => handleDateChange("date", i, date)}
                                    dateFormat="yyyy-MM-dd"
                                />

                            </div>
                            <div className="p-field mt-2 ">
                                <div className="d-flex">
                                    {/* <Icons name="i24" /> */}
                                    <label>Start Time</label>
                                </div>
                                <DatePicker
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    selected={dat.from_time}
                                    onChange={(date) => handleDateChange("from_time", i, date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={24}
                                    timeCaption="Time"
                                    dateFormat="h:mm "
                                />
                            </div>
                            <div className="p-field mt-2 ">
                                <div className="d-flex">
                                    {/* <Icons name="i24" /> */}
                                    <label>End Time </label>
                                </div>
                                <DatePicker
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    name="to_time"
                                    selected={dat.to_time}
                                    onChange={(date) => handleDateChange("to_time", i, date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={24}
                                    timeCaption="Time"
                                    dateFormat="h:mm"
                                />

                            </div>
                        </div>

                    )
                })}
                <p onClick={() => addFormFields()}>+ Add more </p>
            </div>
            <div className="d-flex">
                <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                    <button className="upload-1 sdisad-dsdactive ">
                        Preview
                    </button>
                </div>
                <div >

                      <button onClick={()=> SaveLiveClasses()} className="btn-2s">
                    {loading ?
                        <div className="spinner-border text-light" role="status">
                        </div>
                        :
                        "Save & Next"
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Secdule