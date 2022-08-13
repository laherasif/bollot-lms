import type { NextPage } from "next";
import Dropdown from "../../../../src/components/student/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { SweetAlert } from "../../../../src/function/hooks";
import { useState, useRef } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../../src/redux/actions/auth/user";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const options = ["one", "two", "three"];

const Home: NextPage = () => {
  // const intl = useIntl();

  const myref = useRef()

  const dispatch = useDispatch()

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)


  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ image: User?.image, fullname: User?.fullname, email: User?.email, about: User?.about, password: '', old_password: '', tagline: User?.tagline });
  const [url, setUrl] = useState('');
  const [errors, setErros] = useState({});

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


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const SaveProfile = async () => {

    try {
      setLoading(true)
      let res = await AxInstance.post('api//edit-profile', state)
      if (res.data.success === true) {
        setLoading(false)
        SweetAlert({ icon: 'success', text: res.data.message })
        dispatch(updateUser(res.data))

      }
      else {
        setLoading(false)
        setErros(res.data.error)

      }
    }
    catch (err) {
      setLoading(false)
      SweetAlert({ icon: 'error', text: err })

    }

  }




  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <h3>My Profile</h3>
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
                              loading ?

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
                      <input id={`${errors.fullname && 'input_filed_error'}`} value={state.fullname}
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
                      <input className="form-control" id={`${errors.email && 'input_filed_error'}`} value={state.email} onChange={handleChange} name="email" type="text" placeholder="Write Here...." />
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
                      <input className="form-control" id={`${errors.password && 'input_filed_error'}`} value={state.password} onChange={handleChange} name="password" type="password" placeholder="new password" />

                      {errors?.password && <div className="invalid mt-1">{errors?.password[0]}</div>}
                    </div>
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Old Password
                      </label>
                      <input className="form-control" id={`${errors.old_password && 'input_filed_error'}`} value={state.old_password} onChange={handleChange} name="old_password" type="password" placeholder="old password" />
                      {errors?.old_password && <div className="invalid mt-1">{errors?.old_password[0]}</div>}

                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Tagline
                      </label>
                      <input id={`${errors.tagline && 'input_filed_error'}`} value={state.tagline} onChange={handleChange} name="tagline"
                        placeholder="Write Here...."
                        className="form-control"
                        type="text"
                      />
                      {errors?.tagline && <div className="invalid mt-1">{errors?.tagline[0]}</div>}

                    </div>
                    {/* <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Language
                      </label>
                      <input id={`${errors.email && ' input_filed_error'}` } value={state.fullname} onChange={handleChange} name="fullname" type="text" placeholder="English" />
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
      </section>
    </>
  );
};

export default withAuth(Home);
