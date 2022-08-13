import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Link from 'next/link'
import Dropdown from "./dropdown";
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
export default () => {
  const isTab = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isTabsm = useMediaQuery({
    query: "(max-width: 767px)",
  });
  return (
    <>
      {isTabsm ? (
        <>
          <Navbar expand="lg" bg="light" variant="light">
            <div className="w-100" >
                <div className="hdsf-sdsa">
                <Navbar.Brand  > 
                    <Link href="/en/instructor" >
                    <img src="/assets/images/small-logo.svg" />
                    </Link>
                
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </div>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
               <div className="my-4 d-flex justify-content-center">
               <Dropdown />
               </div>
      <div className="dsnodi-sdjsad m-auto my-4">
        <FiSearch color="#8A8A8A" size={17} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="idsafs-aadmsd m-auto">
      <div className="kdsfsd-dsdd">
        <BiBell size={20} />
        <p>1</p>
      </div>
      <div className="kdsfsd-dsdd">
        <IoMailOutline color="#A2A2A2" size={20} />
        <p>1</p>
      </div>

      <p></p>
      <Link href={"/en/profile"}>
      <img src="/assets/images/umpire-1.svg" /></Link>
    </div>

                </Nav>
              
              </Navbar.Collapse>
            </div>
          </Navbar>
        </>
      ) : (
        <></>
      )}
      { isTab? (
        <>
          <Navbar expand="lg" bg="light" expand={false}>
            <div  className="jdfs-sndf">
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
