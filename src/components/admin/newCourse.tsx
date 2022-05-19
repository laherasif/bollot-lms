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
            <button className="upload-active ">
              <Icons name="i9" />
              Add New Employe
            </button>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Add New Employe
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>

            <div className="p-field">
              <label>Role </label>
              <div className="kns-sanweso02e">
                <Form.Select name="category_id">
                  <option defaultChecked>Select User</option>
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
                <label>Cover Image</label>
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


            </div>
            <div style={{ display: 'flex', justifyContent: 'center' , marginTop:'20px'}}>
              <div className="active_color">
                <button onClick={() => SaveCourse()} className="upload-active ">
                  Save
                </button>
              </div>
            </div>
          </Offcanvas.Body>



        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};



