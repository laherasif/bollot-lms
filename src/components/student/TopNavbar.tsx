import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap'
import Dropdowns from './dropdown';
import { LogoutIns } from '../../redux/actions/auth/user';
import { useRouter } from 'next/router';
import { getSearchCourses } from '../../redux/actions/student/courses';
import axios from 'axios';
import Messages from './messages';
import Notification from './notification';
export default () => {
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
    <div className="jsad-asdnsake">
      <div className="nadjfksad-asds">
        {/* <Dropdowns /> */}
        <div className="dsnodi-sdjsad searchbar-icon">
          <FiSearch color="#8A8A8A" size={17} onClick={() => state.length > 0 ? SeacchCourse() : ''} />
          <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Search" />
        </div>
      </div>

      <div className="idsafs-aadmsd">
        <div className="kdsfsd-dsdd" style={{ marginRight: '20px' }}>
          <div className="idsafs-aadmsd">
            <div className="kdsfsd-dsdd" ref={notify}>
              <div onClick={() => notification()}>
                <BiBell size={20} color="#ffff" />
                {notifications.some((s:any)=> s.is_read === "0")  ? <p></p> : ""}

              </div>

              {notif && <Notification notifications={notifications}/>}


            </div>
            <div className="kdsfsd-dsdd" ref={messanger}>
              <div onClick={() => messages()}>
                {/* <IoMailOutline color="#ffff" size={20} /> */}
                <IoMailOutline color="#A2A2A2" size={20} />

                {messagess.some((s:any)=> s.last_message_obj.is_read === "0")  ? <p></p> : ""}
              </div>
              {mesg && <Messages message={messagess} />}


            </div>
            {/* <p className="mt-3">{User.fullname || "instructor "}</p>
                  <img src={User.image || "/assets/images/umpire-1.svg"} /> */}

          </div>
        </div>
        <div className="kdsfsd-dsdd" style={{ marginRight: '20px' }}>


          {/* <div>
            <ul>
              <li>laher asif</li>
            </ul>
          </div> */}

          {/* <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="d-flex" >
                <IoMailOutline color="#A2A2A2" size={20} />
                <p>1</p>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item >
                <div style={{display:'flex'}}>
                  <div style={{display:'flex'}}>
                    <img src={User?.image || "/assets/images/umpire-1.svg"} className="mt-2" alt="profile_img" />
                  </div>
                  <div>
                  <p >laher asif</p>
                  </div>
                </div>
              </Dropdown.Item>


            </Dropdown.Menu>
          </Dropdown> */}
        </div>

        <div className="kjdshfi-serjh">
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

        {/* <p className="mt-4">{User?.fullname }</p>
      <Link href={"/en/profile"}>
      <img src={User?.image || "/assets/images/umpire-1.svg"} />
      </Link> */}

      </div>
    </div>
  )
}