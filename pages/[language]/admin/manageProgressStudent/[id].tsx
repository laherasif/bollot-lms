import type { NextPage } from "next";
import Dropdown from "../../../../src/components/admin/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/admin/TopNavbar";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Chart from "../../../../src/components/admin/chart";
import Chart1 from "../../../../src/components/admin/chart1";
import BarChart from "../../../../src/components/admin/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import NewCourse from "../../../../src/components/admin/newCourse";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import EnrolledStudent from "../../../../src/components/admin/EnrolledStudent";
import moment from "moment";
import { useRouter } from "next/router";
import ProgressStudent from "../../../../src/components/admin/ProgressStudent";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  let router = useRouter()
  let courseId = router.query.id

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.post('api//admin/courses/students-progress', { course_id: courseId })
         console.log("Res" , res )
        if (res.data.response.progress.length) {
          setLoading(false)
          setProgress(res.data.response.progress)
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
                    <Link href="/en/admin/" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Student Progress </h3>
                  </div>
                  {/* <div className=" jidfjsd-asjreid">
                    <div className="dsnodi-sdjsad">
                      <FiSearch color="#8A8A8A" size={17} />
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className="d-flex idfadsf-sads">
                      <Link href='/en/admin/addCourse'>
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
                        <Link href="/en/admin/liveCourses">
                          <button className="upload-1" >M</button>
                        </Link>
                      </div> */}

                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  <ProgressStudent progress={progress} />
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
