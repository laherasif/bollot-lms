import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { SweetAlert } from '../../function/hooks'
import { ClearStates } from '../../redux/actions/instructor/zybooks'

const Review = ({ onStepChange, onPrevStep, step, backText }: any) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const { zybooks } = useSelector((state: RootStateOrAny) => state)
    const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)



    const router = useRouter()

    const dispatch = useDispatch()


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });


    const CheckData = async () => {
        const { courses, firtCourse, instructors, class_number, name, institution, start_date, end_date, expected_students, cause_usage, office_phone, mobile_phone, additional_comments, } = zybooks
        let arr = []
        let merg = firtCourse
        let courseWrapper = arr.concat(merg.id)

        for (let i = 0; i < courses.length; i++) {
            const element = courses[i].id;
            arr.push(element)

        }

        let value = {
            courses: courseWrapper,
            instructors: instructors.length > 0 ?  instructors : [{name : User?.fullname , email : User?.email }],
            class_number: class_number,
            name: name,
            institution: institution,
            start_date: start_date,
            end_date: end_date,
            expected_students: expected_students,
            cause_usage: cause_usage,
            office_phone: office_phone,
            mobile_phone: mobile_phone,
            additional_comments: additional_comments
        }

        try {
            setLoading(true)
            let res = await AxInstance.post(`api//instructor/classes/store`, value)
            if (res.data.success === true) {
                setLoading(false)
                SweetAlert({ icon: 'success', text: res.data.message })
                dispatch(ClearStates())
                router.push('/en/instructor')

            }
            else {
                setError(res.data.errors)
                setLoading(false)

            }
        } catch (error) {

            setLoading(false)
            SweetAlert({ icon: 'error', text: error })
        }

    }


    return (
        <>
            <div className="cust_wrapper">
                <div className="cut_heading">
                    <h4>Review Information</h4>
                </div>
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p> */}
                <div className='content_container'>
                    <div className='review_selected'>
                        <h5>Selected zyBook</h5>

                        <div className="course_container" >
                            <img src={zybooks?.firtCourse?.cover_image} alt="course_image" />
                            <p>{zybooks?.firtCourse?.title}
                                {/* <span>With zybook</span> */}
                            </p>
                        </div>


                        <div className="review_subject">
                            <p>Subjects</p>
                            <h5>{zybooks?.firtCourse?.title}</h5>
                        </div>

                    </div>
                    {zybooks?.courses?.length > 0 ?
                        <div className='review_selected mt-4'>
                            <h5>Customizations</h5>
                            {zybooks?.courses?.map((course) => (
                                <>
                                    <div className="course_container" key={course?.id}>
                                        <img src={course?.cover_image} alt="course_image" />
                                        <p>{course?.title}
                                            <span>With zybook</span>
                                        </p>
                                    </div>
                                    <div className="review_subject">
                                        <p>Subjects</p>
                                        <h5>Data Structure</h5>
                                    </div>
                                </>
                            ))}

                        </div>
                        : null}

                    <div className='review_selected mt-4'>
                        <h5>Class information</h5>

                        <div className='info_wrapper'>
                            <div className="info_container">
                                <label>Class Number</label>
                                <p>{zybooks?.class_number}</p>
                            </div>
                            <div className="info_container_second">
                                <label>Course Name</label>
                                <p>{zybooks?.name}</p>
                            </div>
                        </div>
                        <div className="info_container">
                            <label>Institution</label>
                            <p>{zybooks?.institution}</p>
                        </div>
                        <div className='info_wrapper'>
                            <div className="info_container">
                                <label>Course start date</label>
                                <p>{zybooks?.start_date}</p>
                            </div>
                            <div className="info_container_second">
                                <label>Course end date </label>
                                <p>{zybooks?.end_date}</p>
                            </div>
                            <div className="info_container_second">
                                <label>Expected # of students</label>
                                <p>{zybooks?.expected_students}</p>
                            </div>
                        </div>
                        <div className="info_container">
                            <label>Zybooks usage</label>
                            <p>{zybooks?.cause_usage}</p>
                        </div>
                    </div>

                    <div className='review_selected mt-4'>
                        <h5>Instructors</h5>
                        {zybooks?.instructors.length > 0 ? zybooks?.instructors.map((ins, index) => (
                            <div className='info_wrapper' key={index}>
                                <div className="info_container">
                                    <label>Name</label>
                                    <p>{ins?.firstName} {ins?.lastName} </p>
                                </div>
                                <div className="info_container_second">
                                    <label>Email</label>
                                    <p>{ins?.email}</p>
                                </div>
                            </div>
                        )) :
                            <div className='info_wrapper' >
                                <div className="info_container">
                                    <label>Name</label>
                                    <p> {User?.fullname} </p>
                                </div>
                                <div className="info_container_second">
                                    <label>Email</label>
                                    <p>{User?.email}</p>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='review_selected mt-4'>
                        <h5>Contact Information</h5>
                        <div className='info_wrapper'>
                            <div className="info_container">
                                <label>Office Phone</label>
                                <p>{zybooks?.office_phone}</p>
                            </div>
                            <div className="info_container_second">
                                <label>Mobile Phone </label>
                                <p>{zybooks?.mobile_phone}</p>
                            </div>
                            <div className="info_container_second">
                                <label>Expected # of students</label>
                                <p>{zybooks?.additional_comments}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="adopt_bottom">
                    {/* <div className="circle_wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="active_circle"></div>
                    </div> */}
                    <div className='circle_container'>
                        <div className="circle_wrapper">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="active_circle"></div>
                        </div>
                        <div>
                            {error && error?.class_number ? <div className='error'>{error?.class_number[0]}</div> : null}
                        </div>
                    </div>
                    <div className="adopt_bottom_button" style={{ bottom: '-10px' }}>
                        <div className='bottom_buttons'>
                            <button className="back" onClick={() => onPrevStep(step - 1)}> Back <span>{backText}</span></button>
                            <button className='next' onClick={() => CheckData()}>
                                {loading ? <Spinner animation='border' /> :
                                    "Adopt"
                                }
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Review