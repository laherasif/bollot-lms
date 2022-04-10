import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Dropdown from "./dropdown";
import { BiBell } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { Header2Item } from "../../../pages/[language]/instructor/details/[id]";
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
            <div className="w-100">
              <div className="hdsf-sdsa">
                <Navbar.Brand>
                  <Link href="/en/dashboard">
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

                    <p>John Doe</p>
                    <Link href={"/en/profile"}>
                      <img src="/assets/images/umpire-1.svg" />
                    </Link>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </>
      ) : (
        <></>
      )}
      {isTab ? (
        <>
          <Navbar expand="lg" bg="light" >
            <div className="jdfs-sndf">
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
                  <div className=" ">
                    <div className="aksldnsd-sdnaskdse-1">
                      <img src="/assets/images/umpire-1.svg" />
                      <p>Andrei Neagoie</p>
                    </div>
                    <div className="hsaid9iawdeka">
                      <div>
                        <h2 className="ksdfhd-active">Overview</h2>
                        <div>
                          <Header2Item title="Week 01" isChecked={true} />
                          <Header2Item title="Week 02" isChecked={true} />
                          <Header2Item title="Week 03" isChecked={false} />
                          <Header2Item title="Week 04" isChecked={false} />
                        </div>
                      </div>
                      <div>
                        <h2>Notes</h2>
                      </div>
                      <div>
                        <h2>Announcements</h2>
                      </div>
                      <div>
                        <h2>Resources</h2>
                      </div>
                      <div>
                        <h2>Live Classes</h2>
                      </div>
                      <div>
                        <h2>Review</h2>
                      </div>
                    </div>
                  </div>
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
