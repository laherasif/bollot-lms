import React, { useState } from "react";
import Image from "next/image";
import Icons from "../../icons";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Link from "next/link";
const LogoImage = require("../../images/logo.png");
import { useRouter } from 'next/router'
import { useIntl } from "react-intl";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { LogoutIns } from '../../redux/actions/auth/user';
const App = () => {
  // const intl = useIntl();
  const router = useRouter()
  const [search, setSearch] = useState('')
  const carts = useSelector((state: RootStateOrAny) => state.cartReducer.AddCart)
  const { User } = useSelector((state: RootStateOrAny) => state.userReducer)


  const dispatch = useDispatch()

  const searchCourse = () => {
    // e.preventDefault()
    // let removeSpace = search.split(" ").join("");
    router.push(`/en/courses/?search=${search}`)
  }

  const Logout = () => {
    dispatch(LogoutIns())
    setTimeout(() => {
      if (User.role === "company") {
        router.push('/en/businesslogin')

      }
      else {
        router.push('/en/login')
      }
    }, 2000);
  }

  return (
    <Navbar expand="lg" expand="xl">
      <Container fluid>
        <Navbar.Brand style={{ cursor: 'pointer' }}>
          <Link href="/" >
            <Image width={170} height={40} src={LogoImage} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "200px", }}
            navbarScroll
          >
            <Nav.Link style={{ color: 'red' }}>
              <Link href="/en/courses">Courses</Link>
            </Nav.Link>
            <Nav.Link>
              <Link href="/en/blogs">Blog</Link>
            </Nav.Link>

            <Nav.Link href="">
              <Link href="/en/about">About Us</Link>
            </Nav.Link>
            <Nav.Link href="">

              <Link href="/en/contact">Contact Us</Link>
            </Nav.Link>
            {/* <Nav.Link > */}
            <div className="search-bar">
              <input
                placeholder="Search here"
                type="text"
                className="dsifs-sadi3adasd"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={() => searchCourse()} className="searchbar-icon">
                <Icons name="search" />

              </div>
              </div>

              {/* <form > */}
              {/* <div className="search-bar">
                  <input
                    placeholder="Search here"
                    type="text"
                    className="dsifs-sadi3adasd"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div onClick={() => searchCourse()}>
                    <Icons name="search" />

                  </div> */}
              {/* </div> */}
              {/* </form> */}
              {/* </Nav.Link > */}

              <Link href="/en/cart">
                <button className="btn brd-no pos-rel">
                  <Icons name="cart" />
                  {carts && carts.length > 0 ?
                    <>
                      <div className="cart-inner">{carts?.length}</div>
                    </>
                    : null}
                </button>
              </Link>

              {User ?
                <div className="kjdshfi-serjh">

                  
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img style={{ borderRadius: '50%' }} src={User?.image || "/assets/images/umpire-1.svg"} alt="profile_img" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                      <Dropdown.Item as={Link} href={User?.role === "student" ? "/en/student/dashboard" : "/en/instructor"} >Dashboard</Dropdown.Item>
                      <Dropdown.Item as={Link} href={User?.role === "student" ? "/en/student/courses" : "/en/instructor/courses"} >My Courses</Dropdown.Item>
                      <Dropdown.Item as={Link} href={User?.role === "student" ? "/en/student/profile" : "/en/instructor/profile"} >Profile</Dropdown.Item>
                      <Dropdown.Item ><span onClick={() => Logout()}>Logout</span></Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                :
                <>
                  <Link href="/en/signup">
                    <button className="btn-2s">Sign Up</button>
                  </Link>
                  <Link href="/en/login">
                    <button className="btn-1s">Log in</button>
                  </Link>
                </>
              }

          </Nav>
          {/* <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default App;
