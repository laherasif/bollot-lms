import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,

} from "react-bootstrap";
import Circulum from './circulum'
import Icons from "../../icons";
import FieldDropdown from "./Fields/FieldDropdown";
// import ImagesUploader from "./ImagesUploader";
import instance from "../../confiq/axios/instance";
import { IoCloudCircleSharp } from "react-icons/io5";


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
  console.log("catagory", catagory)



  const [item, setItem] = useState<Outcomes[]>([''])
  const [request, setRequest] = useState<Requirements[]>([''])
  const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course[]>([])
  const [Courses, setCourses] = useState([])
  const [url, setUrl] = useState()
  const [showCirculm, setShowCirculm] = useState(true)





  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setState({
        ...state,
        cover_image: e.target?.result
      });
      setUrl(URL.createObjectURL(event.target.files[0]))

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

    console.log("daa", state)

    try {
      let res = await instance.post('api//instructor/courses/store', data)
      console.log("res", res)
      setShowCirculm(true)
    } catch (error) {
      console.log("err", error)
    }
  }




  return (
    <Navbar expand={false} className="jds0sas0w-eawne">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <div className="idfadsf-sads">
            <button className="upload-1 sdisad-dsdactive">
              <Icons name="i9" />
              Add New 
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
              Add New 
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>

            <div className="p-field">
              <label>Role </label>
              <div className="kns-sanweso02e">
                <Form.Select name="category_id">
                  <option defaultChecked>Select Catagory</option>
                  <option value="Instructor" >Instructor</option>
                  <option value="student" >Student</option>
                </Form.Select>

              </div>

            </div>



            <div className="p-field mt-2">

              <div>

                <label>Fullname</label>
                <input type="text"
                  name="fullname"
                  value={state.fullname}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
              </div>

              <div>

                <label>Email Address</label>
                <input type="email"
                  name="email"
                  value={state.email}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
              </div>

              <div>
                <label>Course subtitle</label>
                <textarea
                  rows={4}
                  name="long_desc"
                  value={state.long_desc}
                  onChange={(e) => hendleFields(e)}
                  className="asndkmc03e-dm3e"
                  placeholder="Write here..."
                ></textarea>
              </div>

              <div>
                <label>Course Image</label>
                <div className="drop-box">
                  <label htmlFor="img" style={{ cursor: 'pointer' }}>
                    <div className="kvjadsd-j43rm iasdufhvs-ernd">
                      <Icons name="i29" />
                      <img src={url} alt="course_img" style={{ width: '100%', objectFit: 'cover' }} />
                      {!url && <p>Drag your photos here</p>}
                      {/* <p>Add at least 5 photos</p> */}
                    </div>
                  </label>
                  <input type="file" name="cover_image" onChange={(e) => handleInputChange(e)} id="img" style={{ display: 'none' }} />
                </div>
              </div>
              <div>
                <div className="p-field my-4">
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

                </div>

                <div className="p-field my-4">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Outcomes</label>
                  </div>
                  <input type="text" placeholder="Write here..." />


                </div>

                <div className="p-field my-4">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Requirements</label>
                  </div>
                  <input type="text" placeholder="Write here..." />
                </div>
                <div className="p-field my-4">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Course for</label>
                  </div>
                  <input type="text" placeholder="Write here..." />
                  

                </div>

              </div>
            </div>
            <div className="d-flex">
              <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                <button onClick={() => Video()} className="upload-1 sdisad-dsdactive ">
                  Preview
                </button>
              </div>
              <div className="idfadsf-sads kajfds-sdfe">
                <button onClick={() => SaveCourse()} className="upload-1 sdisad-dsdactive">
                  Submit for review
                </button>
              </div>
            </div>
          </Offcanvas.Body>



        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};



