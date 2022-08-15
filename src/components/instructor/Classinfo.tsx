import React, { useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addZybookCourseInput } from '../../redux/actions/instructor/zybooks';
import { parse } from 'date-fns';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const ClassInfo = ({ onStepChange, onPrevStep, step, backText }: any) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const { zybooks } = useSelector((state: RootStateOrAny) => state)
    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(addZybookCourseInput({ name, value }))
    }

    const handleDateChange = (name, value) => {
        dispatch(addZybookCourseInput({ name, value }))
    }

    const CheckData = async () => {
        const { courses, firtCourse, instructors, class_number, name, institution, start_date, end_date, expected_students, cause_usage, office_phone, mobile_phone, additional_comments, } = zybooks
        let merg = firtCourse
        let courseWrapper = courses.concat(merg)
        let arr = []
        for (let i = 0; i < courses.length; i++) {
            const element = courses[i].id;
            arr.push(element)

        }

        let value = {
            courses: arr, instructors: instructors, class_number: class_number, name: name, institution: institution, start_date: start_date, end_date: end_date, expected_students: expected_students, cause_usage: cause_usage, office_phone: office_phone, mobile_phone: mobile_phone, additional_comments: additional_comments
        }
        try {
            setLoading(true)
            let res = await AxInstance.post(`api//instructor/classes/store/2`, value)
            if (res.data.success === true) {
                onStepChange()
                setLoading(false)

            }
            else {
                setError(res.data.errors)
                setLoading(false)

            }
        } catch (error) {

        }

    }


    return (
        <>
            <div className="cust_wrapper">
                <div className="cut_heading">
                    <h4>Class Infromation</h4>
                </div>
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p> */}
                <div className='content_container' >
                    <div className="row">
                        <div className="col-md-3">
                            <input type="text" className='form-control' value={zybooks.class_number} onChange={(e) => handleChange(e)} name="class_number" placeholder='Course Number' />
                            {error.class_number && <div className="invalid mt-1">{error?.class_number[0]}</div>}

                        </div>
                        <div className="col-md-9 ">
                            <input type="text" className='form-control' value={zybooks.name} onChange={(e) => handleChange(e)} name="name" placeholder='Course Name' />
                            {error.name && <div className="invalid mt-1">{error?.name[0]}</div>}

                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" className='form-control' value={zybooks.institution} onChange={(e) => handleChange(e)} name="institution" placeholder='Institution' />
                            {error.institution && <div className="invalid mt-1">{error?.institution[0]}</div>}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className='classinfo_text'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ratione, cumque ad sapiente voluptates distinctio aut harum itaque, praesentium assumenda enim. Debitis .</p>
                            </div>
                            <div className='classinfo_date'>
                                <div className="row">
                                    <div className="col-md-4">
                                        <DatePicker
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            placeholderText={'YYYY-MM-DD'}
                                            // selected={zybooks.start_date}
                                            selected={zybooks.start_date !== "" ? parse(zybooks.start_date, "yyyy-MM-dd", new Date()) : zybooks.start_date}

                                            name="start_date"
                                            className='form-control'
                                            // selected={dat.date}
                                            onChange={(date) => handleDateChange("start_date", date)}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        {error.start_date && <div className="invalid mt-1">{error?.start_date[0]}</div>}

                                    </div>
                                    <div className="col-md-4">
                                        <DatePicker
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            placeholderText={'YYYY-MM-DD'}
                                            // selected={zybooks.end_date}
                                            // selected={ parse(zybooks.end_date, "yyyy-MM-dd", new Date()) }
                                            selected={zybooks.end_date !== "" ? parse(zybooks.end_date, "yyyy-MM-dd", new Date()) : zybooks.end_date}

                                            className='form-control'
                                            name="end_date"
                                            // selected={dat.date}
                                            onChange={(date) => handleDateChange("end_date", date)}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        {error.end_date && <div className="invalid mt-1">{error?.end_date[0]}</div>}

                                    </div>
                                    <div className="col-md-4">
                                        <input type="number" name="expected_students" value={zybooks.expected_students} onChange={(e) => handleChange(e)} className='form-control' placeholder='Expected # of students' />
                                        {error.expected_students && <div className="invalid mt-1">{error?.expected_students[0]}</div>}

                                    </div>
                                </div>
                            </div>

                            <div className='classinfo_text'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ratione, cumque ad sapiente voluptates distinctio aut harum itaque, praesentium assumenda enim. Debitis .</p>
                            </div>

                            <div className='classinfo_select'>
                                <label>zyBook usage</label>
                                <select className='form-control' name="cause_usage" value={zybooks.cause_usage} onChange={(e) => handleChange(e)}>
                                    <option>Choose an option</option>
                                    <option value="1">First</option>
                                    <option value="2">Choose an option</option>
                                </select>
                                {error.cause_usage && <div className="invalid mt-1">{error?.cause_usage[0]}</div>}

                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                </div>

                <div className="adopt_bottom">
                    <div className="circle_wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="active_circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="adopt_bottom_button" style={error?.courses ? { bottom: '10px' } : { bottom: '-10px' }}>
                        <div className='bottom_buttons'>
                            <button className="back" onClick={() => onPrevStep(step - 1)}> Back <span>{backText}</span></button>
                            <button className='next' onClick={() => CheckData()}>
                                {loading ? <Spinner animation="border" style={{ marginTop: '4px' }} /> :
                                    "Next"
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ClassInfo