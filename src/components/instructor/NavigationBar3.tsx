import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Link from 'next/link'
import { Dropdown } from "react-bootstrap";
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { LogoutIns } from '../../../src/redux/actions/auth/user'
import Icons from "../../icons";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useRouter } from "next/router";
export default () => {
  const isTab = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isTabsm = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const { User } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const router = useRouter()
  const [loading, setLoading] = useState(false)


  const dispatch = useDispatch()

  const Logout = () => {
    debugger
    // setLoading(true)
    dispatch(LogoutIns())
    // setTimeout(() => {
    //   setLoading(false)
    router.push('/en/login')
    // }, 2000);
  }

  return (

    <>
      <div className="dsaofjosd-ajeir">
        <Navbar expand="lg" bg="light" variant="light">
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


                {/* <Link href="">
                  <a className="kjdshfi-serjh">
                    <Icons name="i6" />
                    Help & Support
                  </a>
                </Link>
                <Link href="">
                  <a className="kjdshfi-serjh">
                    <Icons name="i7" />
                    Notifications
                    <div className="idsjfa0-asdesaed" >
                      1
                    </div>
                  </a>
                </Link> */}

                <div className="kjdshfi-serjh">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
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
