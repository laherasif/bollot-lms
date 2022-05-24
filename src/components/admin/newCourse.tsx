import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Spinner,

} from "react-bootstrap";
import Circulum from './circulum'
import Icons from "../../icons";
import FieldDropdown from "./Fields/FieldDropdown";
// import ImagesUploader from "./ImagesUploader";
import instance from "../../confiq/axios/instance";
import { IoCloudCircleSharp } from "react-icons/io5";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { SweetAlert } from "../../function/hooks";
import {useRouter} from "next/router";


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
};

export default () => {
  const [item, setItem] = useState<Outcomes[]>([''])
  const [request, setRequest] = useState<Requirements[]>([''])
  const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course>(initialState)
  const [Courses, setCourses] = useState([])
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
      role: state.role,
      fullname: state.fullname,
      email: state.email,
      password: state.password,
    }


    try {
      setLoading(true)
      let stu = await AxInstance.post('api//admin/students/add', data)
      let ins = await AxInstance.post('api//admin/instructors/add', data)
      let res = state.role === "student" ? stu : ins
      if (res.data.success === true ) {
        setLoading(false)
        SweetAlert({icon :"success" , text :res.data.message })
        router.push('/en/admin/employe')
        clearState()
      }
      else {
        setLoading(false)
        setErrors(res.data.error)

      }
    } catch (error) {
      setLoading(false)
      SweetAlert({icon :"error" , text : error })


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
                <Form.Select name="role" value={state?.role} onChange={(e) => hendleFields(e)}>
                  <option defaultChecked>Select User</option>
                  <option value="Instructor" >Instructor</option>
                  <option value="student" >Student</option>
                </Form.Select>
                {errors?.role && <div className="invalid mt-1">{errors?.role[0]}</div>}

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
                <input type="email"
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
            <div style={{ marginTop: '20px',width:'100%' , textAlign:'center'}}>
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
    </Navbar>
  );
};



