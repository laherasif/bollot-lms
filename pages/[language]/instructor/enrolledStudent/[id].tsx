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
import EnrolledStudent from "../../../../src/components/instructor/EnrolledStudent";
import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const router = useRouter()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  let CourseId = router.query.id
  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

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
        let res = await AxInstance.post('api//instructor/courses/stundets-enrolled', { course_id: CourseId })
        if (res.data.success === true) {
          setStudents(res.data.response.students)
          setLoading(false)
        }
        
      } catch (error) {

      }
    }
    fetchCourse()
  }, [])


  return (
    <>
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
                    <Link href='/en/instructor/liveCourses'>
                      <h3 style={{ cursor: 'pointer' }}>
                        <i className="fa fa-arrow-left "></i>
                        Back
                      </h3>
                    </Link>
                    <h3>Enrolled Students</h3>
                  </div>

                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="maxima ">
                        <div className="idfadsf-sads">
                          <button className="upload-1 sdisad-dsdactive">
                            <i className="fa fa-refresh"></i>
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
                <div className="w-100">
                  <EnrolledStudent students={students} />

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};



export default withAuth(Home);
