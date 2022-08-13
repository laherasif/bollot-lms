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
import Chart from "../../../../src/components/instructor/chart";
import Chart1 from "../../../../src/components/instructor/chart1";
import BarChart from "../../../../src/components/instructor/barchart";
import Link from "next/link";
import LiveCourses from "../../../../src/components/instructor/liveCourseCard";
import NewCourse from "../../../../src/components/instructor/newCourse";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Search from "../../../../src/components/instructor/search";
import { Breadcrumb } from "react-bootstrap";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { SweetAlert } from "../../../../src/function/hooks";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });
  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//instructor/courses/live-courses')
        if (res.data.success === true) {
          setLoading(false)
          setCourse(res.data.response.courses)
        }
      }
      catch (err) {
        SweetAlert({ icon: "error", text: err })

      }
    }
    fetchCourse()
  }, [])

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">
                  <div>

                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href="/en/instructor/courses">Courses</Breadcrumb.Item>
                      <Breadcrumb.Item active>Live Courses</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <Link href="/en/instructor/courses" > */}
                    {/* <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>My Live Courses</h3> */}
                  </div>
                  <div className=" jidfjsd-asjreid">
                    <Search />
                  </div>
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                   
                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  {course && course.length > 0 ? course.map((course: any) => {
                    if (course?.schedule)
                      return (
                        <LiveCourses course={course} key={course.id} />
                      )
                  })
                    : <div>Record not found </div>
                  }


                </div>
              </div>
            </div>
          </div>
        }
      </section>
    </div>
  );
};

export default withAuth( Home );
