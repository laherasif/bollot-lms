import type { NextPage } from "next";
import Dropdown from "../../../../src/components/student/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import { FaStar } from "react-icons/fa";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
    <NavigationBar1/>
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <h3>Reviews Given</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst">
                      <div className="ratio-bar">
                        <h3>4.9</h3>
                        <p>out of</p>
                        <h3 className="ml-9">5</h3>
                        <div className="lasjdsad-sdjsa ksjadas">
                          <FaStar color="#FF981E" />
                          <FaStar color="#FF981E" />
                          <FaStar color="#FF981E" />
                          <FaStar color="#FF981E" />
                          <FaStar color="#FF981E" />
                        </div>
                        <h6>4.8(151)</h6>
                      </div>
                    </div>
                  </div>
                  <div className="hjsaisa-sdnjassd jsdif-dsndawje">
                    <div className="reviews-section">
                      <div className="first-rev-sec">
                        <div className="rev-img pb-41">
                          <img src="/assets/images/first-sec.svg" alt="image" />
                          <div className="you-rev">
                            <h3>Your Review</h3>
                            <p>12 Jul 2022</p>
                          </div>
                        </div>
                        <div className="cm-webs-12">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy{" "}
                          </p>
                          <h6>Complete Web &amp; Mobile Designer in 2022...</h6>
                        </div>
                      </div>
                    </div>
                    <div className="reviews-section">
                      <div className="first-rev-sec">
                        <div className="rev-img pb-41">
                          <img src="/assets/images/first-sec.svg" alt="image" />
                          <div className="you-rev">
                            <h3>Your Review</h3>
                            <p>12 Jul 2022</p>
                          </div>
                        </div>
                        <div className="cm-webs-12">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy{" "}
                          </p>
                          <h6>Complete Web &amp; Mobile Designer in 2022...</h6>
                        </div>
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
