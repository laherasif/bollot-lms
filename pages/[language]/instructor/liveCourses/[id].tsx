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
import axios from 'axios'
import LiveCourse from "../../../../src/components/instructor/liveCourseCard";
import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import { Main , Small } from "../../../../src/components/instructor/loader";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [reload, setReLoading] = useState(false)

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)

  console.log("token", token)
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  console.log("load" , loading )

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//instructor/courses/live-courses')
        if (res.data.success === true) {
          setLoading(false)
        }
        setCourses(res.data.response.courses)
      } catch (error) {

      }
    }
    fetchCourse()
  }, [])


  console.log("cours", courses)

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="jcoiasd03-eakw3e1">
          <Sidebar />
        </div>
        {loading ? Main()
          :

          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">
                  <div>
                    <h3>My Live Courses</h3>
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
                          <button className="upload-1 sdisad-dsdactive" >
                           {/* { reload ? Small() : */}
                            <i className="fa fa-refresh" ></i>
                          </button>
                        </div>
                        {/* <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Published</button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">In Review</button>
                        </Link>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  {courses && courses.map((cours: any, i: number) => (
                    <LiveCourse course={cours} key={i} />

                  ))}

                </div>
              </div>
            </div>
          </div>
        }
      </section>
    </div>
  );
};



export default withAuth(Home);
