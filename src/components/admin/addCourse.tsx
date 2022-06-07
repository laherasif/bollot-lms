import axios from 'axios'
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import type { NextPage } from "next";
import { Form, Spinner } from "react-bootstrap";
import { SweetAlert } from "../../function/hooks";
import React, { useState, useEffect, } from 'react';
import { EditCourse } from '../../redux/actions/instructor/courses';
import {
  coursesId,
  addCourseInput,
  addCourseContentMore,
  addCourseContentInput,
  delCourseContent
} from '../../redux/actions/instructor/addcourse'
import { useRouter } from 'next/router';
interface Course {
  title: string,
  category_id: string,
  short_desc: string,
  long_desc: string,
  price: number,
  cover_image: string,

}

interface Outcomes {
  outcomes: Array<string>,

}
interface Requirements {
  requirements: Array<string>,

}
interface Courses {
  course_for: Array<string>

}

export default ({ onStepChange }: any) => {
  // const intl = useIntl();
  // const [item, setItem] = useState<Outcomes[]>([''])
  // const [request, setRequest] = useState<Requirements[]>([''])
  // const [course, setCourse] = useState<Courses[]>([''])
  // const [state, setState] = useState<Course>('')
  // const [Courses, setCourses] = useState([])
  const [url, setUrl] = useState()
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
  // const [courseId, setcourseId] = useState('')


  const dispatch = useDispatch()
  const router = useRouter()
  const courseSlug = router.query.id;

  const { token, Instructor, Catagories } = useSelector((state: RootStateOrAny) => state?.admin)

  const {
    AddCourse,
    course_for,
    requirements,
    courseId,
    outcomes } = useSelector((state: RootStateOrAny) => state.addCourse)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

console.log("addCourse" , AddCourse)

  useEffect(() => {
    const fetchData = async () => {
      try {

        let res = await AxInstance.get(`api//admin/courses/${courseSlug}`)
        
        if (res.data.success === true) {
          dispatch(coursesId(res.data.response.course?.id))
          dispatch(EditCourse(res.data.response.course))
        }

      }
      catch (err) {
      SweetAlert({ icon: "error", text: err })

      }
    }
    if (courseSlug) {
      fetchData()
    }
  }, [])

  const addItem = (field: string) => {
    dispatch(addCourseContentMore(field))

  }

  const removeInputFields = (index: number, field: string) => {
    dispatch(delCourseContent({ field, index }))

  }
  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { name, value } = evnt.target
    dispatch(addCourseContentInput({ field, index, value }))

  }


  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target
    dispatch(addCourseInput({ name, value }))
  };




  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      SweetAlert({ icon: "error", text: 'please select only image' })
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        let name = "cover_image"
        let value = e.target?.result
        // let imageUrl = URL.createObjectURL(event.target.files[0])
        let names = "url"
        dispatch(addCourseInput({ name, value }))

      }
      setUrl(URL.createObjectURL(event.target.files[0]))
      let name = "url"
      let value = URL.createObjectURL(event.target.files[0])
      dispatch(addCourseInput({ name, value }))
    }
  }

  const SaveCourse = async () => {

    let removeComma = parseFloat(AddCourse.price.replace(/,/g, ""))
    let convertToNumber = Number(removeComma)

    let data = {
      course_id: courseId ? courseId : "",
      instructor_id: AddCourse.instructor_id,
      title: AddCourse.title,
      category_id: AddCourse.category_id,
      short_desc: AddCourse.short_desc,
      long_desc: AddCourse.long_desc,
      price: convertToNumber ,
      discounted_price: AddCourse.dprice || AddCourse.discounted_price,
      cover_image: AddCourse.cover_image,
      outcomes: outcomes,
      requirements: requirements,
      course_for: course_for

    }



    try {
      setLoading(true)
      let res = await AxInstance.post('api//admin/courses/store', data)
      if (res.data.success === true) {
        setLoading(false)
        onStepChange()
        SweetAlert({ icon: 'success', text: res.data.message })
        dispatch(coursesId(res.data.response.course.id))

      }
      else {
        setErrors(res.data.error)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)

      SweetAlert({ icon: 'error', text: error })

    }
    // return null
  }



  return (
    <div className="inst" style={{ padding: '0px 35px' }}>
      <h3 style={{paddingLeft:"10px"}}> {courseSlug ? "Edit Course" : "Add Course"} </h3>
      <div className="p-field">

        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <label>Instructor </label>
          <span>Select instructor to upload this course to his account</span>

        </div>
        <div className="kns-sanweso02e">
          <Form.Select name="instructor_id"
            value={AddCourse?.instructor_id} onChange={(e) => hendleFields(e)}>
            <option defaultChecked>Select Instructor</option>
            {Instructor && Instructor.map((ins: any) => (
              <option key={ins?.id} value={ins?.id}>{ins?.fullname}</option>
            ))}
          </Form.Select>
          {errors?.instructor_id && <div className="invalid mt-1">{errors?.instructor_id[0]}</div>}


        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <label>Category</label>
          <span>Which category suites the best for this course</span>

        </div>
        <div className="kns-sanweso02e">
          <Form.Select name="category_id"
            value={AddCourse?.category_id} onChange={(e) => hendleFields(e)}>
            <option defaultChecked>Select Catagory</option>
            {Catagories && Catagories.map((cata) => (
              <option key={cata.id} value={cata.id}>{cata.name}</option>
            ))}
          </Form.Select>
          {errors?.category_id && <div className="invalid mt-1">{errors?.category_id[0]}</div>}


        </div>



        <div className="mt-2">
          <label>Course title</label>
          <br />
          <span>The first information to user describing your course</span>
          <input type="text"
            name="title"
            value={AddCourse?.title}
            onChange={(e) => hendleFields(e)}
            placeholder="Write here..." />
          {errors?.title && <div className="invalid mt-1">{errors?.title[0]}</div>}

        </div>

        <div className="mt-2">
          <label>Short Description</label>
          <br />
          <span>Complete details about your course</span>
          <textarea
            rows={4}
            name="short_desc"
            value={AddCourse?.short_desc}
            onChange={(e) => hendleFields(e)}
            className="asndkmc03e-dm3e"
            placeholder="Write here..."
          ></textarea>

          {errors?.short_desc && <div className="invalid mt-1">{errors?.short_desc[0]}</div>}

        </div>

        <div className="mt-2">
          <label>Description</label><br />
          <span>A prescribed informaiton about your course</span>
          <textarea
            rows={4}
            name="long_desc"
            value={AddCourse?.long_desc}
            onChange={(e) => hendleFields(e)}
            className="asndkmc03e-dm3e"
            placeholder="Write here..."
          ></textarea>
          {errors?.long_desc && <div className="invalid mt-1">{errors?.long_desc[0]}</div>}

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Course Image</label>
          <span>A cover photo show on website and landing page</span>
          <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
            <div className="kvjadsd-j43rm iasdufhvs-ernd">
              {AddCourse?.url || AddCourse?.cover_image ? <img src={AddCourse?.url || AddCourse?.cover_image} alt="course_img" style={{ width: '20%', height: ' 20%', objectFit: 'cover' }} /> : ""}
              {AddCourse?.url || AddCourse?.cover_image ? "" : <p>Drag your photos here</p>}
            </div>
            <input type="file" accept="image/png, image/gif, image/jpeg" name="cover_image" onChange={(e) => handleInputChange(e)} id="img" style={{ display: 'none' }} />
          </label>
        </div>
        {errors?.cover_image && <div className="invalid mt-1">{errors?.cover_image[0]}</div>}

        <div>
          <div className="p-field my-4 mt-0">
            <div >
              <label>Pricing</label><br />
              <span>How much to charge a student for this course</span>
            </div>
            <input
              type="text"
              name="price"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={AddCourse?.price}
              onChange={(e) => hendleFields(e)}
              placeholder="Write here..." />
            {errors?.price && <div className="invalid mt-1">{errors?.price[0]}</div>}

          </div>


          <div className="p-field my-4 mt-0">
            <div >
              <label>Discounted  Price</label><br />
              <span>How much to charge a student for this course</span>
            </div>
            <input
              type="text"
              name="dprice"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={AddCourse?.dprice || AddCourse?.discounted_price}
              onChange={(e) => hendleFields(e)}
              placeholder="Write here..." />
            {errors?.discounted_price && <div className="invalid mt-1">{errors?.discounted_price[0]}</div>}

          </div>

          <div className="p-field my-4 mt-0">
            <div >
              <label>Outcomes</label><br />
              <span>List down the consequences of this course</span>
            </div>
            {outcomes?.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "outcoms")} value={data.id ? data?.outcome : data} name="desc" />
                  {(outcomes.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "outcoms")}> <i className="fa fa-trash mt-3 " ></i> </div> : null}
                </div>

              )
            })
            }

            <h3 style={{ cursor: 'pointer' }} onClick={() => addItem('outcoms')} >+ Add more </h3>

          </div>
          <div className="p-field my-4 mt-0">
            <div >
              <label>Requirements</label><br />
              <span>Education required for enrolling in this course</span>
            </div>
            {/* <input type="text" placeholder="Write here..." /> */}
            {requirements?.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "request")} value={data.id ? data?.requirement : data} name="desc" />
                  {(requirements.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "request")}> <i className="fa fa-trash mt-3 " ></i> </div> : null}
                </div>

              )
            })
            }
            <h3 style={{ cursor: 'pointer' }} onClick={() => addItem('request')} >+ Add more </h3>

          </div>
          <div className="p-field my-4 mt-0">
            <div >
              <label>Course for</label><br />
              <span>List down who should take this course</span>
            </div>
            {/* <input type="text" placeholder="Write here..." /> */}
            {course_for?.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" className="mt-1" placeholder="Write here..." onChange={(evnt) => handleChange(index, evnt, "course")} value={data.id ? data?.for : data} name="desc" />
                  {(course_for.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "course")}> <i className="fa fa-trash mt-3 "> </i></div> : null}
                </div>

              )
            })
            }
            <h3 style={{ cursor: 'pointer' }} onClick={() => addItem("course")} >+ Add more </h3>

          </div>

          <div className="umpire w-100 " >
            <div className="umpire-1 umpire-1-cst d-flex justify-content-center mt-3 ">
              <div className="d-flex mb-3 idfadsf-sads">

                <button
                  className="upload-1 sdisad-dsdactive"
                  onClick={() => SaveCourse()}
                >
                  <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                  {loading ? <Spinner animation="border" /> : "Save & Next"}
                </button>
              </div>

            </div>
          </div>

          {/* <div className="idfadsf-sads kajfds-sdfe" >
            <button onClick={() => SaveCourse()} className="upload-1 sdisad-dsdactive">
              {loading ?
                <div className="spinner-border text-light" role="status">
                </div>
                :
                "Save & Next "
              }
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
};



