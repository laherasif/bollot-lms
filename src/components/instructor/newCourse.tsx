import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Spinner
} from "react-bootstrap";
import Circulum from './circulum'
import Icons from "../../icons";
import FieldDropdown from "./Fields/FieldDropdown";
// import ImagesUploader from "./ImagesUploader";
import instance from "../../confiq/axios/instance";
import { IoCloudCircleSharp } from "react-icons/io5";
// import { google } from 'googleapis'
import axios from 'axios'
import { useSelector, RootStateOrAny } from "react-redux";

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







export default (catagory: any) => {
  const [item, setItem] = useState<Outcomes[]>([''])
  const [request, setRequest] = useState<Requirements[]>([''])
  const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course>('')
  const [Courses, setCourses] = useState([])
  const [url, setUrl] = useState()
  const [showCirculm, setShowCirculm] = useState(false )
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

  console.log("newcourse", courseId)


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


  const Video = () => {


  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      // setState({ cover_image: e.target?.result })
      setState({
        ...state,
        cover_image: e.target?.result
      });
      setUrl(URL.createObjectURL(event.target.files[0]))
      // this.setState({
      //   selectedFile: e.target.result,
      // })
    }
  }

  const SaveCourse = async () => {

    let data = {
      title: state.title,
      category_id: state.category_id,
      short_desc: state.short_desc,
      long_desc: state.long_desc,
      price: state.price,
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
        setcourseId(res.data.response.course.id)
        setShowCirculm(true)

      }
      else {
        setErrors(res.data.error)
        setLoading(false)
      }
    } catch (error) {
    }
  }




  return (
    <Navbar expand={false} className="jds0sas0w-eawne">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <div className="idfadsf-sads">
            <button className="upload-1 sdisad-dsdactive">
              <Icons name="i9" />
              Add New Course
            </button>
          </div>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              { showCirculm ? "Add Curriculum" :  "Add New Course"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          {showCirculm ?

            <Offcanvas.Body>
              <Circulum course_id={courseId}/>
            </Offcanvas.Body>
            :
          <Offcanvas.Body>

            <div className="p-field">
              <label>Category</label>
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

            </div>



            <div className="p-field">

              <div className="mt-2">
                <label>Course title</label>
                <input type="text"
                  name="title"
                  value={state.title}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
                {errors?.title && <div className="invalid mt-1">{errors?.title[0]}</div>}

              </div>

              <div className="mt-2">

                <label>Short Description</label>
                <input type="text"
                  name="short_desc"
                  value={state.short_desc}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
                {errors?.short_desc && <div className="invalid mt-1">{errors?.short_desc[0]}</div>}

              </div>

              <div className="mt-2">
                <label>Course subtitle</label>
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
                <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                  <div className="kvjadsd-j43rm iasdufhvs-ernd">
                    <Icons name="i29" />
                    {url ? <img src={url} alt="course_img" style={{ width: '100%', objectFit: 'cover' }} /> : ""}
                    {!url && <p>Drag your photos here</p>}
                    {/* <p>Add at least 5 photos</p> */}
                  </div>
                  <input type="file" name="cover_image" onChange={(e) => handleInputChange(e)} id="img" style={{ display: 'none' }} />
                </label>
              </div>
              {errors?.cover_image && <div className="invalid mt-1">{errors?.cover_image[0]}</div>}

              <div>
                <div className="p-field my-4 mt-0">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Pricing</label>
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
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Outcomes</label>
                  </div>
                  {/* <input type="text" placeholder="Write here..." /> */}
                  {item.map((data: any, index: number) => {
                    return (
                      < div style={{ display: 'flex' }}>
                        <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "outcoms")} value={data} name="desc" />
                        {(item.length !== 1) ? <button className="mt-1" onClick={(evnt) => removeInputFields(index, "outcoms")}>Del</button> : null}
                      </div>

                    )
                  })
                  }

                  <h3 style={{ cursor: 'pointer' }} onClick={() => addItem('outcoms')} >+ Add more to your response</h3>

                </div>
                <div className="p-field my-4 mt-0">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Requirements</label>
                  </div>
                  {/* <input type="text" placeholder="Write here..." /> */}
                  {request.map((data: any, index: number) => {
                    return (
                      < div style={{ display: 'flex' }}>
                        <input type="text" placeholder="Write here..." className="mt-1" onChange={(evnt) => handleChange(index, evnt, "request")} value={data.desc} name="desc" />
                        {(request.length !== 1) ? <button className="mt-1" onClick={(evnt) => removeInputFields(index, "request")}>Del</button> : null}
                      </div>

                    )
                  })
                  }
                  <h3 style={{ cursor: 'pointer' }} onClick={() => addItem('request')} >+ Add more to your response</h3>

                </div>
                <div className="p-field my-4 mt-0">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Course for</label>
                  </div>
                  {/* <input type="text" placeholder="Write here..." /> */}
                  {course.map((data: any, index: number) => {
                    return (
                      < div style={{ display: 'flex' }}>
                        <input type="text" className="mt-1" placeholder="Write here..." onChange={(evnt) => handleChange(index, evnt, "course")} value={data.desc} name="desc" />
                        {(course.length !== 1) ? <button className="mt-1" onClick={(evnt) => removeInputFields(index, "course")}>Del</button> : null}
                      </div>

                    )
                  })
                  }
                  <h3 style={{ cursor: 'pointer' }} onClick={() => addItem("course")} >+ Add more to your response</h3>

                </div>

              </div>
            </div>
            <div className="d-flex">
              {/* <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                <button onClick={() => Video()} className="upload-1 sdisad-dsdactive ">
                  Preview
                </button>
              </div> */}
              <div className="idfadsf-sads kajfds-sdfe">
                <button onClick={() => SaveCourse()} className="upload-1 sdisad-dsdactive">
                  {loading ?
                    // <Spinner animation="border" varient="loght" />
                    <div className="spinner-border text-light" role="status">
                    </div>
                    :
                    "Save & Next "
                  }
                </button>
              </div>
            </div>
          </Offcanvas.Body>
           } 



        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};



