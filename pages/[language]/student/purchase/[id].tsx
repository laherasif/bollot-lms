import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <h3>My purchase</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst">
                      <div className="maxima">
                        <button className="upload-1">Transactions</button>
                        <button className="upload-1">Refund</button>
                        <button className="upload-1">Vouchers</button>
                      </div>
                    </div>
                  </div>
                  <div className="pay-method">
                    <h4>Purchase date</h4>
                    <h4>Refund deadline</h4>
                  </div>
                  <div className="seting-method-payment">
                    <div className="first-payment-1">
                      <div className="special-bar">
                        <h3>Specialization</h3>
                        <h3>
                          <span>.</span>5 of 5 courses
                        </h3>
                      </div>
                      <div className="com-flex-1">
                        <h3>Complete Web &amp; Mobile Designer in 2022</h3>
                        <h3>$482.00</h3>
                        <h4>01 Jun 2022</h4>
                        <h4>14 Jun 2022</h4>

                        <div className="jaskdaosd-sadsa">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              <img src="/assets/images/black..svg" alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="certificate">
                        <h4>Certificates:</h4>
                        <h5>Earn before 01 Jul 2022</h5>
                      </div>
                      <div className="start-list-item">
                        <ul>
                          <li>
                            Start the UX Design Process: Empathize, Define, and
                            Ideate
                          </li>
                          <li>Build Wireframes and Low-Fidelity Prototypes</li>
                          <li>Conduct UX Research and Test Early Concepts</li>
                          <li>
                            Create High-Fidelity Designs and Prototypes in Figma
                          </li>
                          <li>Responsive Web Design in Adobe XD</li>
                        </ul>
                      </div>
                    </div>
                    <div className="first-payment-1">
                      <div className="special-bar">
                        <h3>Course</h3>
                      </div>
                      <div className="com-flex-1">
                        <h3>Motion Design with Figma: Animation...</h3>
                        <h3>$182.00</h3>
                        <h4>01 Jun 2022</h4>
                        <h4>14 Jun 2022</h4>
                        <div className="jaskdaosd-sadsa">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              <img src="/assets/images/black..svg" alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>{" "}
                      </div>
                      <div className="certificate">
                        <h4>Certificates:</h4>
                        <h5>Earn before 01 Jul 2022</h5>
                      </div>
                      <div className="certificate-1">
                        <h4>Learn with tutor:</h4>
                        <h5>01 Jul 2022 - 01 Aug 2022</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth( Home );
