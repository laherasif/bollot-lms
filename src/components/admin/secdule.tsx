import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router';
import { format, parse } from 'date-fns'

import { Spinner } from 'react-bootstrap';
import { addMoreLive, addLiveInput, delPreview } from '../../redux/actions/instructor/live'
import { SweetAlert } from '../../function/hooks';
const Secdule = ({  onStepChange, onPrevStep, step }: any) => {
    // const [date, setdate] = useState(new Date());
    // const [from_time, setfrom_time] = useState(new Date());

    let router = useRouter()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    let currentDate = new Date()
    const [dateTime, setDateTime] = useState([{ date: '', from_time: '', to_time: '' }])

    const { token } = useSelector((state: RootStateOrAny) => state?.admin)
    const { Classes } = useSelector((state: RootStateOrAny) => state?.live)
    const { courseId } = useSelector((state: RootStateOrAny) => state?.addCourse)


    const dispatch = useDispatch()


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });




    const handleDateChange = (name: string, i: number, date: any) => {
        debugger
        dispatch(addLiveInput({ name, i, date }))



    }




    const addFormFields = () => {


        dispatch(addMoreLive())
    }



    const SaveLiveClasses = async () => {

        // let arr = [];
        // for (let i = 0; i < dateTime.length; i++) {
        //     const element = dateTime[i];
        //     let value = { date: moment(element.date).format('YYYY-MM-DD'), from_time: moment(element.from_time).format('HH:mm'), to_time: moment(element.to_time).format('HH:mm') }
        //     arr.push(value)

        // }

        let values = {
            course_id: courseId,
            schedule: Classes
        }

        try {
            setLoading(true)
            let res = await AxInstance.post('api//admin/courses/schedule/store', values)
            if (res.data.success === true) {
                setLoading(false)
                SweetAlert({ icon: "success", text: res.data.message })
                onStepChange()
            }
            else {
                setLoading(false)
                setErrors(res.data.error)

            }
        } catch (error) {
            setLoading(false)
            SweetAlert({ icon: "error", text: error })
        }
    }


    const DelSedule = (i: number) => {
        dispatch(delPreview(i))
       
    }



    return (
        <div>
            <div className="mt-3 pb-3">
                <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas mb-2">
                        <h6 style={{ fontSize: 'bold' }}>Schedule your classes</h6>

                    </div>
                </div>
                {Classes && Classes.map((dat, i) => {
                    return (
                        <div style={{ border: '1pt solid lightgray', marginBottom: '10px', padding: '10px', borderRadius: '10px' }} key={i}>
                            <div className="p-field mt-2 ">
                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                    <div>
                                        {/* <Icons name="i24" /> */}
                                        <label>Date</label>
                                    </div>
                                    {(Classes.length !== 1) ?
                                        <div onClick={() => DelSedule(i)}>
                                            <i className='fa fa-trash'></i>
                                        </div>
                                        : null}

                                </div>
                                <DatePicker
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              selected={dat?.id || dat.date !== '' ? parse(dat.date, "yyyy-MM-dd", new Date()) : dat.date}
                            //   selected={dat.date}
                              locale="en-GB"
                              placeholderText={'YYYY-MM-DD'} 
                              timeIntervals={30}

                              showWeekNumbers
                              onChange={(date) => handleDateChange("date", i, date)}
                              dateFormat="yyyy-MM-dd"
                            />

                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.date}</div> : null}


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
                              placeholderText={'HH-MM'} 

                              selected={dat?.id || dat.from_time !== '' ? parse(dat.from_time, "HH:mm:ss", new Date()) : dat.from_time}
                            //   selected={dat.from_time}
                              onChange={(date) => handleDateChange("from_time", i, date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm"
                            />
                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.from_time}</div> : null}

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
                              placeholderText={'HH-MM'} 

                              name="to_time"
                              selected={dat?.id || dat.to_time !== '' ? parse(dat.to_time, "HH:mm:ss", new Date()) : dat.to_time}
                              // selected={dat.to_time}
                              onChange={(date) => handleDateChange("to_time", i, date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm"
                            />

                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.to_time}</div> : null}


                          </div>
                        </div>

                    )
                })}
                <h3 style={{ cursor: 'pointer' }} onClick={() => addFormFields()} >+ Add more </h3>

            </div>

            <div className="umpire w-100 " >
                <div className="umpire-1 umpire-1-cst d-flex justify-content-center mt-3 ">
                    <div className="d-flex mb-3 idfadsf-sads">
                        <button
                            className="upload-1 sdisad-dsdactive "
                            onClick={() => onPrevStep(step - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="upload-1 sdisad-dsdactive"
                            onClick={() => SaveLiveClasses()}
                        >
                            <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                            {loading ? <Spinner animation="border" /> : "Save & Next"}
                        </button>
                    </div>

                </div>
            </div>
            {/* <div className="d-flex justify-content-center">
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
            </div> */}
        </div>
    )
}

export default Secdule