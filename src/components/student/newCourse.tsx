import React from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Icons from "../icons";

import FieldDropdown from "./Fields/FieldDropdown";
import ImagesUploader from "./ImagesUploader";
export default () => {
  return (
    <Navbar bg="light" expand={false} className="jds0sas0w-eawne">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <div className="idfadsf-sads">
            <button className="upload-1 sdisad-dsdactive"
              id="activetab"
            >
              <Icons name="i9" />
              Add New Course
            </button>
          </div>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Add New Course
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="t-field">
              <input placeholder="Title of course" type="text" />
            </div>
            <div className="p-field">
              <label>Category</label>
              <FieldDropdown title="Select here..." />
            </div>
            <div className="my-4">
              <hr></hr>
            </div>
            <div className="p-field">
              <div>
                <div className="d-flex">
                  <Icons name="i24" />
                  <h4>Plan your course</h4>
                </div>
                <label>What will students learn in your course?</label>
                <input
                  type="text"
                  placeholder="Example: Define roles and responsibilities of project manager"
                />
                <input
                  className="my-3"
                  type="text"
                  placeholder="Example: Identify & manage project risks"
                />
                <h3>+ Add more to your response</h3>
              </div>
              <div>
                <label>
                  What are the requirements or prereq for taking your course?
                </label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Example: No programming experience needed"
                />
                <h3>+ Add more to your response</h3>
              </div>
              <div>
                <label>Who is this course for?</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Example: Begineer pyrhon developer"
                />
                <h3>+ Add more to your response</h3>
              </div>
            </div>
            <div className="my-4">
              <hr></hr>
            </div>
            <div className="p-field">
              <div className="d-flex">
                <Icons name="i24" />
                <h4>Curriculum</h4>
              </div>
              <h5>
                Start putting together your course by creating sections,
                lectures and practice (quizzes, coding exercises and
                assignments).
              </h5>
              <div className="drop-box">
                <div className="kvjadsd-j43rm">
                  <div className="jodsa-wnedas">
                    <h6>Section 1</h6>
                    <div className="jodsa-wnedas">
                      <Icons name="i25" />
                      <p>Introduction</p>
                    </div>
                  </div>
                  <Icons name="i26" />
                </div>
                <div className="kvjadsd-j43rm kjascs-anj3eds">
                  <div className="d-flex align-items-center">
                    <Icons name="i25" />
                    <p>Introduction</p>
                    <span className="mx-2">
                      <Icons name="i27" />
                    </span>
                  </div>
                  <div>
                    <Icons name="i28" />
                  </div>
                </div>
                <h3 className="my-2">+ Add more to your response</h3>
              </div>
              <div className="my-4">
                <hr></hr>
              </div>
              <div>
                <div className="d-flex">
                  <Icons name="i24" />
                  <h4>Course landing page</h4>
                </div>
                <label>Course title</label>
                <input type="text" placeholder="Write here..." />
              </div>
              <div>
                <label>Course subtitle</label>
                <input type="text" placeholder="Write here..." />
              </div>
              <div className="djfan-3nasd">
                <div className="p-field">
                  <label>Language</label>
                  <FieldDropdown title="Select here..." />
                </div>
                <div className="p-field">
                  <label>Level</label>
                  <FieldDropdown title="Select here..." />
                </div>
              </div>
              <div>
                <label>Course subtitle</label>
                <textarea
                  rows={4}
                  className="asndkmc03e-dm3e"
                  placeholder="Write here..."
                ></textarea>
              </div>
              <div>
                <label>Course Image</label>

                <div className="drop-box">
                  <div className="kvjadsd-j43rm iasdufhvs-ernd">
                    <Icons name="i29" />
                    <p>Drag your photos here</p>
                    <p>Add at least 5 photos</p>
                  </div>
                </div>
              </div>
              <label>Course Image</label>

              <div className="drop-box">
                <div className="kvjadsd-j43rm iasdufhvs-ernd">
                  <Icons name="i30" />
                  <p>Drag your photos here</p>
                  <p>Add at least 1 Video</p>
                </div>
              </div>

              <div>
                <div className="p-field my-4">
                  <div className="d-flex">
                    <Icons name="i24" />
                    <label>Pricing</label>
                  </div>

                  <FieldDropdown title="Select here..." />
                </div>
              </div>

            </div>
            <div className="d-flex">
              <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                <button className="upload-1 sdisad-dsdactive "
                  id="activetab"
                >
                  Preview
                </button>
              </div>
              <div className="idfadsf-sads kajfds-sdfe">
                <button className="upload-1 sdisad-dsdactive"
                  id="activetab"
                >
                  Submit for review
                </button>
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
