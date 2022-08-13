import axios from 'axios'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { addInstructorContent, addMoreInstructor, delInstructor } from '../../redux/actions/instructor/zybooks'

const AddInstructor = ({ onStepChange, onPrevStep, step, backText }: any) => {
    // const [instructor, setInstructor] = useState([{ firstname: '', lastname: '', email: '' }])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const dispatch = useDispatch()

    const { zybooks } = useSelector((state: RootStateOrAny) => state)
    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)


    const addInstructor = () => {
        dispatch(addMoreInstructor("instructors"))
    }

    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });


    const handleChange = (e, index) => {
        let name = e.target.name
        let value = e.target.value
        dispatch(addInstructorContent({ name, index, value }))
    }

    const deleteInstructor = (index) => {
        dispatch(delInstructor(index))
    }

    const CheckData = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onStepChange()
        }, 2000);
    }

    
    return (
        <>
            <div className="cust_wrapper">
                <div className="cut_heading">
                    <h4>Add Instructors</h4>
                    {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p> */}
                </div>
                <div className='content_container'>
                    <div className='show_instructor row'>
                        <div className="col-md-8 " >

                                    <h5>Instructor 1</h5>
                                    <div className='instructor_detail'>
                                        <div>
                                            <label>First Name</label>
                                            <p>Laher asif</p>

                                        </div>
                                        <div>
                                            <label>Last Name</label>
                                            <p>Laher asif</p>
                                        </div>
                                    </div>

                                    <div className='email_detail'>
                                        <label>Email</label>
                                        <p>Laher asif</p>
                                    </div>

                        </div>

                    </div>

                    <div>
                        {zybooks?.instructors?.map((ins, index) => (
                            <div className="row mt-3">
                                <h5>Instructor {index + 1}</h5>

                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" className='form-control' name="firstName" value={ins?.firstName} onChange={(e) => handleChange(e, index)} placeholder='Course Number' />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input type="text" className='form-control' name="lastName" value={ins?.lastName} onChange={(e) => handleChange(e, index)} placeholder='Course Name' />

                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <input type="email" className='form-control' name="email" value={ins?.email} onChange={(e) => handleChange(e, index)} placeholder='Institution' />

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">

                                    <div className='close_icon' onClick={() => deleteInstructor(index)}>
                                        <IoMdClose />

                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>
                    <p className='add_instructor mt-4' onClick={() => addInstructor()}>Add new instructor</p>
                </div>

                <div className="adopt_bottom">
                    <div className="circle_wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="active_circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="adopt_bottom_button" style={{ bottom: '-10px' }}>
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

export default AddInstructor