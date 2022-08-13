import React from 'react';
import Icons from '../icons';
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

export default ()=>{
const RightBarContent=()=>{
    return  <div className="jaodsfjsd-sdfjewi">
    <h5>Upcoming Live Classes</h5>
    <div className="seting-method-payment">
      <div className="first-payment-1">
        <div className="com-flex-1">
          <h3>Five phases of UI Design</h3>
        </div>
        <h6>
          <Icons name="i13" />
          Today, 12pm to 5pm
        </h6>
        <div className="certificate">
          <h4>Learning Objectives:</h4>
        </div>
        <div className="start-list-item">
          <ul>
            <li>Describe the phases of a design sprint</li>
            <li>Explain the importance of design sprints</li>
            <li>Plan a design sprint</li>
            <li>
              Explain the role of an entry-level UX designer during a
              design sprint
            </li>
            <li>
              Describe the importance of retrospectives after design
              sprints
            </li>
          </ul>
        </div>
      </div>
      <div className="first-payment-1">
        <div className="com-flex-1">
          <h3>Five phases of UI Design</h3>
        </div>
        <h6>
          <Icons name="i13" />
          Today, 12pm to 5pm
        </h6>
        <div className="certificate">
          <h4>Learning Objectives:</h4>
        </div>
        <div className="start-list-item">
          <ul>
            <li>Describe the phases of a design sprint</li>
            <li>Explain the importance of design sprints</li>
            <li>Plan a design sprint</li>
            <li>
              Explain the role of an entry-level UX designer during a
              design sprint
            </li>
            <li>
              Describe the importance of retrospectives after design
              sprints
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
}
    return <div className='mdsak03e-a3'>
        <div className='kdajs-weemwewa2'>
    <RightBarContent/>
        </div>
        <div className='nakdsfosda-sdme'>
        <Navbar bg="light" className="hdhafs-dawej" expand={false}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="kjsdadja39s"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <RightBarContent />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
        </div>
    </div>
}