import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
export default () => {

  const [state, setState] = useState('')
  const [notification, setNotification] = useState([])
  const [unRead, setUnRead] = useState()

  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });


  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    let value = {
      page_no: 1,
      rows_per_page: 5
    }
    let fetchNotif = async () => {
      let res = await AxInstance.get('api//notifications')
      let count = await AxInstance.get('api//unread-notifications-count')
      let message = await AxInstance.post('api//get-conversations', value)
      setNotification(res.data.response.notifs)
      setUnRead(count.data.response.unread_notifs)
      console.log("messg", message)

    }
    fetchNotif()
  }, [])




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


  return (
    <div className="jsad-asdnsake">
      <div className="nadjfksad-asds">
        <Dropdowns />
        <div className="dsnodi-sdjsad searchbar-icon">
          <FiSearch color="#8A8A8A" size={17} onClick={() => state.length > 0 ? SeacchCourse() : ''} />
          <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Search" />
        </div>
      </div>

      <div className="idsafs-aadmsd">
        <div className="kdsfsd-dsdd" style={{ marginRight: '20px' }}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="d-flex" >
                <BiBell size={20} />
                {unRead > 0 ? <p></p> : null}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ height: '100%' }}>
              {notification && notification.length ? notification.map((not: any, index: number) => (
                <Dropdown.Item as={Link} href='/' >
                  {not}
                </Dropdown.Item>
              ))
                : <div style={{ textAlign: 'center' }}>Not Record</div>
              }
            </Dropdown.Menu>
          </Dropdown>

        </div>
        <div className="kdsfsd-dsdd" style={{ marginRight: '20px' }}>

          <div className="d-flex" >
            <IoMailOutline color="#A2A2A2" size={20} />
            <p>1</p>
          </div>
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