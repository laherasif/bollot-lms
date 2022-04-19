import React, { useState } from "react";
import Image from "next/image";
import Icons from "../../icons";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Link from "next/link";
const LogoImage = require("../../images/logo.png");
import { useRouter } from 'next/router'
import { useIntl } from "react-intl";
import { useSelector, RootStateOrAny } from "react-redux";
const App = () => {
  // const intl = useIntl();
  const router = useRouter()
  const [search, setSearch] = useState('')
  const carts = useSelector((state: RootStateOrAny) => state.cartReducer.AddCart)
  const { User } = useSelector((state: RootStateOrAny) => state.userReducer)

  const searchCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/en/courses/${search}`)
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
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link>
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
            <Nav.Link href="">
              <form onSubmit={searchCourse}>
                <div className="search-bar">
                  <input
                    placeholder="Search here"
                    type="text"
                    className="dsifs-sadi3adasd"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Icons name="search" />
                </div>
              </form>
            </Nav.Link >

            {User ?

              <Link href={User.role === "student" ? "/en/student/dashboard" : "/en/instructor"}>
                <button className="btn-1s">Go to Dashaord</button>
              </Link>
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
            <></>
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
