import Link from 'next/link';
import React, { useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap'
import Dropdowns from './dropdown';
import { LogoutIns } from '../../redux/actions/auth/user';
import { useRouter } from 'next/router';
import { getSearchCourses } from '../../redux/actions/student/courses';
export default () => {

  const [state, setState] = useState('')

  const { User } = useSelector((state: RootStateOrAny) => state.userReducer)
  const dispatch = useDispatch()
  const router = useRouter()
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




  return <div className="jsad-asdnsake">
    <div className="nadjfksad-asds">
      <Dropdowns />
      <div className="dsnodi-sdjsad">
        <FiSearch color="#8A8A8A" size={17} onClick={() => state.length > 0 ? SeacchCourse() : ''} />
        <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Search" />
      </div>
    </div>

    <div className="idsafs-aadmsd">
      <div className="kdsfsd-dsdd">
        <BiBell size={20} />
        <p>1</p>
      </div>
      <div className="kdsfsd-dsdd">
        <IoMailOutline color="#A2A2A2" size={20} />
        <p>1</p>
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
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ display: 'flex', alignItems: 'center' }}>
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
        </Dropdown> */}
      </div>

      {/* <p className="mt-4">{User?.fullname }</p>
      <Link href={"/en/profile"}>
      <img src={User?.image || "/assets/images/umpire-1.svg"} />
      </Link> */}

    </div>
  </div>
}