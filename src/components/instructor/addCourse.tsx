import axios from 'axios'
import { useSelector, RootStateOrAny } from "react-redux";
import type { NextPage } from "next";
import { Form } from "react-bootstrap";
import { SweetAlert } from "../../function/hooks";
import React, { useState, useEffect, } from 'react';
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

export default ({ handleCourseId, onStepChange }: any) => {
  // const intl = useIntl();
  const [item, setItem] = useState<Outcomes[]>([''])
  const [request, setRequest] = useState<Requirements[]>([''])
  const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course>('')
  const [Courses, setCourses] = useState([])
  const [url, setUrl] = useState()
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
  const [courseId, setcourseId] = useState('')


  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  //   useImperativeHandle(
  //     ref,
  //     () => ({
  //       SaveCourse() {
  //           SaveCourse()
  //           return errors

  //         }
  //     }),
  // )




  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await AxInstance.get('api//instructor/courses/categories')
        setCourses(res.data.response.categories)
      }
      catch (err) {
        console.log("err", err)
      }
    }
    fetchData()
  }, [])

  const addItem = (field: string) => {
    if (field === "outcoms") {
      setItem([...item, ''])
    }
    else if (field === "request") {
      setRequest([...request, ''])
    }
    else {
      setCourse([...course, ''])

    }
  }

  const removeInputFields = (index: number, field: string) => {
    if (field === "outcoms") {
      const rows = [...item];
      rows.splice(index, 1);
      setItem(rows);
    }
    else if (field === "request") {
      const rows = [...request];
      rows.splice(index, 1);
      setRequest(rows);
    }
    else {
      const rows = [...course];
      rows.splice(index, 1);
      setCourse(rows);
    }
  }
  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>, field: string) => {

    const { name, value } = evnt.target;
    if (field === "outcoms") {
      const list = [...item];
      list[index] = value;
      setItem(list);
    }
    else if (field === "request") {
      const list = [...request];
      list[index] = value;
      setRequest(list);
    }
    else {
      const list = [...course];
      list[index] = value;
      setCourse(list);
    }
  }


  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
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
        // setState({ cover_image: e.target?.result })
        setState({
          ...state,
          cover_image: e.target?.result
        });
        setUrl(URL.createObjectURL(event.target.files[0]))
        
      }
    }
  }

  const SaveCourse = async () => {

    let data = {
      title: state.title,
      category_id: state.category_id,
      short_desc: state.short_desc,
      long_desc: state.long_desc,
      price: state.price,
      discounted_price: state.dprice,
      cover_image: state.cover_image,
      outcomes: item,
      requirements: request,
      course_for: course

    }



    try {
      setLoading(true)
      let res = await AxInstance.post('api//instructor/courses/store', data)
      if (res.data.success === true) {
        setLoading(false)
        onStepChange()
        handleCourseId(res.data.response.course.id)

      }
      else {
        setErrors(res.data.error)
        setLoading(false)
      }
    } catch (error) {
    }
    // return null
  }



  return (
    <div className="inst" style={{ padding: '0px 35px' }}>
        <h3>Add Course </h3>
      <div className="p-field">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Category</label>
          <span>Which category suites the best for this course</span>

        </div>
        <div className="kns-sanweso02e">
          <Form.Select name="category_id"
            value={state.category_id} onChange={(e) => hendleFields(e)}>
            <option defaultChecked>Select Catagory</option>
            {Courses && Courses.map((cata) => (
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
            value={state.title}
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
            value={state.short_desc}
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
            value={state.long_desc}
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
              {url ? <img src={url} alt="course_img" style={{ width: '20%', height :' 20%' , objectFit: 'cover' }} /> : ""}
              {!url && <p>Drag your photos here</p>}
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
              type="number"
              name="price"
              value={state.price}
              onChange={(e) => hendleFields(e)}
              placeholder="Write here..." />
            {errors?.price && <div className="invalid mt-1">{errors?.price[0]}</div>}

          </div>


          <div className="p-field my-4 mt-0">
            <div >
              <label>Discount Pricing</label><br />
              <span>How much to charge a student for this course</span>
            </div>
            <input
              type="number"
              name="dprice"
              value={state.dprice}
              onChange={(e) => hendleFields(e)}
              placeholder="Write here..." />
            {errors?.discounted_price && <div className="invalid mt-1">{errors?.discounted_price[0]}</div>}

          </div>

          <div className="p-field my-4 mt-0">
            <div >
              <label>Outcomes</label><br />
              <span>List down the consequences of this course</span>
            </div>
            {item.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "outcoms")} value={data} name="desc" />
                  {(item.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "outcoms")}> <i className="fa fa-trash mt-3 " ></i> </div> : null}
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
            {request.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "request")} value={data.desc} name="desc" />
                  {(request.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "request")}> <i className="fa fa-trash mt-3 " ></i> </div> : null}
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
            {course.map((data: any, index: number) => {
              return (
                < div style={{ display: 'flex' }}>
                  <input type="text" className="mt-1" placeholder="Write here..." onChange={(evnt) => handleChange(index, evnt, "course")} value={data.desc} name="desc" />
                  {(course.length !== 1) ? <div style={{ marginLeft: '4px' }} onClick={(evnt) => removeInputFields(index, "course")}> <i className="fa fa-trash mt-3 "> </i></div> : null}
                </div>

              )
            })
            }
            <h3 style={{ cursor: 'pointer' }} onClick={() => addItem("course")} >+ Add more </h3>

          </div>

          <div className="idfadsf-sads kajfds-sdfe" >
            <button onClick={() => SaveCourse()} className="upload-1 sdisad-dsdactive">
              {loading ?
                <div className="spinner-border text-light" role="status">
                </div>
                :
                "Save & Next "
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};



