import axios from 'axios'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { addZybookCourseInput, deleteZybookCourse } from '../../redux/actions/instructor/zybooks'
import CoursesModal from './OtherCourses'

const Custumization = ({ onStepChange, onPrevStep, step, backText }: any) => {


    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [courseCatalog, setCourseCatalog] = useState({})

    const { zybooks } = useSelector((state: RootStateOrAny) => state)
    const { Courses } = useSelector((state: RootStateOrAny) => state?.InsDash)

    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });



    const AddCourse = (course: Object) => {
        let name = "courses"
        let value = course
        dispatch(addZybookCourseInput({ name, value }))
    }


    const DelCourse = (id: number) => {
        dispatch(deleteZybookCourse(id))
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
                    <h4>Make it a Combo</h4>
                </div>
                <div className='content_container'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p>

                    <div className="course_wrappers mt-3">
                        {Courses && Courses?.map((cours) => (
                            <div className={zybooks?.courses?.some((s) => s?.id === cours?.id) ? "course_box_active course_box" : "course_box"} key={cours?.id}>
                                <div className="course_container" onClick={() => AddCourse(cours)}>
                                    <img src={cours?.cover_image} alt="course_image" />
                                    <p>{cours?.title}</p>
                                </div>
                                <div className={zybooks?.courses?.some((s) => s?.id === cours?.id) ? "course_right_active " : "course_right"}
                                    onClick={() => DelCourse(cours)}
                                >
                                    <IoMdClose />
                                </div>
                            </div>
                        ))
                        }

                    </div>

                    {Object.keys(courseCatalog).length ?
                        <>
                            <h5>Selected catalog Courses</h5>
                            <div className="course_wrapper">
                                <div className={courseCatalog.id === courseCatalog?.id ? "course_box_active course_box" : "course_box"} >
                                    <div className="course_container" onClick={() => AddCourse(courseCatalog)}>
                                        <img src={courseCatalog?.cover_image} alt="course_image" />
                                        <p>{courseCatalog?.title}</p>
                                    </div>
                                    <div
                                        className={courseCatalog?.id === courseCatalog?.id ? "course_right_active " : "course_right"}
                                        onClick={() => DelCourse(courseCatalog?.id)}
                                    >
                                        <IoMdClose />
                                    </div>
                                </div>
                            </div>
                        </>
                        : null}

                    <div className="catalog">
                        <p>Or select a new zyBooks from our catalog :
                            <button
                                onClick={() => setShow(true)}
                                className={zybooks?.courses?.length ? "disable" : ""}
                            >
                                Select from Catalog</button>

                        </p>
                    </div>

                    <div className="cut_zyLab">
                        <h5>Make it a Combo</h5>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.
                            <br /><span>(This will incur an additional charge of students)</span>
                        </p>
                        <div className="cut_zylab_radio">
                            <div className="radio_wrapper">
                                <input type="radio" name="use" />
                                <label>Use zyLabs</label>
                            </div>
                            <div className="radio_wrapper">
                                <input type="radio" name="use" />
                                <label>Use zyLabs</label>
                            </div>
                        </div>

                    </div>

                    <div className="cut_zyLab mt-3">
                        <h5>Make it a Combo</h5>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.
                            <br /><span>(This will incur an additional charge of students)</span>
                        </p>
                        <div className="cut_zylab_radio">
                            <div className="radio_wrapper">
                                <input type="checkbox" name="use" />
                                <label>Use zyLabs</label>
                            </div>
                            <div className="radio_wrapper">
                                <input type="checkbox" name="use" />
                                <label>Use zyLabs</label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="adopt_bottom">
                    <div className='circle_container'>
                        <div className="circle_wrapper">
                            <div className="circle"></div>
                            <div className="active_circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                        <div>
                            {error && error?.courses ? <div className='error'>{error?.courses[0]}</div> : null}
                        </div>
                    </div>
                    <div className="adopt_bottom_button " style={error?.courses ? { bottom: '10px' } : { bottom: '-10px' }}>
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

                {show && <CoursesModal
                    Toggle={(value: any) => setShow(value)}
                    permition={show}
                    course={(value: any) => { setCourseCatalog(value), setShow(false) }}
                />}

            </div>
        </>
    )
}

export default Custumization