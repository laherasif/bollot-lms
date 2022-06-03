import React, { useEffect, useState } from 'react';
import Icons from '../../icons';
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { RootStateOrAny, useSelector } from 'react-redux';
import axios from 'axios';

export default () => {
  const RightBarContent = () => {

    const [classes, setClasses] = useState([])

    const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

    const AxInstance = axios.create({
      // .. where we make our configurations
      baseURL: 'https://dev.thetechub.us/bolloot/',
      headers: {
        token: token
      }
    });


    useEffect(() => {
      let fetchLive = async () => {
        try {
          let res = await AxInstance.get('api//instructor/courses/schedule/upcoming-classes')
          setClasses(res.data.response.upcoming)
        }
        catch (err) { }
      }
      fetchLive()
    }, [])


    return (
      <>
        <div className="jaodsfjsd-sdfjewi">
          <h5>Upcoming Live Classes</h5>
          <div className="seting-method-payment">
            {classes && classes ? classes.map((item: any, index: number) => (

              <div className="first-payment-1">
                <div className="com-flex-1">
                  <h3>Live class {index + 1}</h3>
                </div>
                <h6>
                  <Icons name="i13" />
                  {item?.date}
                </h6>
                <div className="certificate" style={{ display: 'flex', flexDirection: 'column', }}>
                  <h4>Zoom  id : {item?.zoom_meeting_id}</h4>
                  <h4>Zoom password : {item?.zoom_meeting_password}</h4>
                  <div className="d-flex mb-3 idfadsf-sads">
                    <button  onClick={() => window.open(item?.zoom_url_for_teacher)} className="upload-1 sdisad-dsdactive">Join Meeting</button>
                  </div>
                </div>

              </div>
            ))
              : <div>Classes not yet </div>
            }

          </div>
        </div>
      </>
    )
  }
  return <div className='mdsak03e-a3'>
    <div className='kdajs-weemwewa2'>
      <RightBarContent />
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