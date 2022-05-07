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
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import NewCourse from "../../../../src/components/instructor/newCourse";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import EnrolledStudent from "../../../../src/components/instructor/EnrolledStudent";
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
        let res = await AxInstance.get('api//instructor/courses/stundets-enrolled')
        if (res.data.response.students.length) {
          setLoading(false)
          setCourse(res.data.response.courses)
        }
        else {
          setLoading(false)

        }
      }
      catch (err) {
        setLoading(false)

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

                  <div className="back-btn">
                    <Link href="/en/instructor/" >
                      <h3>
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Enrolled Student  </h3>
                  </div>
                  {/* <div className=" jidfjsd-asjreid">
                    <div className="dsnodi-sdjsad">
                      <FiSearch color="#8A8A8A" size={17} />
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className="d-flex idfadsf-sads">
                      <Link href='/en/instructor/addCourse'>
                        <button className="upload-1 sdisad-dsdactive">
                          + Add New Course </button>
                      </Link>
                    </div>
                  </div> */}
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      {/* <div className="d-flex mb-3 idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          My Courses </button>
                        <Link href="/en/instructor/liveCourses">
                          <button className="upload-1" >M</button>
                        </Link>
                      </div> */}
                      
                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                    <EnrolledStudent course={course}  />
                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default Home;
