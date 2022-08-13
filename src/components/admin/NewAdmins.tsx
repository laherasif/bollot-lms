
import React, { useEffect, useState } from "react";
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
interface Course {

  adminRole?: any,
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
  adminRole: []
};

export default ({ loaders  , roles }: any) => {
  // const [item, setItem] = useState<Outcomes[]>([''])
  // const [request, setRequest] = useState<Requirements[]>([''])
  // const [course, setCourse] = useState<Courses[]>([''])
  const [state, setState] = useState<Course>(initialState)
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)
  const [selectAll, setSelectAll] = useState(false)

  const router = useRouter()
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });




  // useEffect(() => {
  //   let fetchRoles = async () => {
  //     try {
  //       setRoleLoading(true)
  //       let res = await AxInstance.get('api//admin/sub-admins/roles/get')
  //       if (res.data.success === true) {
  //         setRoleLoading(false)
  //         setRoles(res.data.response.roles)
  //       }
  //     }
  //     catch (err) {
  //       setRoleLoading(false)
  //       SweetAlert({ icon: "error", text: err })
  //     }
  //   }
  //   fetchRoles()
  // }, [])


  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckBox = (id: number) => {

    let checkBox = state.adminRole
    let find = checkBox.indexOf(id)
    if (find > -1) {
      checkBox.splice(find, 1)
    } else {
      checkBox.push(id)
    }

    setState({
      ...state,
      adminRole: checkBox
    })

  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let check = event.target.checked
    let checkBox = state.adminRole
    if (check === true) {
      setSelectAll(true)
      for (let i = 0; i < roles.length; i++) {
        const element = roles[i].id;
        checkBox.push(element)
        setState({
          ...state,
          adminRole: checkBox
        })
      }
    }
    else {
      setSelectAll(false)
      setState({
        ...state,
        adminRole: []
      })
    }



  };



  const clearState = () => {
    setState({ ...initialState });
  };


  const SaveCourse = async () => {

    let data = {
      fullname: state.fullname,
      email: state.email,
      password: state.password,
      roles: state.adminRole
    }


    try {
      setLoader(true)
      let res = await AxInstance.post('api//admin/sub-admins/add', data)
      if (res.data.success === true) {
        SweetAlert({ icon: "success", text: res.data.message })
        setLoader(false)
        clearState()
        loaders(true)
      }
      else {
        setLoader(false)
        setErrors(res.data.error)
      }
    } catch (error) {
      setLoader(false)
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
              Add New Sub Admin
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>

            <label>Roles </label>
            {roles && roles.length ?
              <div className="checkbox-field">
                <div className="checkbox_wrapper">
                  <input
                    onChange={handleSelectAll}
                    type="checkbox"
                    name="all"
                  />
                  <span className="role_name"> all </span>
                </div>
                {roles && roles.map((role) => (
                  <div className="checkbox_wrapper" key={role?.id}>
                    <input
                      checked={selectAll ? selectAll : null}
                      onChange={() => handleCheckBox(role?.id)}
                      type="checkbox"
                      name={role?.role_key}
                    />
                    <span className="role_name"> {role?.role_key} </span>
                  </div>

                ))

                }
              </div>
              : <div style={{ textAlign: 'center' }}>
                <Spinner animation="border" />
              </div>
            }
                {errors?.roles && <div className="invalid mt-1">{errors?.roles[0]}</div>}


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
                  {loader ?
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



