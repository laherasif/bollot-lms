import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Small } from '../../../../src/components/admin/loader'
import EditProfile from '../../../../src/components/admin/editProfile'
import { Breadcrumb, Spinner } from "react-bootstrap";
import Sidebar from "../../../../src/components/admin/sidebar2";
import axios from "axios";
import { SweetAlert } from "../../../../src/function/hooks";
import { updateAdmin } from "../../../../src/redux/actions/admin";
const options = ["one", "two", "three"];


const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)

  const { Admin, token } = useSelector((state: RootStateOrAny) => state?.admin)

  const [state, setState] = useState({ image: Admin?.image, fullname: Admin?.fullname, email: Admin?.email, about: Admin?.about, password: '', old_password: '', tagline: Admin?.tagline });
  const [url, setUrl] = useState('');
  const [errors, setErros] = useState({});
  const [edit, setEdit] = useState(false)


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])


  const myref = useRef()

  const dispatch = useDispatch()


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const BrowsImg = () => {
    myref.current.click()
  }



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };



  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          image: e.target?.result
        });
        setUrl(URL.createObjectURL(event.target.files[0]))
        // this.setState({
        //   selectedFile: e.target.result,
        // })
      }
    }


  }


  const SaveProfile = async () => {

    try {
      setLoader(true)
      let res = await AxInstance.post('api//edit-profile', state)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({ icon: 'success', text: res.data.message })
        dispatch(updateAdmin(res.data))

      }
      else {
        setLoader(false)
        setErros(res.data.error)

      }
    }
    catch (err) {
      setLoader(false)
      SweetAlert({ icon: 'error', text: err })

    }

  }




  return (
    <div className="inst idnasd0w3-edsad">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa my-4">
                  <div className="back-btn">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item active>Profile </Breadcrumb.Item>
                    </Breadcrumb>

                  </div>
                </div>


                <div className="complete-web-1">

                  <div className="hdsf0s-sadmsa">
                    <div className="complete-web-1">
                      <div className="umpire w-100">
                        <div className="umpire-1 ">
                          <div>
                            <img src={url || state.image || "/assets/images/umpire-1.svg"} alt="" />
                          </div>
                          <div className="maxima">
                            <div className="d-flex">
                              <button className="upload-1" onClick={BrowsImg}>Upload New</button>
                              <input name="fullname" type="file" id="image" ref={myref} onChange={(e) => handleChangeFile(e)} name="image" style={{ display: 'none' }} />
                              <button className="upload-1" onClick={() => SaveProfile()}>
                                {
                                  loader ?

                                    <Spinner animation="border" />
                                    :

                                    "Update Profile"
                                }
                              </button>
                            </div>
                            <p>Maximum size of 1MB. JPG, GIF, or PNG.</p>
                          </div>
                        </div>
                      </div>
                      <div className="sdkahfsndj-sadsd">
                        <div className="label-bar-1">
                          <label className="mb-5cst"  >
                            Full Name
                          </label>
                          <input
                            id={`${errors.fullname && 'input_filed_error'}`}
                            value={state.fullname}
                            onChange={handleChange}
                            name="fullname"
                            className="form-control"
                            type="text"
                            placeholder="Write Here...." />
                          {errors?.fullname && <div className="invalid mt-1">{errors?.fullname[0]}</div>}

                        </div>
                        <div className="label-bar-1">
                          <label className="mb-5cst"  >
                            Email
                          </label>
                          <input
                            className="form-control"
                            id={`${errors.email && 'input_filed_error'}`}
                            value={state.email}
                            onChange={handleChange}
                            name="email"
                            type="text"
                            placeholder="Write Here...." />
                          {errors?.email && <div className="invalid mt-1">{errors?.email[0]}</div>}

                        </div>
                      </div>
                      <div className="sdkahfsndj-sadsd">
                        {/* <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Birthday
                      </label>
                      <input id={`${errors.email && ' input_filed_error'}` } value={state.fullname} onChange={handleChange} name="fullname" placeholder="12 Jun 2022" type="date" />
                    </div> */}
                        <div className="label-bar-1">
                          <label className="mb-5cst"  >
                            Password
                          </label>
                          <input
                            className="form-control"
                            id={`${errors.password && 'input_filed_error'}`}
                            value={state.password}
                            onChange={handleChange}
                            name="password"
                            type="password" placeholder="new password" />

                          {errors?.password && <div className="invalid mt-1">{errors?.password[0]}</div>}
                        </div>

                        <div className="label-bar-1">
                          <label className="mb-5cst"  >
                            Tagline
                          </label>
                          <input
                            id={`${errors.tagline && 'input_filed_error'}`}
                            value={state.tagline}
                            onChange={handleChange}
                            name="tagline"
                            placeholder="Write Here...."
                            className="form-control"
                            type="text"
                          />
                          {errors?.tagline && <div className="invalid mt-1">{errors?.tagline[0]}</div>}

                        </div>
                        {/* <div className="label-bar-1">
                          <label className="mb-5cst"  >
                            Old Password
                          </label>
                          <input
                            className="form-control"
                            id={`${errors.old_password && 'input_filed_error'}`}
                            value={state.old_password}
                            onChange={handleChange}
                            name="old_password"
                            type="password"
                            placeholder="old password" />
                          {errors?.old_password && <div className="invalid mt-1">{errors?.old_password[0]}</div>}

                        </div> */}
                      </div>

                      <div className="sdkahfsndj-sadsd">
                        <div className="label-bar-1 cst-text-p">
                          <label className="mb-5cst"  >
                            About Me
                          </label>
                          <textarea
                            rows={10}
                            placeholder="Write here...."
                            className="form-control"
                            value={state.about}
                            onChange={handleChange}
                            name="about"
                            id={`${errors.about && 'input_filed_error'}`}
                          />
                          {errors?.about && <div className="invalid mt-1">{errors?.about[0]}</div>}

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        }

      </section >


      {edit && <EditProfile permition={edit} Toggle={(value: any) => setEdit(value)} />}
    </div>
  );
};

export default AdminAuth( Home );
