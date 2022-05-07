import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, RootStateOrAny } from 'react-redux';
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router';
const Secdule = ({ course_id, onStepChange, onPrevStep, step }: any) => {
    // const [date, setdate] = useState(new Date());
    // const [from_time, setfrom_time] = useState(new Date());

    let router = useRouter()
    const [loading, setLoading] = useState(false);
    let currentDate = new Date()
    const [dateTime, setDateTime] = useState([{ date: '', from_time: '', to_time: '' }])

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

        setDateTime([...dateTime, { date: '', from_time: '', to_time: '' }])
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
                onStepChange()
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
            <div className="mt-3 pb-3">
                <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas mb-2">
                        <h6 style={{ fontSize: 'bold' }}>Schedule your classes</h6>

                    </div>
                    {/* <Icons name="i26" /> */}
                </div>
                {dateTime.map((dat, i) => {
                    return (
                        <div style={{ border: '1pt solid lightgray', marginBottom: '10px', padding: '10px', borderRadius: '10px' }} key={i}>
                            <div className="p-field mt-2 ">
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
                                    <label>From</label>
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
                                    <label>To </label>
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
                <h3 style={{ cursor: 'pointer' }} onClick={() => addFormFields()} >+ Add more </h3>

            </div>
            <div className="d-flex justify-content-center">
                <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                    <button className="upload-1 sdisad-dsdactive " onClick={() => onPrevStep(step - 1)}>
                        Previous

                    </button>
                </div>
                <div >



                    <div className="idfadsf-sads kajfds-sdfe ">
                        <button onClick={() => SaveLiveClasses()} className="upload-1 sdisad-dsdactive" >
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
        </div>
    )
}

export default Secdule