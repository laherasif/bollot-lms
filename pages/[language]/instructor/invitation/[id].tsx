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
import Invitation from "../../../../src/components/instructor/invitationForm";
import InvitationStudent from "../../../../src/components/instructor/Invitation";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const [email, setemail] = useState(false)
  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });
  // useEffect(() => {
  //   let fetchCourse = async () => {
  //     try {
  //       setLoading(true)
  //       let res = await AxInstance.get('api//instructor/courses')
  //       if (res.data.success === true) {
  //         setLoading(false)
  //         setCourse(res.data.response.courses)
  //       }
  //     }
  //     catch (err) {

  //     }
  //   }
  //   fetchCourse()
  // }, [])

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
                    <h3>My Courses</h3>
                  </div>
                  <div className=" jidfjsd-asjreid">
                    <div className="dsnodi-sdjsad">
                      <FiSearch color="#8A8A8A" size={17} />
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className="d-flex idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive" onClick={() => setemail(true)}>
                          + Add Invitation </button>
                    </div>
                  </div>
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads">
                        
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  {/* {course && course.length > 0 ? course.map((course: any) => {
                    if (!course?.schedule.length)
                      return (
                        <CourseCard course={course} key={course.id} />
                      )
                  })
                    : <div>Record not found </div>
                  } */}

                  <InvitationStudent course={course} />


                </div>
              </div>
            </div>
          </div>
        }

        { email && <Invitation permition={email}  Toggle={(value:any) => setemail(value)} /> }
      </section >
    </div >
  );
};

export default Home;
