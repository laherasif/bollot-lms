import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Link from 'next/link'
import {Dropdown} from "react-bootstrap";
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import Icons from "../../icons";
export default () => {
  const isTab = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isTabsm = useMediaQuery({
    query: "(max-width: 767px)",
  });
  return (
    <>
      <div className="dsaofjosd-ajeir">
      <Navbar expand="lg" bg="light" variant="light">
    <div className="w-100" >
       <div className="w-1001">
       <div className="hdsf-sdsa">
        <Navbar.Brand  > 
            <Link href="/en/dashboard" >
            <img src="/assets/images/small-logo1.png" />
            </Link>
        
      </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

       </div>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto ajisdf-adfser">
       
 
          <Link href="">
          <a className="kjdshfi-serjh">
            <Icons name="i6"/>
            Help & Support
          </a>
          </Link>
          <Link href="">
          <a className="kjdshfi-serjh">
            <Icons name="i7"/>
            Notifications
            <div className="idsjfa0-asdesaed" >
              1
              </div>
          </a>
          </Link>

          <div className="kjdshfi-serjh">
          <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  <div className="kjdshfi-serjh"> 
            John Doe
            <img src="/assets/images/umpire-1.svg"/>
            <Icons name="i8"/>
            </div>
          
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </div>

        </Nav>
      
      </Navbar.Collapse>
    </div>
  </Navbar>

  
    </div>
       
    </>
  );
};
