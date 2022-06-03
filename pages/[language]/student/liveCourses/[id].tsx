import type { NextPage } from "next";
import Dropdown from "../../../../src/components/student/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import LiveCourses from "../../../../src/components/student/LiveCourses";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
const options = ["one", "two", "three"];
import React, { useState, useEffect } from 'react'
import instance from "../../../../src/confiq/axios/instance";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import axios from 'axios'
import { Small } from "../../../../src/components/student/loader";
import Link from "next/link";

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
      setLoading(true)
      let res = await AxInstance.get('api//student/my-live-courses')
      if (res.data.success === true) {
        setLoading(false)
        setCourse(res.data.response.courses)
      }
    }
    fetchCourse()
  }, [])

  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">
                  <Link href="/en/student/courses">
                    <h3 style={{ cursor: 'pointer' }}>
                      <i className='fa fa-arrow-left'></i>
                      Back
                    </h3>
                  </Link>
                  <h3>My Live Courses</h3>
                  <div className="complete-web-1">

                    {course && course.length > 0 ? course.map((course: any) => {
                      if (course?.schedule.length)
                        return (
                          <LiveCourses course={course} key={course.id} />
                        )
                    })
                      : <div>Record not found </div>
                    }

                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
