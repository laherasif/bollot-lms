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
                <h3>My Profile</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 ">
                      <div>
                        <img src="/assets/images/umpire-1.svg" alt="" />
                      </div>
                      <div className="maxima">
                        <button className="upload-1">Upload New</button>
                        <button className="upload-1">Delete Photo</button>
                        <p>Maximum size of 1MB. JPG, GIF, or PNG.</p>
                      </div>
                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        First Name
                      </label>
                      <input type="text" placeholder="john" />
                    </div>
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Last Name
                      </label>
                      <input type="text" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Birthday
                      </label>
                      <input placeholder="12 Jun 2022" type="date" />
                    </div>
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Phone No
                      </label>
                      <input type="text" placeholder="Ex. 123 456 789" />
                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Website
                      </label>
                      <input
                        placeholder="ex. http://www.ballot.com"
                        type="text"
                      />
                    </div>
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Language
                      </label>
                      <input type="text" placeholder="English" />
                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1 cst-text-p">
                      <label className="mb-5cst"  >
                        About Me
                      </label>
                      <textarea
                        rows={10}
                        placeholder="Write here...."
                         defaultValue={""}
                      />
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
