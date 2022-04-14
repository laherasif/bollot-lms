import type { NextPage } from "next";
import Dropdown from "../../../../src/components/instructor/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import Chart from "../../../../src/components/chart";
// import Chart1 from "../../../../src/components/chart1";
// import BarChart from "../../../../src/components/barchart";
import Link from "next/link";
// import instance from "../../../../src/confiq/axios/instance";
// import axios from 'axios'
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
// import { useSelector, RootStateOrAny } from "react-redux";
// import { useEffect , useState } from "react";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  // const [courses , setCourses ] = useState([])

  // const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  // console.log("token", token)
  // const AxInstance = axios.create({
  //   // .. where we make our configurations
  //   baseURL: 'https://dev.thetechub.us/bolloot/',
  //   headers: {
  //     token: token
  //   }
  // });

  // useEffect(() => {
  //     let fetchCourse = async () => {
  //       try {
  //         let res = await AxInstance.get('api//instructor/courses/categories')
  //         setCourses(res.data.response.)
  //       } catch (error) {
          
  //       }
  //       console.log("res" , res )
  //     }
  //     fetchCourse()
  // }, [])


  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
      <div className="jcoiasd03-eakw3e1">
        <Sidebar />
        </div>
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course">
              <div className="hdsf0s-sadmsa">
                <div>
                  <h3>My Courses</h3>
                </div>
                <div className=" jidfjsd-asjreid">
                  <div className="dsnodi-sdjsad">
                    <FiSearch color="#8A8A8A" size={17} />
                    <input type="text" placeholder="Search" />
                  </div>
                  <NewCourse />
                </div>
              </div>

              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="maxima ">
                      <div className="idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          Account Security
                        </button>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Published</button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">In Review</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="complete-web-1">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



export default withAuth(Home);
