import React, { useEffect, useState, useRef } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Link from 'next/link'
import { Dropdown } from "react-bootstrap";
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { CleanState, LogoutIns } from '../../../src/redux/actions/auth/user'
import Icons from "../../icons";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Notification from '../../components/instructor/notification'
import Messages from '../../components/instructor/messages'
import axios from "axios";
import { logoutAdmin } from "../../redux/actions/admin";
import { clearStates } from "../../redux/actions/instructor/preview";
export default () => {
  const isTab = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isTabsm = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const { Admin, token } = useSelector((state: RootStateOrAny) => state?.admin)

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mesg, setMesg] = useState(false)
  const [notif, setNotif] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [messagess, setMessagess] = useState([])
  const [unRead, setUnRead] = useState()
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
      // let count = await AxInstance.get('api//unread-notifications-count')
      let message = await AxInstance.post('api//get-conversations', value)
      setNotifications(res.data.response.notifs)
      // setUnRead(count.data.response.unread_notifs)
      setMessagess(message.data.response.conversations)

    }
    fetchNotif()
  }, [])


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
    dispatch(logoutAdmin())
    dispatch(clearStates())
      router.push('/en/admin/login')
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
      <div className="dsaofjosd-ajeir">
        <Navbar expand="lg" bg="light" variant="light" id="admin-navbar">
          <div className="w-100" >
            <div className="w-1001">
              <div className="hdsf-sdsa">
                <Navbar.Brand  >
                  <Link href="/en/instructor" >
                    <img style={{ cursor: 'pointer' }} src="/assets/images/small-logo1.png" />
                  </Link>

                </Navbar.Brand>
              </div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            </div>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ajisdf-adfser">


                <div className="idsafs-aadmsd">
                  {/* <div className="" ref={notify} style={{ cursor: 'pointer' }}>
                    <div onClick={() => notification()}>
                      <BiBell size={20} color="#ffff"/>
                      {notifications?.some((s: any) => s?.is_read === "0") ? <p></p> : ""}
                    </div>
                    {notif && <Notification notifications={notifications} />}



                  </div> */}
                  {/* <div style={{marginLeft:'10px'}} ref={messanger} >
                    <div onClick={() => messages()} style={{ cursor: 'pointer' }}>
                      <IoMailOutline color="#ffff" size={20} />
                      {messagess?.some((s: any) => s?.last_message_obj.is_read === "0") ? <p></p> : ""}

                    </div>
                    {mesg && <Messages message={messagess} />}


                  </div> */}
                  {/* <p className="mt-3">{User.fullname || "instructor "}</p>
                  <img src={User.image || "/assets/images/umpire-1.svg"} /> */}

                </div>

                <div className="kjdshfi-serjh">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="kjdshfi-serjh">
                        {Admin?.fullname}
                        <img style={{ borderRadius: '50%' }} src={Admin?.image || "/assets/images/umpire-1.svg"} alt="profile_img" />
                        <Icons name="i8" />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Item as={Link} href="/" >Go to website</Dropdown.Item>
                      <Dropdown.Item as={Link} href="/en/admin/profile" >My Profile </Dropdown.Item>
                      <Dropdown.Item onClick={() => Logout()}><span >Logout</span></Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <div className="kjdshfi-serjh">
                        {User?.fullname}
                        <img style={{ borderRadius: '50%' }} src={User?.image || "/assets/images/umpire-1.svg"} alt="profile_img" />
                        <Icons name="i8" />
                      </div>

                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Item as={Link} href="/" >Go to website</Dropdown.Item>
                      <Dropdown.Item as={Link} href="/en/instructor/courses" >My Courses</Dropdown.Item>
                      <Dropdown.Item as={Link} href="/en/instructor/profile" >My Profile </Dropdown.Item>
                      <Dropdown.Item ><span onClick={() => Logout()}>Logout</span></Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>

              </Nav>

            </Navbar.Collapse>
          </div>
        </Navbar>


      </div>

    </>
  );
};
