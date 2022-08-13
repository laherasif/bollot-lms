
import React, { useState } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  // NavDropdown,
  Offcanvas,
  Spinner,

} from "react-bootstrap";
// import Circulum from './circulum'
import Icons from "../../icons";
// import FieldDropdown from "./Fields/FieldDropdown";
// import ImagesUploader from "./ImagesUploader";
// import instance from "../../confiq/axios/instance";
// import { IoCloudCircleSharp } from "react-icons/io5";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SweetAlert } from "../../function/hooks";
import { useRouter } from "next/router";
import { addStudent, addInstructor } from '../../redux/actions/admin/index'
interface Course {

  role?: string,
  fullname?: string,
  email?: string,
  password?: string,

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



const initialState = {
  fullname: "",
  email: "",
  password: "",
  role: ''
};

export default ({ loader }: any) => {
  // const [item, setItem] = useState<Outcomes[]>([''])
  // const [request, setRequest] = useState<Requirements[]>([''])
  // const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course>(initialState)
  // const [Courses, setCourses] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const dispatch = useDispatch()


  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const clearState = () => {
    setState({ ...initialState });
  };


  const SaveCourse = async () => {

    let data = {
      // role: state.role,
      fullname: state.fullname,
      email: state.email,
      password: state.password,
    }


    try {
      setLoading(true)
      if (state.role !== "") {
        if (state.role === "student") {
          let res = await AxInstance.post('api//admin/students/add', data)
          if (res.data.success === true) {
            setLoading(false)
            dispatch(addStudent(res.data.response.student))

            SweetAlert({ icon: "success", text: res.data.message })
            clearState()
            // loader(true)
          }
          else {
            setLoading(false)
            setErrors(res.data.error)

          }
        }
        else {
          let res = await AxInstance.post('api//admin/instructors/add', data)
          if (res.data.success === true) {
            setLoading(false)
            dispatch(addInstructor(res.data.response.student))
            SweetAlert({ icon: "success", text: res.data.message })
            clearState()
            // loader(true)

          }
          else {
            setLoading(false)
            setErrors(res.data.error)

          }
        }
      }
      else {
        setLoading(false)
        SweetAlert({ icon: "error", text: "Role is required" })


      }


    } catch (error) {
      setLoading(false)
      SweetAlert({ icon: "error", text: error })


    }
  }



  return (
    <Navbar expand={false} className="jds0sas0w-eawne">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <button className="upload-1 ">
            Add New User
          </button>
          {/* <button className="upload-1 sdisad-dsdactive" >
            Add New User
             </button> */}
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Add New User
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>

            <div className="p-field">
              <label>Role </label>
              <div className="kns-sanweso02e">
                <Form.Select name="role" value={state?.role} onChange={(e) => hendleFields(e)}>
                  <option defaultChecked>Select User</option>
                  <option value="Instructor" >Instructor</option>
                  <option value="student" >Student</option>
                </Form.Select>
                {errors?.role && <div className="invalid mt-1">{errors.role}</div>}

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
                {errors?.fullname && <div className="invalid mt-1">{errors?.fullname[0]}</div>}

              </div>
              <div>
                <label>Email Address</label>
                <input type="text"
                  name="email"
                  value={state.email}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
                {errors?.email && <div className="invalid mt-1">{errors?.email[0]}</div>}

              </div>

              <div>
                <label>Password</label>
                <input type="password"
                  name="password"
                  value={state.password}
                  onChange={(e) => hendleFields(e)}
                  placeholder="Write here..." />
                {errors?.password && <div className="invalid mt-1">{errors?.password[0]}</div>}

              </div>





            </div>
            <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
              <div className="active_color w-100">
                <button onClick={() => SaveCourse()} className="upload-active-save ">
                  {loading ?
                    <Spinner animation="border" />
                    :
                    "Save"
                  }
                </button>
              </div>
            </div>
          </Offcanvas.Body>



        </Navbar.Offcanvas>
      </Container>
    </Navbar >
  );
};



