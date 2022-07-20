import axios from 'axios'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import CoursesModal from './OtherCourses'
import { addZybookCourseInput, deleteZybookCourse } from '../../redux/actions/instructor/zybooks'
import { Spinner } from 'react-bootstrap'
const Select = ({ onStepChange }: any) => {

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [courseCatalog, setCourseCatalog] = useState({})



  const dispatch = useDispatch()

  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { Courses } = useSelector((state: RootStateOrAny) => state?.InsDash)
  const { zybooks } = useSelector((state: RootStateOrAny) => state)



  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const CheckData = async () => {
    const { courses, firtCourse, instructors, class_number, name, institution, start_date, end_date, expected_students, cause_usage, office_phone, mobile_phone, additional_comments, } = zybooks
    let arr =[]
    let merg = firtCourse
    let courseWrapper = arr.concat(merg.id)
    
    for (let i = 0; i < courses.length; i++) {
      const element = courses[i].id;
      arr.push(element)

    }

    let value = {
      courses: courseWrapper,
      instructors: instructors,
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
      let res = await AxInstance.post(`api//instructor/classes/store/0`, value)
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


  const AddCourse = (course: Object) => {
    let name = "firstcourses"
    let value = course
    dispatch(addZybookCourseInput({ name, value }))
  }

  const DelCourse = (id: number) => {
    dispatch(deleteZybookCourse(id , "firstCourse"))
  }


  return (
    <>
      <div className="cust_wrapper">
        <div className="cut_heading">
          <h4>Begin your zyBook adoption</h4>
        </div>
        <div className='content_container'>
          <div className="select_paras" >
            <p>Clone a zyBook from a recent class, start with a zyBook you're eveluating, or select one from </p>

            <p>Chose one of your current course :</p>
            <h5>Current Courses</h5>
            <div className="course_wrappers">
              {Courses && Courses?.map((cours) => (
                <div className={zybooks?.firtCourse?.id === cours?.id ? "course_box_active course_box" : "course_box"} key={cours?.id}>
                  <div className="course_container" onClick={() => AddCourse(cours)}>
                    <img src={cours?.cover_image} alt="course_image" />
                    <p>{cours?.title}</p>
                  </div>
                  <div
                    className={zybooks?.firtCourse?.id === cours?.id ? "course_right_active " : "course_right"}
                    onClick={() => DelCourse(cours?.id)}
                  >
                    <IoMdClose />
                  </div>
                </div>

              ))}

            </div>
            {Object.keys(courseCatalog).length ?
              <>
                <h5>Selected catalog Courses</h5>
                <div className="course_wrapper">
                  <div className={courseCatalog?.id === courseCatalog?.id ? "course_box_active course_box" : "course_box"} >
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
                className={Object.keys(zybooks?.firtCourse).length ? "disable" : "" }
                >Select from Catalog</button>

              </p>
            </div>

          </div>

        </div>
        <div className="adopt_bottom">
          <div className='circle_container'>
            <div className="circle_wrapper">
              <div className="active_circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div>
              {error && error?.courses ? <div className='error'>{error?.courses[0]}</div> : null}
            </div>
          </div>
          <div className="adopt_bottom_button" style={error?.courses ? { bottom: '10px' } : { bottom: '-10px' }}>
            <div className='bottom_buttons'>
              <button className="back" style={{ visibility: 'hidden' }}> Back <span>Contact information</span></button>
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

export default Select