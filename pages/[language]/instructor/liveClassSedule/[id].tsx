import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import instance from "../../../../src/confiq/axios/instance";
import axios from 'axios'
import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import moment from 'moment'
import { useRouter } from "next/router";
import { Main } from "../../../../src/components/instructor/loader";
import Link from "next/link";
const Home: NextPage = () => {
  // const intl = useIntl();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  let router = useRouter()

  let CourseId = router.query.id

  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

  console.log("token", token)
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
        let res = await AxInstance.get(`api//instructor/courses/live-courses/schedule/${CourseId}`)
        if (res.data.success === true) {
          setLoading(false)
        }
        setCourses(res.data.response.course_with_schedule)
      } catch (error) {

      }
    }
    fetchCourse()
  }, [])


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
                    <Link href='/en/instructor/liveCourses'>
                      <h3 style={{cursor:'pointer'}}>
                        <i className="fa fa-arrow-left "></i>
                        Back
                      </h3>
                    </Link>
                    <h3 className="ml-2">My Live Courses</h3>
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
                <div className="seting-method-payment">
                  <div className="first-payment-1">


                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="active-member">
                              <div className="table-responsive">
                                <table className="table table-xs mb-0">
                                  <thead>
                                    <tr>
                                      <th>Sedule #</th>
                                      <th>Date</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th>Hours</th>
                                      {/* <th>Activity</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {courses && courses?.schedule?.map((s: any, i: numeber) => (
                                      <tr key={i}>
                                        <td>

                                          {i + 1}
                                        </td>
                                        <td>{moment(s?.date).format("LL")}</td>
                                        <td>
                                          <span>{s?.from_time}</span>{" "}
                                        </td>
                                        <td>
                                          <span>{s?.to_time}</span>
                                        </td>
                                        <td>
                                          <span>{s?.hours}</span>
                                        </td>
                                        {/* <td>
                                            <span>Ordered</span>{" "}
                                            <span className="m-0 pl-3">10 sec ago</span>{" "}
                                          </td> */}
                                      </tr>

                                    ))}


                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
