import { Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import React, { useEffect, useState, useRef } from 'react';

import { useMediaQuery } from "react-responsive";
import Link from 'next/link'
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LogoutIns } from '../../redux/actions/auth/user';
import { useRouter } from 'next/router';
import { getSearchCourses } from '../../redux/actions/student/courses';
import axios from 'axios';
import Messages from './messages';
import Notification from './notification';
export default () => {
  const isTab = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isTabsm = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const { User, token } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mesg, setMesg] = useState(false)
  const [notif, setNotif] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [messagess, setMessagess] = useState([])
  const [unRead, setUnRead] = useState()
  const [state, setState] = useState('')

  const messanger = useRef();
  const notify = useRef();


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });



  const dispatch = useDispatch()

  useEffect(() => {
    let value = {
      page_no: 1,
      rows_per_page: 5
    }
    let fetchNotif = async () => {
      let res = await AxInstance.get('api//notifications')
      let count = await AxInstance.get('api//unread-notifications-count')
      let message = await AxInstance.post('api//get-conversations', value)
      setNotifications(res.data.response.notifs)
      // setUnRead(count.data.response.unread_notifs)
      setMessagess(message.data.response.conversations)

    }
    fetchNotif()
  }, [])



  // console.log("notifications" , notifications)


  const handleClickOutside = (event: any) => {


    if (mesg && messanger.current && !messanger.current.contains(event.target)) {
      setMesg(false);

    }
    else if (notif && notify.current && !notify.current.contains(event.target)) {
      setNotif(false);

    }

  };

  useEffect(() => {

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mesg, notif]);



  const Logout = () => {
    dispatch(LogoutIns())
    setTimeout(() => {
      router.push('/en/login')
    }, 2000);
  }


  const SeacchCourse = () => {
    router.push(`/en/student/search/${state}`)
    setState('')
  }



  const messages = () => {
    if (notif === true) {
      setNotif(false)
    }
    setMesg(true)
  }

  const notification = async () => {
    if (mesg === true) {
      setMesg(false)
    }
    setNotif(true)
    await AxInstance.get('api//notifications-read')
  }

  return (
    <>
      {isTabsm ? (
        <>
          <Navbar expand="lg" bg="light" variant="light">
            <div className="w-100" >
              <div className="hdsf-sdsa">
                <Navbar.Brand  >
                  <Link href="/en/dashboard" >
                    <img src="/assets/images/small-logo.svg" />
                  </Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              </div>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <div className="my-4 d-flex justify-content-center">
                    {/* <Dropdown /> */}
                  </div>
                  <div className="dsnodi-sdjsad searchbar-icon">
                    <FiSearch color="#8A8A8A" size={17} onClick={() => state.length > 0 ? SeacchCourse() : ''} />
                    <input type="text" name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Search" />
                  </div>
                  <div className="idsafs-aadmsd mt-2">
                    <div className="kdsfsd-dsdd" ref={notify}>
                      <div onClick={() => notification()}>
                        <BiBell size={20} color="#ffff" />
                        {notifications.some((s: any) => s.is_read === "0") ? <p></p> : ""}

                      </div>

                      {notif && <Notification notifications={notifications} />}


                    </div>
                    <div className="kdsfsd-dsdd" ref={messanger}>
                      <div onClick={() => messages()}>
                        {/* <IoMailOutline color="#ffff" size={20} /> */}
                        <IoMailOutline color="#A2A2A2" size={20} />

                        {messagess.some((s: any) => s.last_message_obj.is_read === "0") ? <p></p> : ""}
                      </div>
                      {mesg && <Messages message={messagess} />}


                    </div>
                    {/* <p className="mt-3">{User.fullname || "instructor "}</p>
                  <img src={User.image || "/assets/images/umpire-1.svg"} /> */}
                    <div className="kjdshfi-serjh mt-3">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <div className="d-flex">
                            <p className="mt-3">{User?.fullname}</p>
                            <img src={User?.image || "/assets/images/umpire-1.svg"} className="mt-2" alt="profile_img" />
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                          <Dropdown.Item as={Link} href='/' >Go to Website</Dropdown.Item>
                          <Dropdown.Item as={Link} href={User?.role === "student" ? "/en/student/courses" : "/en/instructor/courses"} >My Courses</Dropdown.Item>
                          <Dropdown.Item as={Link} href={User?.role === "student" ? "/en/student/profile" : "/en/instructor/profile"} >Profile</Dropdown.Item>
                          <Dropdown.Item ><span onClick={() => Logout()}>Logout</span></Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>

                    </div>


                  </div>

                </Nav>

              </Navbar.Collapse>
            </div>
          </Navbar>
        </>
      ) : (
        <></>
      )}
      {isTab ? (
        <>
          <Navbar expand="lg" bg="light" expand={false}>
            <div className="jdfs-sndf">
              <Navbar.Brand href="#"> </Navbar.Brand>
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    <img src="/assets/images/small-logo.svg" />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link href="/en/dashboard" >
                      <a className="nav-link" >Dashboard</a>
                    </Link>
                    <Link href="/en/courses">
                      <a className="nav-link" >Courses</a>
                    </Link>
                    <Link href="/en/settings">
                      <a className="nav-link" >Settings</a>
                    </Link>
                    <Link href="/en/bookmarks">
                      <a className="nav-link" >Bookmarks</a>
                    </Link>
                    <Link href="/en/accomplishment">
                      <a className="nav-link" >Accomplishment</a>
                    </Link>
                    <Link href="/en/reviews">
                      <a className="nav-link" >Reviews</a>
                    </Link>
                    <Link href="/en/purchase">
                      <a className="nav-link" >Purchase</a>
                    </Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Navbar>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
