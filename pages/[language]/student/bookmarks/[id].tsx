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
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <div className="d-flex dsaidsa-ajwe9ds">
                <h3>Bookmarks</h3>
                <div className="jasdiosad-aswe">
    
      <div className="dsnodi-sdjsad">
        <FiSearch color="#8A8A8A" size={17} />
        <input type="text" placeholder="Search" />
      </div>
    </div>
                </div>
                <div className="complete-web-1">
                  <BookmarkCard />
                  <BookmarkCard />
                  <BookmarkCard />
                  <BookmarkCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth( Home ) ;
